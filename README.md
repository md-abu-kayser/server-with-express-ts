# Server With Express (TypeScript) - REST API Starter

<!-- MIT License -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

<!-- Languages & Web Standards -->

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![ECMAScript Spec](https://img.shields.io/badge/ECMAScript-262-7A0BC0?logo=ecmascript&logoColor=white)](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)

<!-- Infra & Runtime -->

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)

<!-- npm / auth / utility -->

[![bcrypt](https://img.shields.io/badge/bcrypt-3.0.0-lightgrey)](https://www.npmjs.com/package/bcrypt)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-lightgrey)](https://www.npmjs.com/package/jsonwebtoken)

<!-- Databases -->

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

<!-- Networking & Utilities -->

[![dotenv](https://img.shields.io/badge/dotenv-464646?logo=dotenv&logoColor=white)](https://github.com/motdotla/dotenv)

Professional, modular Node + TypeScript REST API built with Express and PostgreSQL.

This project is a concise but production-minded starter for building RESTful services using:

- TypeScript
- Express (v5)
- PostgreSQL (via `pg`)
- JWT authentication + role-based middleware
- Minimal, test-friendly folder structure (modules, services, controllers)

The code focuses on clean separation of concerns: routes → controllers → services → DB layer, and includes helpful middleware for logging and authorization.

**Repository**: `server-with-express-ts`

**Status**: Example / learning project (ready for extension or production hardening)

**Quick Links**

- Entry: `src/server.ts`
- App factory: `src/app.ts`
- DB initializer: `src/config/db.ts`
- Routes: `src/modules/*/*.routes.ts`

**Highlights**

- Lightweight, dependency-minimal setup: uses `tsx` for fast TypeScript development runs.
- Database schema initialization is handled programmatically on startup (`src/config/db.ts`).
- Role-based authorization middleware is present (`middleware/auth.ts`).
- Clean, modular layout suitable for iterative feature development or teaching.

## Table of contents

- Project overview
- Features
- Tech stack
- Prerequisites
- Installation
- Environment variables
- Database
- Running (development)
- API reference (summary)
- Testing
- Deployment
- Contributing
- License
- Contact

## Installation

Follow these steps to get the project running locally on Windows PowerShell.

1. Clone the repo and install dependencies:

```powershell
git clone https://github.com/md-abu-kayser/server-with-express-ts.git
```

````powershell
cd server-with-express-ts

```powershell
npm install
````

2. Create a `.env` file in the project root (see Environment variables).

3. Start the dev server:

```powershell
npm run dev
```

The `dev` script uses `npx tsx watch ./src/server.ts` to run the TypeScript server and restart on file changes.

## Environment variables

Create a `.env` file at the project root. Minimum recommended variables:

```env
# PostgreSQL connection string (postgres://user:pass@host:port/dbname)
CONNECTION_STR=postgres://username:password@localhost:5432/yourdb

# App port
PORT=5000

# HMAC secret for signing JWTs
JWT_SECRET=your-very-strong-secret
```

Notes:

- `src/config/index.ts` reads these variables and exposes `connection_str`, `port`, and `jwtSecret` to the app.
- On startup the DB initializer (`src/config/db.ts`) will create `users` and `todos` tables if they do not exist.

## Database

This project uses PostgreSQL. The DB connection is read from `CONNECTION_STR`.

The project will automatically create two tables on first run (via `initDB()`):

- `users` — user records with `id`, `name`, `role`, `email`, `password`, etc.
- `todos` — todo records with `user_id` foreign key to `users`.

Recommended quick local setup (Mac/Linux / Windows WSL / Docker):

Docker (one-liner):

```powershell
docker run --name pg-dev -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=appdb -p 5432:5432 -d postgres:15
```

Then set `CONNECTION_STR=postgres://postgres:postgres@localhost:5432/appdb` in `.env`.

## Running (development)

Start the server (PowerShell example):

```powershell
# set environment variables for the current session (PowerShell)
$env:CONNECTION_STR='postgres://postgres:postgres@localhost:5432/appdb';
$env:PORT='5000';
$env:JWT_SECRET='super-secret';

npm run dev
```

The server listens on the port configured by `PORT` and exposes the API endpoints listed below.

## API reference (summary)

Base URL: `http://localhost:<PORT>` (defaults to `5000` if `PORT` is set to `5000`).

Available route groups (see `src/app.ts`):

- `POST /auth/login` — login with credentials; returns JWT on success.

- `POST /users` — create a new user.
- `GET /users` — list users (protected, `admin` role required).
- `GET /users/:id` — get single user (allowed for `admin` and the `user` themselves via `auth` middleware).
- `PUT /users/:id` — update user.
- `DELETE /users/:id` — delete user.

- `POST /todos` — create a todo.
- `GET /todos` — list todos.
- `GET /todos/:id` — get a single todo.
- `PUT /todos/:id` — update a todo.
- `DELETE /todos/:id` — delete a todo.

Examples (PowerShell - `Invoke-RestMethod`):

```powershell
# Login
Invoke-RestMethod -Method Post -Uri http://localhost:5000/auth/login -Body (@{email='you@example.com'; password='secret'} | ConvertTo-Json) -ContentType 'application/json'

# Create user
Invoke-RestMethod -Method Post -Uri http://localhost:5000/users -Body (@{name='Alice'; email='alice@example.com'; password='secret'; role='user'} | ConvertTo-Json) -ContentType 'application/json'
```

## Testing

There are no automated tests included in the starter. Recommended next steps:

- Add unit tests for controllers and services (Jest + ts-jest).
- Add integration tests using SuperTest against the `app` exported from `src/app.ts`.

If you'd like, I can scaffold tests for core endpoints.

## Deployment

This repository is minimal and intended to be deployed behind a process manager or container.

Recommendations:

- Containerize with Docker and use environment variables for configuration.
- Use a managed PostgreSQL service in production and rotate `JWT_SECRET` regularly.
- Add proper logging, monitoring, and error-reporting (Sentry, Datadog, etc.).

Simple Dockerfile idea (not included): build an image using `node:20`, install deps and run the compiled JS or `tsx` in production mode.

## Contributing

Contributions are welcome. Good first tasks:

- Add request validation (e.g., Zod or Joi) to controllers.
- Add unit/integration tests.
- Add OpenAPI / Swagger documentation.

Please open issues or PRs on the upstream repository.

### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

### Contact and Maintainer

- **_Name:_** Md Abu Kayser - Full-Stack Engineer
- **_Project:_** _server-with-express-ts_
- **_Maintainer:_** [md-abu-kayser](https://github.com/md-abu-kayser)
- **_GitHub:_** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)
- **_Email:_** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)

If you’d like this README tailored for a specific purpose - such as **hiring managers**, **open-source contributors**, or **client deliverables** - feel free to request a custom tone or format.

---

**Thank you for reviewing this project!**

---
