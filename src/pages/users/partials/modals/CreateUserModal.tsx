import { useFormik } from "formik";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createUserSchema, type CreateUserFormValues } from "@/schemas/user";
import { userService } from "@/services/userService";
import type { Role } from "@/types";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import UserFormFields from "../UserFormFields";

interface CreateUserModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void | Promise<void>;
  roles: Role[];
}

export default function CreateUserModal({
  open,
  onCancel,
  onSuccess,
  roles,
}: CreateUserModalProps) {
  const apiErrorHandler = useApiErrorHandler();

  const formik = useFormik<CreateUserFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      roleId: 0,
    },
    validationSchema: toFormikValidationSchema(createUserSchema),
    onSubmit: async (values, helpers) => {
      try {
        await userService.create(values);
        toast.success("User created successfully.");
        helpers.resetForm();
        await onSuccess();
      } catch (err) {
        apiErrorHandler(err);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create User"
      width={640}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={formik.isSubmitting}>
            Cancel
          </Button>
          <Button onClick={() => void formik.submitForm()} disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </>
      }
    >
      <UserFormFields
        values={formik.values}
        touched={formik.touched}
        errors={formik.errors}
        roles={roles}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </Modal>
  );
}