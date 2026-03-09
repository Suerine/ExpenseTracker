

# 💰 Expense Tracker Dashboard

A modern Expense Tracking Dashboard that helps users monitor their spending, visualize financial activity, and manage transactions efficiently. Built with a clean UI, responsive charts, and a structured dashboard layout. This project focuses on clarity, usability, and data visualization to help users understand their financial habits.

> **TL;DR:** A full-stack Expense Tracking Dashboard built with React, Tailwind CSS, Node.js, Express, and MongoDB that allows users to track income, manage expenses, and visualize financial activity through interactive charts. The dashboard provides a real-time overview of balances, transactions, and spending trends using Recharts for data visualization. This project helped me develop stronger skills in full-stack development, REST API integration, dashboard UI design, and financial data visualization.

---

## 💡 Inspiration

Built to demonstrate modern dashboard design, data visualization, and clean React architecture.

---

## ✨ Features

- Add and manage expenses
- Track income and spending in real time
- Dashboard overview of financial activity
- Interactive charts for expense analytics
- Transaction history with categories
- Responsive design for all screen sizes
- Clean and modern UI

---

## 📊 Dashboard Overview

The dashboard provides a quick summary of:

- 💳 Total Balance
- 💵 Total Income
- 💸 Total Expenses
- 📈 Financial overview charts
- 🧾 Recent transactions
- 🖨️ Export transactions

Charts are powered by **Recharts** to visualize financial patterns over time, including:

- **Pie Charts** for expense categories
- **Bar Charts** for monthly spending trends

---

## 🏗️ Architecture

The application follows a standard **client-server architecture** with a clear separation between the frontend and backend.

```
┌─────────────────────┐         HTTP / REST API        ┌─────────────────────┐
│   React Frontend    │  ──────────────────────────►  │  Express.js Backend │
│  (Vite + Tailwind)  │  ◄──────────────────────────  │   (Node.js + REST)  │
└─────────────────────┘        JSON Responses          └──────────┬──────────┘
                                                                   │
                                                                   │ Mongoose ODM
                                                                   ▼
                                                        ┌─────────────────────┐
                                                        │      MongoDB        │
                                                        │  (Transactions DB)  │
                                                        └─────────────────────┘
```

**Frontend → Backend communication:**
- All API calls are made via **Axios**, pointing to the Express REST API
- The base URL is configured via an environment variable (`VITE_API_BASE_URL`), making it easy to switch between local and production environments

**API structure:**
```
POST   /api/auth/register       → Register a new user
POST   /api/auth/login          → Authenticate and receive JWT
GET    /api/transactions        → Fetch all transactions (protected)
POST   /api/transactions        → Add a new transaction (protected)
DELETE /api/transactions/:id    → Delete a transaction (protected)
```

**Data flow:**
1. User logs in → backend validates credentials → returns a signed JWT
2. JWT is stored client-side and attached to every subsequent request via the `Authorization` header
3. Protected routes on the backend verify the token before processing any request
4. Transaction data is fetched and rendered dynamically into charts and tables on the dashboard

---

## 🔐 Security & Authentication

User authentication is handled with **JSON Web Tokens (JWT)** to ensure secure, stateless session management.

- **Registration & Login:** Passwords are hashed before storage. On successful login, the server issues a signed JWT with an expiry time.
- **Protected Routes:** All transaction endpoints require a valid JWT in the `Authorization: Bearer <token>` header. Requests without a valid token are rejected with a `401 Unauthorized` response.
- **Session Handling:** Tokens are managed client-side. Expired or invalid tokens are caught and redirect the user back to the login screen.
- **Input Validation & Error Handling:** All incoming request data is validated on the backend. Malformed or missing fields return descriptive error responses, preventing unexpected server behaviour.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, Recharts, React Icons, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Auth | JSON Web Tokens (JWT) |

---

## 📸 Screenshots

> _Add screenshots here — dashboard overview, charts view, and transaction list recommended._

To add screenshots:
1. Take a screenshot of the running app
2. Save to a `/screenshots` folder in the repo
3. Reference them here: `![Dashboard](screenshots/dashboard.png)`

---

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
```

2. Navigate into the project
```bash
cd expense-tracker
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

The app will run at: `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
JWT_SECRET=your_jwt_secret_here
```

---

## 🎨 UI Highlights

- Minimal dashboard layout
- Smooth data visualization
- Responsive card-based design
- Clean and readable transaction lists

---

## 🛠 Future Improvements

- [ ] Budget planning feature
- [ ] Expense category analytics
- [ ] Dark mode
- [ ] Containerise with Docker and deploy via Render or Railway
- [ ] Mobile app version
- [ ] AI spending insights

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request
