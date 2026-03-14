import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { timesheetService } from "@/services/timesheetService";
import type { Timesheet } from "@/types";
import { myTimesheetColumns } from "@/hooks/tables/columns/myTimesheetColumns";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import { useAuthStore } from "@/stores/authStore";
import { hasModuleAccess } from "@/utils/permissions";
import Table from "@/components/common/Table";
import Button from "@/components/common/Button";
import CheckInModal from "./partials/modals/CheckInModal";

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const hasTimesheetModule = hasModuleAccess(user, "timesheet");
  const canAccessMyTimesheets = user?.isSpecial === false && hasTimesheetModule;
  const apiErrorHandler = useApiErrorHandler();

  const columns = myTimesheetColumns();

  const fetchTimesheets = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await timesheetService.getMy({ page, size });
      setTimesheets(data.data);
      setTotal(data.total ?? data.meta?.total ?? data.data.length);
    } catch (err) {
      apiErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }, [apiErrorHandler, page, size]);

  useEffect(() => {
    if (!canAccessMyTimesheets) {
      return;
    }
    void fetchTimesheets();
  }, [canAccessMyTimesheets, fetchTimesheets]);

  if (!canAccessMyTimesheets) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mb-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700 hover:underline">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">My Timesheets</span>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Timesheets</h1>
          <Button onClick={() => setOpen(true)}>Check In</Button>
        </div>

        <Table
          data={timesheets}
          columns={columns}
          emptyMessage="No timesheets found. Start by checking in!"
          pagination={{
            page,
            size,
            total,
            onPageChange: setPage,
            onPageSizeChange: (nextSize) => {
              setSize(nextSize);
              setPage(1);
            },
          }}
        />
      </div>

      <CheckInModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchTimesheets}
      />
    </>
  );
}
