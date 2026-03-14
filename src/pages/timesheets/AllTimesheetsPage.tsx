import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timesheetService } from "@/services/timesheetService";
import type { Timesheet } from "@/types";
import { allTimesheetColumns } from "@/hooks/tables/columns/allTimesheetColumns";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import Table from "@/components/common/Table";

export default function AllTimesheetsPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const apiErrorHandler = useApiErrorHandler();

  const columns = allTimesheetColumns();

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const { data } = await timesheetService.getAll();
        setTimesheets(data.data);
      } catch (err) {
        apiErrorHandler(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimesheets();
  }, []);

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

      <Table
        data={timesheets}
        columns={columns}
        emptyMessage="No timesheets found."
      />
    </div>
  );
}
