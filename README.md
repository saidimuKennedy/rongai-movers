<div align="center">
  <img src="public/images/rongai-movers.png" alt="Rongai Movers Logo" width="150" />
  <h1>Rongai Movers</h1>
  <p>A full-stack web application for a modern moving and errands company, featuring role-based dashboards for clients, movers, and administrators.</p>
</div>

---

## Key Features

Rongai Movers is designed with a role-based architecture to serve the distinct needs of each user group.

### 🧍 **Client Features**
- **Authentication**: Secure sign-up and sign-in with email/password or Google.
- **Quote Requests**: Submit detailed moving requests through an intuitive form.
- **Personal Dashboard**: View and track the status of all submitted quotes (Pending, Confirmed, Completed).

### 🚚 **Mover Features**
- **Job Discovery**: View a list of all available, unclaimed moving jobs.
- **Job Claiming**: Claim pending jobs to be assigned to them.
- **Job Management**: Update the status of claimed jobs (e.g., from "Confirmed" to "Completed").

### Admin Features
- **Statistical Overview**: A dashboard with key metrics like total quotes, pending jobs, and number of movers.
- **User Management**: View a list of all registered users and their roles.
- **Role Administration**: Promote or change user roles (e.g., promote a CLIENT to a MOVER).

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (using Pages Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

---

## Getting Started

To get the project up and running on your local machine, follow these steps.

### 1. Prerequisites

- Node.js (v18 or later recommended)
- A PostgreSQL database instance

### 2. Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd rongai-movers

# Install dependencies
npm install

# Create the environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Open the `.env` file and add the necessary environment variables:

```.env
# PostgreSQL database connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth.js configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Google OAuth Provider credentials
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 4. Database Setup

Apply database migrations and seed the database with initial data:

```bash
# Apply migrations
npx prisma migrate dev

# Seed the database
npm run seed
```

### 5. Run the Application

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Folder Structure

The project follows the standard Next.js `pages` directory structure.

- **/prisma/**: Contains the database schema (`schema.prisma`), migrations, and the seeding script (`seed.ts`).
- **/public/**: Stores static assets like the logo and favicons.
- **/src/components/**: Contains all React components.
  - `ui/`: Generic, reusable UI components from `shadcn/ui`.
  - `forms/`: Form components like `QuoteForm`, `SignInForm`, and `SignUpForm`.
  - `home-page/`: Sections that make up the landing page.
  - `navbar/`: Components related to the main navigation bar.
- **/src/context/**: Holds React Context providers, like `ModalContext.tsx`.
- **/src/hooks/**: Contains custom React hooks, such as `useRequireAuth.ts` for role-based access control.
- **/src/lib/**: Contains library code and utilities, including the Prisma client instantiation (`prisma.ts`).
- **/src/middleware.ts**: The Next.js middleware for protecting routes based on authentication status and user role.
- **/src/pages/**: Contains all pages and API routes.
  - `api/`: The backend of the application.
    - `auth/[...nextauth].ts`: The catch-all route for NextAuth.js authentication.
    - `admin/`: API routes restricted to Admin users.
    - `movers/`: API routes for Mover-specific actions.
    - `quotes/`: API routes for creating and managing quotes.
  - `admin/`, `mover/`, `user/`: Role-specific pages and dashboards.

---

## API Endpoints

The backend API is organized by resource and role.

| Method | Endpoint                    | Description                                  |
|--------|-----------------------------|----------------------------------------------|
| `POST` | `/api/register`             | Creates a new user account.                  |
| `GET`  | `/api/quotes`               | Fetches quotes for the logged-in user.       |
| `POST` | `/api/quotes`               | Submits a new moving quote request.          |
| `GET`  | `/api/movers/quotes`        | Fetches available jobs for movers.           |
| `POST` | `/api/movers/claim`         | Allows a mover to claim a quote.             |
| `POST` | `/api/movers/update-status` | Allows a mover to update a job's status.   |
| `GET`  | `/api/admin/stats`          | Retrieves dashboard statistics for admins.   |
| `GET`  | `/api/admin/users`          | Fetches a list of all users for admins.      |
| `PUT`  | `/api/admin/update-role`    | Updates the role of a specific user.         |

