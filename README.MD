# 🐝 Taskhive

**Taskhive** is a showcase project demonstrating my skills in building **secure** and **scalable** web applications.  
This is **not a production SaaS**, but a portfolio-ready project highlighting expertise in:

- Authentication & Authorization  
- Database design & management (MongoDB + Mongoose)  
- Clean backend architecture & error handling  

---

## 🚀 Features

### 🔑 Authentication & Security
- User registration & login with JWT  
- Secure password hashing with **argon2**  
- Password reset & change flow  
- Role-based access control (admin/user)  
- Input validation with **Zod**  

### ✅ Task Management
- Full CRUD (Create, Read, Update, Delete) for tasks  
- Tasks scoped to authenticated users  
- Pagination & filtering support  

### 🏗 Clean Architecture
- Organized controllers & routes  
- **Mongoose** with **MongoDB**  
- Centralized error handling middleware  
- Strict environment variables validation  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Auth:** JWT, argon2  
- **Validation:** Zod  
- **Other:** Docker, ESLint, Prettier  

---

## ⚡ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/thyrexdev/taskhive.git
cd taskhive

2. Setup environment variables

Create a .env file in the root directory:

MONGO_URI=mongodb://localhost:27017/taskhive
JWT_SECRET=supersecretkey
PORT=5000

3. Install dependencies

npm install

4. Run the server

For development:

npm run dev

For production:

npm run build && npm start

📡 API Endpoints
Auth

POST /auth/register → Register new user

POST /auth/login → Login with email & password

POST /auth/reset-password → Request reset token

POST /auth/change-password → Change password

Tasks

GET /tasks → Get all tasks for logged-in user

POST /tasks → Create a new task

PUT /tasks/:id → Update a task

DELETE /tasks/:id → Delete a task

🔒 Security Highlights

All passwords hashed with argon2

JWT with expiration & refresh strategy

Request validation with Zod

Role-based access control