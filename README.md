# WFH Attendance Frontend

A standalone React + TypeScript frontend for the WFH (Work From Home) Attendance system.

## Tech Stack

- **React 18** with TypeScript
- **Vite** — build tool
- **Axios** — HTTP client (cookie-based auth with `withCredentials`)
- **Zustand** — state management (auth store with localStorage persist)
- **React Router DOM** — client-side routing with lazy loading
- **React Hook Form + Zod** — form handling and validation
- **Day.js** — date formatting

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install dependencies

```bash
cd wfh-attendance-frontend
npm install
```

### Configure environment

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Run development server

```bash
npm run dev
```

The app will start at [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Project Structure

```
src/
├── main.tsx                        # Entry point
├── App.tsx                         # Root component (fetches profile on load)
├── router.tsx                      # Route definitions
├── index.css                       # Global styles
├── lib/
│   └── axios.ts                    # Axios instance (withCredentials, interceptors)
├── types/
│   ├── entities.ts                 # User, Role, Timesheet
│   ├── requests.ts                 # LoginRequest, CreateUserRequest, etc.
│   ├── responses.ts                # GenericResponse<T>, PaginatedResponse<T>
│   └── index.ts                    # Barrel export
├── schemas/
│   ├── auth.ts                     # Login form Zod schema
│   ├── user.ts                     # Create/Edit user Zod schemas
│   └── timesheet.ts                # Check-in form Zod schema
├── services/
│   ├── authService.ts              # POST /auth, /auth/logout, GET /auth/profile
│   ├── userService.ts              # CRUD /users, GET /users/roles
│   └── timesheetService.ts         # GET /timesheets, POST /timesheets/check-in
├── stores/
│   └── authStore.ts                # Zustand store (user, auth state, profile fetch)
├── components/
│   └── layouts/
│       ├── AuthLayout.tsx          # Wraps login page; redirects if authenticated
│       ├── MainLayout.tsx          # App shell (header, nav, user info)
│       └── ProtectedRoute.tsx      # Guards routes; redirects to /login if not authed
└── pages/
    ├── auth/
    │   └── LoginPage.tsx           # Login form
    ├── dashboard/
    │   └── DashboardPage.tsx       # Landing page with quick-links
    ├── timesheets/
    │   ├── TimesheetsPage.tsx      # Employee's own timesheet history
    │   ├── CheckInPage.tsx         # Check-in form with photo upload
    │   └── AllTimesheetsPage.tsx   # Admin: all employee timesheets
    └── users/
        ├── UsersPage.tsx           # Admin: user list with delete
        ├── CreateUserPage.tsx      # Admin: create user form
        └── EditUserPage.tsx        # Admin: edit user form
```

## Routes

| Path                | Page              | Access    |
|---------------------|-------------------|-----------|
| `/login`            | LoginPage         | Public    |
| `/`                 | DashboardPage     | Protected |
| `/timesheets`       | TimesheetsPage    | Protected |
| `/timesheets/check-in` | CheckInPage   | Protected |
| `/timesheets/all`   | AllTimesheetsPage | Admin     |
| `/users`            | UsersPage         | Admin     |
| `/users/create`     | CreateUserPage    | Admin     |
| `/users/:id/edit`   | EditUserPage      | Admin     |

## Authentication Flow

1. Backend uses **cookie-based JWT** — no token stored in frontend
2. On app load, `App.tsx` calls `GET /api/v1/auth/profile` to verify session
3. If unauthenticated, user is redirected to `/login`
4. On login, `POST /api/v1/auth` sets the session cookie
5. User info is stored in Zustand (persisted to localStorage for fast reload)
6. Axios interceptor redirects to `/login` on any 401 response

## API Base URL

Configured via `VITE_API_BASE_URL` environment variable. Defaults to `http://localhost:8080`. All API calls go to `{baseURL}/api/v1/...`.
