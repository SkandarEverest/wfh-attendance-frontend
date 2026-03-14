import { useCallback, useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { checkInSchema, type CheckInFormValues } from "@/schemas/timesheet";
import { timesheetService } from "@/services/timesheetService";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import Modal from "@/components/common/Modal";
import Field from "@/components/common/Field";
import Button from "@/components/common/Button";
import DropzoneField from "@/components/common/DropzoneField";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckInModal({
  open,
  onClose,
  onSuccess,
}: CheckInModalProps) {
  const apiErrorHandler = useApiErrorHandler();
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik<CheckInFormValues>({
    initialValues: {
      workDate: dayjs().format("YYYY-MM-DD"),
      notes: "",
      photo: null,
    },
    validationSchema: toFormikValidationSchema(checkInSchema),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("workDate", values.workDate);
        if (values.notes) {
          formData.append("notes", values.notes);
        }
        if (values.photo) {
          formData.append("photo", values.photo);
        }
        await timesheetService.checkIn(formData);
        toast.success("Check-in submitted successfully.");
        handleClose();
        onSuccess();
      } catch (err) {
        apiErrorHandler(err);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setPreview(null);
    onClose();
  };

  const handleFileChange = useCallback(
    (file: File | null) => {
      formik.setFieldValue("photo", file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    },
    [formik],
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Check In"
      footer={
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
            onClick={() => formik.handleSubmit()}
          >
            {formik.isSubmitting ? <span className="spinner" /> : "Submit"}
          </Button>
        </div>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          title="Work Date"
          error={
            formik.touched.workDate ? formik.errors.workDate : undefined
          }
        >
          <Input
            id="workDate"
            name="workDate"
            type="date"
            max={dayjs().format("YYYY-MM-DD")}
            value={formik.values.workDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Field>

        <Field
          title="Notes (optional)"
          error={formik.touched.notes ? formik.errors.notes : undefined}
        >
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="What are you working on today?"
            value={formik.values.notes ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Field>

        <Field
          title="Photo Proof (optional)"
          error={
            formik.touched.photo ? (formik.errors.photo as string) : undefined
          }
        >
          <DropzoneField
            file={formik.values.photo ?? null}
            onFileChange={handleFileChange}
            preview={preview}
          />
        </Field>
      </form>
    </Modal>
  );
}
