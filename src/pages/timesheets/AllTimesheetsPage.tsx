import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { timesheetService } from "@/services/timesheetService";
import type { Timesheet } from "@/types";
import { allTimesheetColumns } from "@/hooks/tables/columns/allTimesheetColumns";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import { useAuthStore } from "@/stores/authStore";
import { hasModuleAccess } from "@/utils/permissions";
import Table from "@/components/common/Table";
import Button from "@/components/common/Button";
import Field from "@/components/common/Field";
import Input from "@/components/common/Input";

export default function AllTimesheetsPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [nameKeyword, setNameKeyword] = useState("");
  const [appliedName, setAppliedName] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  const hasTimesheetModule = hasModuleAccess(user, "timesheet");
  const canAccessAllTimesheets = user?.isSpecial === true && hasTimesheetModule;
  const apiErrorHandler = useApiErrorHandler();

  const columns = allTimesheetColumns();

  const fetchTimesheets = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await timesheetService.getAll({
        page,
        size,
        ...(appliedName ? { name: appliedName } : {}),
      });
      setTimesheets(data.data);
      setTotal(data.total ?? data.meta?.total ?? data.data.length);
    } catch (err) {
      apiErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }, [apiErrorHandler, appliedName, page, size]);

  useEffect(() => {
    if (!canAccessAllTimesheets) {
      return;
    }
    void fetchTimesheets();
  }, [canAccessAllTimesheets, fetchTimesheets]);

  if (!canAccessAllTimesheets) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700 hover:underline">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">All Timesheets</span>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Timesheets</h1>
      </div>
      <div className="mb-4 flex items-end gap-2">
        <Field title="Filter by name" className="mb-0 w-full max-w-sm">
          <Input
            id="employeeName"
            type="text"
            value={nameKeyword}
            onChange={(e) => setNameKeyword(e.target.value)}
            placeholder="Type employee name"
          />
        </Field>
        <Button
          onClick={() => {
            setAppliedName(nameKeyword.trim());
            setPage(1);
          }}
        >
          Filter
        </Button>
      </div>

      <Table
        data={timesheets}
        columns={columns}
        emptyMessage="No timesheets found."
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
  );
}
