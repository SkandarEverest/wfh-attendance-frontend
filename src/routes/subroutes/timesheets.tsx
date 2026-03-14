import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import SuspenseFallback from "@/components/common/SuspenseFallback";

const TimesheetsPage = lazy(
  () => import("@/pages/timesheets/TimesheetsPage"),
);
const AllTimesheetsPage = lazy(
  () => import("@/pages/timesheets/AllTimesheetsPage"),
);

const timesheetsRouter: RouteObject[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <TimesheetsPage />
      </Suspense>
    ),
  },
  {
    path: "all",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <AllTimesheetsPage />
      </Suspense>
    ),
  },
];

export default timesheetsRouter;
