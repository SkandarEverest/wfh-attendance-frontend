import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { editUserSchema, type EditUserFormValues } from "@/schemas/user";
import { userService } from "@/services/userService";
import type { Role } from "@/types";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import UserFormFields from "../UserFormFields";

interface EditUserModalProps {
  open: boolean;
  userId: number | null;
  onCancel: () => void;
  onSuccess: () => void | Promise<void>;
  roles: Role[];
}

export default function EditUserModal({
  open,
  userId,
  onCancel,
  onSuccess,
  roles,
}: EditUserModalProps) {
  const [loading, setLoading] = useState(false);
  const apiErrorHandler = useApiErrorHandler();

  const formik = useFormik<EditUserFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      roleId: 0,
    },
    validationSchema: toFormikValidationSchema(editUserSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!userId) {
        return;
      }

      try {
        const payload: Record<string, unknown> = {
          name: values.name,
          email: values.email,
          roleId: values.roleId,
        };

        if (values.password) {
          payload.password = values.password;
        }

        await userService.update(userId, payload);
        toast.success("User updated successfully.");
        await onSuccess();
      } catch (err) {
        apiErrorHandler(err);
      }
    },
  });

  useEffect(() => {
    if (!open || !userId) {
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await userService.getById(userId);
        const user = data.data;

        formik.setValues({
          name: user.name,
          email: user.email,
          password: "",
          roleId: user.roleId ?? user.role.id,
        });
      } catch (err) {
        apiErrorHandler(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchUser();
  }, [open, userId]);

  const handleClose = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Edit User"
      width={640}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={formik.isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={() => void formik.submitForm()}
            disabled={loading || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </>
      }
    >
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
        </div>
      ) : (
        <UserFormFields
          values={{
            name: formik.values.name,
            email: formik.values.email,
            password: formik.values.password ?? "",
            roleId: formik.values.roleId,
          }}
          touched={formik.touched}
          errors={formik.errors}
          roles={roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          passwordLabel="Password (leave blank to keep unchanged)"
          passwordPlaceholder="Enter new password"
        />
      )}
    </Modal>
  );
}