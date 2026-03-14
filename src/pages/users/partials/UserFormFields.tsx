import type {
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import type { Role } from "@/types";
import Field from "@/components/common/Field";

const inputClassName =
  "w-full rounded border border-gray-light bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-200";

interface UserFormValues {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

interface UserFormFieldsProps {
  values: UserFormValues;
  touched: Partial<Record<keyof UserFormValues, boolean>>;
  errors: Partial<Record<keyof UserFormValues, string>>;
  roles: Role[];
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  passwordLabel?: string;
  passwordPlaceholder?: string;
}

export default function UserFormFields({
  values,
  touched,
  errors,
  roles,
  onChange,
  onBlur,
  passwordLabel = "Password",
  passwordPlaceholder,
}: UserFormFieldsProps) {
  return (
    <>
      <Field title="Name" error={touched.name ? errors.name : undefined}>
        <input
          id="name"
          name="name"
          className={inputClassName}
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>

      <Field title="Email" error={touched.email ? errors.email : undefined}>
        <input
          id="email"
          name="email"
          type="email"
          className={inputClassName}
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>

      <Field title={passwordLabel} error={touched.password ? errors.password : undefined}>
        <input
          id="password"
          name="password"
          type="password"
          className={inputClassName}
          placeholder={passwordPlaceholder}
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>

      <Field title="Role" error={touched.roleId ? errors.roleId : undefined}>
        <select
          id="roleId"
          name="roleId"
          className={inputClassName}
          value={values.roleId}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value={0}>Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </Field>
    </>
  );
}