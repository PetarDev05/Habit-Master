# Habit Master – Backend

This directory contains the backend implementation for the Habit Master application.

The backend is responsible for:

- user authentication and authorization
- weekly habit management
- daily check-in tracking
- data persistence and retrieval
- enforcing business rules and system constraints

---

## Architecture Overview

The backend follows a modular and layered architecture:

- **Routes** handle HTTP request mapping
- **Controllers** manage request/response logic
- **Services** contain core business logic
- **Models** define database schemas (MongoDB / Mongoose)
- **Middlewares** handle authentication, authorization, and error handling
- **Validators** ensure request data integrity

This structure keeps the system maintainable, testable, and scalable.

---

## Core Features

- JWT-based authentication (access & refresh tokens)
- Secure session handling using HTTP-only cookies
- Weekly habit lifecycle management
- Automatic daily check-in state handling
- Cascading deletes for user-owned data

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**
- **cookie-parser**

---

## Development Notes

- The backend is developed independently of the frontend.
- API design is driven by clearly defined system operations.
- Authentication and authorization are treated as first-class concerns.
- The system is designed to evolve without major architectural changes.

---

## Status

Backend development is in progress.  
Initial focus is on system design, authentication, and core API functionality.
