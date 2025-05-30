# Customs_on_board

A modern web application to streamline customs and logistics ticketing. This project features user registration, login, a user dashboard with dark/light mode toggle, and secure logout. The backend is built with Node.js and Express. Blockchain integration is planned for future updates.

## Features
- User registration and login
- User dashboard with profile display
- Secure logout (including auto-logout on browser back)
- Responsive UI with light/dark mode toggle
- Footer with contact and social links
- Node.js/Express backend for authentication and user management

## Tech Stack
- **Frontend:** React, Context API
- **Backend:** Node.js, Express
**Database:** PostgreSQL
- **Authentication:** JWT

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prashast4438/Customs_on_board.git
   cd Customs_on_board
   ```
2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. **Run the backend:**
   ```bash
   cd backend
   npm start
   ```
4. **Run the frontend:**
   ```bash
   cd ../frontend
   npm start
   ```
5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## Usage
- Register or login as a user
- Access your dashboard to view your profile
- Use the dark/light mode toggle (top right)
- Logout from within your dashboard (bottom right of card)

## Future Plans
- Integrate blockchain smart contracts for decentralized ticketing and pricing

## Project Architecture & Security

### Architecture
- **Frontend (React):** Handles user interface, registration, login, dashboard, and session management. Communicates with the backend via REST API calls.
- **Backend (Node.js/Express):** Provides authentication endpoints, user management, and business logic. Serves as the bridge between frontend and the PostgreSQL database.
- **Database (PostgreSQL):** Stores user data securely, including hashed passwords and profile info.
- **Data Flow:**
  1. User interacts with the frontend (registers/logins, views dashboard).
  2. Frontend sends API requests to backend (e.g., /register, /login, /profile).
  3. Backend authenticates, processes requests, and returns responses.
  4. (Planned) Future blockchain integration for decentralized ticketing and pricing.

### Security
- **Authentication:** Uses JWT (JSON Web Tokens) for secure, stateless authentication. Tokens are stored in browser storage and sent with API requests.
- **Logout:** Secure logout clears tokens from storage and prevents access to protected routes. Auto-logout on browser back navigation is implemented.
- **Password Security:** Passwords are securely hashed and never stored in plain text (using bcrypt or similar).
- **Best Practices:**
  - No sensitive secrets or credentials are exposed in frontend code.
  - Recommend running both frontend and backend over HTTPS in production.
  - CORS and input validation are enforced on the backend.
  - Sessions and tokens are invalidated on logout.

## License
MIT
