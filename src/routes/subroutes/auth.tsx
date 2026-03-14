import { Suspense, lazy } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import SuspenseFallback from "@/components/common/SuspenseFallback";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));

const authRouter: RouteObject[] = [
  {
    path: "",
    element: (
      <AuthLayout>
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default authRouter;
