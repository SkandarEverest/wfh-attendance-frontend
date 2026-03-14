# WFH Attendance Frontend

React + TypeScript frontend for the WFH attendance system.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Zustand (persisted auth store)
- Formik + Zod (`zod-formik-adapter`)
- TanStack React Table
- React Toastify
- Day.js

## Getting Started

### Prerequisites

- Node.js >= 24
- npm >= 9

### Install

```bash
npm install
```

### Environment

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:7777
```

### Run

```bash
npm run dev
```

Vite default local URL is usually `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Routing

- `/auth/login` - Login
- `/` - Dashboard
- `/timesheets` - My Timesheets
- `/timesheets/all` - All Timesheets
- `/users` - Users

`/login` redirects to `/auth/login`.

## Auth & Access Control

- Auth state is stored in Zustand (`token` + `user`) and persisted in localStorage.
- API requests include bearer token when available and also use `withCredentials`.
- Main app routes are protected in `MainLayout` (redirect to login if no user).
- Dashboard and page access are permission-based:
  - `hasModuleAccess(user, "timesheet")` gates timesheet features.
  - `hasModuleAccess(user, "user")` gates users feature.
  - `user.isSpecial` determines special-role pages:
    - My Timesheets: `isSpecial === false`
    - All Timesheets: `isSpecial === true`

## Key Features

### Timesheets

- My Timesheets list with server-driven pagination (`page`, `size`).
- All Timesheets list with server-driven pagination and name filter.
- Check-in modal with required fields:
  - `workDate` required
  - `notes` required
  - `photo` required (max 5MB, jpeg/png/webp)
- Timesheet photo preview opens in modal:
  - Uses `GET /api/v1/timesheets/photo?path=...`
  - Loaded as blob via `timesheetService`.

### Users

- Users list with server-driven pagination.
- Create, edit, and delete users via modals.

### UI

- Reusable form controls (`Input`, `Textarea`, `Select`) for consistent styling.
- Shared table + pagination component.
- Breadcrumbs on pages to return to dashboard.

## API Services

- `authService`
  - login, logout, profile
- `timesheetService`
  - `getMy({ page, size })`
  - `getAll({ page, size, name })`
  - `checkIn(formData)`
  - `getPhotoBlob(path)`
- `userService`
  - roles, paginated list, create, update, delete

## Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── layouts/
│   └── tables/columns/
├── hooks/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── timesheets/
│   └── users/
├── routes/
├── schemas/
├── services/
├── stores/
├── types/
└── utils/
```

## Notes

- Global API base URL comes from `VITE_API_BASE_URL` (default: `http://localhost:7777`).
- Main request base path is `/api/v1`.
