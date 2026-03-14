import { toast } from "react-toastify";
import { userService } from "@/services/userService";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

interface DeleteUserModalProps {
  open: boolean;
  userId: number | null;
  displayName?: string;
  onCancel: () => void;
  onSuccess: () => void | Promise<void>;
}

export default function DeleteUserModal({
  open,
  userId,
  displayName,
  onCancel,
  onSuccess,
}: DeleteUserModalProps) {
  const apiErrorHandler = useApiErrorHandler();

  const handleDelete = async () => {
    if (!userId) {
      return;
    }

    try {
      await userService.delete(userId);
      toast.success("User deleted successfully.");
      await onSuccess();
    } catch (err) {
      apiErrorHandler(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete User"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => void handleDelete()}>
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-dark">
        Are you sure you want to delete
        <span className="font-semibold text-gray-900"> {displayName ?? "this user"}</span>?
      </p>
    </Modal>
  );
}