import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import Field from "@/components/common/Field";
import Button from "@/components/common/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const apiErrorHandler = useApiErrorHandler();

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      try {
        const {
          data: {
            data: loginData,
          },
        } = await authService.login(values);
        const { token = "", ...activeUser } = loginData;

        setToken(token);
        setUser(activeUser);
        navigate("/", { replace: true });
      } catch (err) {
        apiErrorHandler(err);
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-6 shadow">
      <h1 className="mb-2 text-2xl font-bold">
        WFH Attendance
      </h1>
      <p className="mb-6 text-sm text-gray">
        Sign in to your account
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Field
          title="Email"
          error={formik.touched.email ? formik.errors.email : undefined}
        >
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded border border-gray-light bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Field>

        <Field
          title="Password"
          error={formik.touched.password ? formik.errors.password : undefined}
        >
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded border border-gray-light bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Field>

        <Button
          type="submit"
          variant="primary"
          disabled={formik.isSubmitting}
          style={{ width: "100%", marginTop: 8 }}
        >
          {formik.isSubmitting ? <span className="spinner" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
