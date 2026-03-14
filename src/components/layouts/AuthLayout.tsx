import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {children}
    </div>
  );
}
