import { useEffect, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 480,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] flex-col overflow-y-auto rounded-lg bg-white shadow-lg"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span className="font-bold text-base">{title}</span>
          <button
            className="text-xl text-gray leading-none hover:rounded hover:bg-gray-lighter"
            onClick={onClose}
            type="button"
          >
            &times;
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
