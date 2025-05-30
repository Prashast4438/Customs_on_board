import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
console.log("DATABASE_URL being used:", process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
  res.send("Customs Onboarding API Running");
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { name, email, gstin, password } = req.body;
  if (!name || !email || !gstin || !password) {
    return res.status(400).json({ error: "All fields required" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, gstin, password_hash, role) VALUES ($1, $2, $3, $4, 'user') RETURNING id, name, email, gstin, role, created_at",
      [name, email, gstin, hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === '23505') {
      res.status(409).json({ error: "Email already registered" });
    } else {
      res.status(500).json({ error: "Registration failed" });
    }
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, gstin: user.gstin, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Middleware for auth
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Dashboard/profile endpoint
app.get("/api/profile", auth, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, gstin, role, created_at FROM users WHERE id=$1", [req.user.id]);
    res.json({ profile: result.rows[0], dummyData: { shipments: 5, lastFiled: "2025-05-30" } });
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Admin: get all users
app.get("/api/admin/users", auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Forbidden" });
  try {
    const result = await pool.query("SELECT id, name, email, gstin, role, created_at FROM users");
    res.json({ users: result.rows });
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
