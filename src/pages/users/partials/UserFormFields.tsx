import type {
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import type { Role } from "@/types";
import Field from "@/components/common/Field";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

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
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>

      <Field title="Email" error={touched.email ? errors.email : undefined}>
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>

      <Field title={passwordLabel} error={touched.password ? errors.password : undefined}>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={passwordPlaceholder}
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>

      <Field title="Role" error={touched.roleId ? errors.roleId : undefined}>
        <Select
          id="roleId"
          name="roleId"
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
        </Select>
      </Field>
    </>
  );
}
