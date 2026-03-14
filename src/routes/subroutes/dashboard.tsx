import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import SuspenseFallback from "@/components/common/SuspenseFallback";

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));

const dashboardRouter: RouteObject[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <DashboardPage />
      </Suspense>
    ),
  },
];

export default dashboardRouter;
