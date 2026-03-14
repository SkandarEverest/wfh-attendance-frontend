import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import SuspenseFallback from "@/components/common/SuspenseFallback";

const UsersPage = lazy(() => import("@/pages/users/UsersPage"));

const usersRouter: RouteObject[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <UsersPage />
      </Suspense>
    ),
  },
];

export default usersRouter;
