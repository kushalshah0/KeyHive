## KeyHive – Password Manager

Modern password manager built with Next.js (App Router), Tailwind CSS, and MongoDB. It ships with a marketing landing page, authentication flow (signup/login/logout), and an authenticated dashboard for storing password entries. Users can toggle light/dark themes and manage their vault directly from the browser.

### Features
- Marketing landing page with hero, feature highlights, and theme toggle
- Authentication using secure password hashing and JWT-backed HTTP-only cookies
- Protected dashboard that lists, creates, copies, and deletes saved passwords
- MongoDB persistence via Mongoose models (`User` + `PasswordEntry`)
- Responsive glassmorphism UI with Tailwind CSS and `next-themes`

### Tech Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS 3.4
- MongoDB Atlas / self-hosted MongoDB
- Mongoose, bcryptjs, jsonwebtoken, zod

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create an `.env.local` file with:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=a-long-random-string
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` to view the landing page. Use `/signup` or `/login` to access the dashboard.

## Project Structure

- `src/app/page.tsx` – Marketing landing page
- `src/app/(auth)/*` – Signup/Login pages that reuse `AuthForm`
- `src/app/dashboard/page.tsx` – Authenticated dashboard shell
- `src/app/api/*` – Route handlers for auth + CRUD
- `src/components/*` – Theme toggle, forms, dashboard widgets
- `src/lib/*` – Database connection, auth utilities, request validation
- `src/models/*` – Mongoose schemas

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `npm run dev`  | Start local Next.js dev server    |
| `npm run build`| Production build                  |
| `npm run start`| Start production server           |
| `npm run lint` | Run ESLint                        |

## Notes

- API routes enforce authentication via signed JWT cookies; missing or invalid cookies return `401`.
- Passwords are stored as-is for UX demo purposes. For production, integrate encryption at rest (e.g., using a KMS or Web Crypto) before persisting secrets.
