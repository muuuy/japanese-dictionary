# Japanese Study Webapp

A web application that provides ways for people to study Japanese, including flashcards, a collaborative whiteboard, quizzes, and more. This README file provides an overview of the project, installation instructions, usage guidelines, and other important information.

---

## Project Overview

This project is a full-stack web application site built using modern web development technologies. It includes features like flashcards, quizzes, and an online collaborative whiteboard.

### Features

- User authentication and authorization
- Creating, deleting, and editing flashcards
- Vocabulary quiz
- Drag-and-drop quiz
- Collaborative whiteboard with web sockets
- Login / Signup / Forgot Password / Reset Password
- Global state management (Zustand)

---

## Technologies Used

### Frontend

- React.js
- Redux
- Tailwind
- HTML
- TypeScript
- ChakraUI

### Backend

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- Redis
- JWT (JSON Web Tokens)
- Bcrypt
- Websockets

---

## Installation

Before starting, ensure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB

### Steps

1. **Clone the repository:**
   ```
   $ git clone git@github.com:muuuy/japanese-dictionary.git
   $ cd repository
   ```

2. **Install dependencies:**
   ```
   $ npm install
   # or
   $ yarn install
   ```

2. **Install dependencies:**

   Create a ```.env``` file in ```.\backend\``` folder.

   Populate the ```.env``` file with the following:
   ```
   PORT={BACKEND PORT}
   EXPRESS_SESSION_SECRET={YOUR Express Session Secret}
   EMAIL_HOST={EMAIL host for ressetting the password}
   EMAIL_ADDRESS={EMAIL address for resetting the password}
   EMAIL_PASSWORD={EMAIL password for resetting the password}
   RESET_TOKEN_EXPIRES={Length of reset tokens}
   RESET_TOKEN_SECRET={Token for resetting password}
   JWT_ALGORITHM={TYPE of JWT algorithm}
   BACKEND_ADDRESS={Back-end URL}
   VIEW_ADDRESS={Front-end URL}
   REDIS_HOST={YOUR Redis host}
   REDIS_PORT={YOUR Redis port}
   PG_USER={YOUR PG user}
   PG_HOST={YOUR PG host}
   PG_DATABASE={YOUR PG database name}
   PG_PASSWORD={YOUR PG password}
   PG_PORT={YOUR PG port}
   ```
   
4. **Start the backend server:**
   ```
   $ cd .\server\
   $ npm run serverstart
   ```

5. **Start the frontend development server:**
   ```
   $ cd .\client\
   $ npm run dev
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:5173/
   ```

---
