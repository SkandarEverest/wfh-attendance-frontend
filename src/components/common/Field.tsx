import type { ReactNode } from "react";

interface FieldProps {
  title: ReactNode;
  className?: string;
  error?: string;
  children: ReactNode;
}

export default function Field({ title, className = "", error, children }: FieldProps) {
  return (
    <div className={`mb-4 flex flex-col gap-1 ${className}`.trim()}>
      <span className="text-sm font-medium text-gray-dark">{title}</span>
      <div>{children}</div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
