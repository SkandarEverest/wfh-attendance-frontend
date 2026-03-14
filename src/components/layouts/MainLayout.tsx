import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const reset = useAuthStore((s) => s.reset);
  const isAdmin = Boolean(user?.isSpecial);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      reset();
      navigate("/auth/login", { replace: true });
    }
  };

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">WFH Attendance</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray">{user?.name}</span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                isAdmin
                  ? "bg-blue-100 text-blue-900"
                  : "bg-green-100 text-green-900"
              }`}
            >
              {user?.roleName}
            </span>
            <button
              className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-dark hover:bg-gray-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-6">
        <div className="mx-auto w-full max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
