import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";
import { hasModuleAccess } from "@/utils/permissions";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const canAccessUsers = hasModuleAccess(user, "user");
  const hasTimesheetModule = hasModuleAccess(user, "timesheet");
  const canAccessMyTimesheets = user?.isSpecial === false && hasTimesheetModule;
  const canAccessAllTimesheets = user?.isSpecial === true && hasTimesheetModule;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-2 text-lg font-semibold">
          Welcome, {user?.name}!
        </h2>
        <p className="text-sm text-gray">
          You are logged in as{" "}
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              user?.isSpecial
                ? "bg-blue-100 text-blue-900"
                : "bg-green-100 text-green-900"
            }`}
          >
            {user?.roleName}
          </span>
        </p>
      </div>

      <div className="grid auto-fill gap-4 md:grid-cols-2 lg:grid-cols-3">
        {canAccessMyTimesheets && (
          <Link to="/timesheets">
            <div className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
              <h3 className="mb-1 text-base font-semibold">
                My Timesheets
              </h3>
              <p className="text-sm text-gray">
                View your attendance history
              </p>
            </div>
          </Link>
        )}

        {canAccessUsers && (
          <Link to="/users">
            <div className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
              <h3 className="mb-1 text-base font-semibold">
                Manage Users
              </h3>
              <p className="text-sm text-gray">
                Create, update, or remove employees
              </p>
            </div>
          </Link>
        )}

        {canAccessAllTimesheets && (
          <Link to="/timesheets/all">
            <div className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
              <h3 className="mb-1 text-base font-semibold">
                All Timesheets
              </h3>
              <p className="text-sm text-gray">
                View attendance records for all employees
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
