import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ServiceError } from "@/services/base/ServiceError";
import { useAuthStore } from "@/stores/authStore";

const IGNORED_ROUTES = ["/login"];

export const useApiErrorHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetState = useAuthStore((s) => s.reset);

  return (e: unknown) => {
    if (e instanceof ServiceError) {
      switch (e.status) {
        case 401:
          if (
            !IGNORED_ROUTES.some((route) => location.pathname.includes(route))
          ) {
            resetState();
            navigate("/login", { replace: true });
          }
          toast.error(e.message || "Your session has expired. Please login again.");
          break;
        case 403:
          toast.error(e.message || "You are not allowed to access this resource.");
          navigate("/", { replace: true });
          break;
        default:
          toast.error(e.message || "An unexpected error occurred.");
          break;
      }

      return e.message;
    }

    if (e instanceof Error) {
      toast.error(e.message);
      return e.message;
    }

    toast.error("An unexpected error occurred.");
    return "An unexpected error occurred.";
  };
};
