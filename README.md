# MySQL Manager UI
A premium, modern full-stack application for managing MySQL databases with a sleek Glassmorphism UI.
## Features
-   **Dynamic Connection**: Connect to any accessible MySQL database.
-   **Table Explorer**: View all tables and browse their data (pagination/limits applied).
-   **Query Editor**: Execute raw SQL queries and view results in a formatted table.
-   **Premium UI**: Dark mode, glassmorphism design, and responsive layout.
## Tech Stack
-   **Frontend**: React, Vite, Vanilla CSS (Custom Design System).
-   **Backend**: Node.js, Express.
-   **Database Driver**: `mysql2`.
## Prerequisites
-   Node.js (v14+ recommended)
-   A running MySQL Server instance.
## Installation & Running
### 1. Clone the Repository
```bash
git clone https://github.com/Surya-Garimella/my_sql-manager-ui.git
cd my_sql-manager-ui
```
### 2. Setup Backend
```bash
cd server
npm install
node index.js
```
*The server will start on `http://localhost:3000`.*
### 3. Setup Frontend
Open a new terminal tab:
```bash
cd client
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173` (or similar).*
## Usage
1.  Open the frontend URL in your browser.
2.  Enter your MySQL Host, User, Password, and Database Name.
3.  Click **Connect**.
4.  Once connected, select tables from the sidebar or write queries in the editor.
## Project Structure
-   `client/`: React frontend application.
-   `server/`: Node.js Express API.
## License
MIT
