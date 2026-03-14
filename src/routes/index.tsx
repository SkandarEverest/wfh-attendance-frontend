import { Suspense, lazy } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import SuspenseFallback from "@/components/common/SuspenseFallback";
import authRouter from "./subroutes/auth";
import dashboardRouter from "./subroutes/dashboard";
import timesheetsRouter from "./subroutes/timesheets";
import usersRouter from "./subroutes/users";

const MainLayout = lazy(() => import("@/components/layouts/MainLayout"));

const SuspenseIndexPage = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div className="spinner" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<SuspenseIndexPage />}>
        <MainLayout>
          <Suspense fallback={<SuspenseFallback />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      </Suspense>
    ),
    children: [
      {
        path: "",
        children: [...dashboardRouter],
      },
      {
        path: "timesheets",
        children: [...timesheetsRouter],
      },
      {
        path: "users",
        children: [...usersRouter],
      },
    ],
  },
  {
    path: "auth",
    children: [...authRouter],
  },
  {
    path: "login",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
