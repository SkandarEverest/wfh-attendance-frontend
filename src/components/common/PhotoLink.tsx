import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { timesheetService } from "@/services/timesheetService";

type TimesheetPhotoLinkProps = {
  photoPath: string | null;
};

export default function TimesheetPhotoLink({
  photoPath,
}: Readonly<TimesheetPhotoLinkProps>) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  if (!photoPath) {
    return <span>-</span>;
  }

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const handleClose = () => {
    setOpen(false);
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
      setPhotoUrl(null);
    }
  };

  const handleView = async () => {
    try {
      setOpen(true);
      setLoading(true);
      const { data: blob } = await timesheetService.getPhotoBlob(photoPath);
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
      setPhotoUrl(URL.createObjectURL(blob));
    } catch {
      setOpen(false);
      window.alert("Failed to load photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        buttonSize="sm"
        onClick={() => void handleView()}
        disabled={loading}
      >
        {loading ? "Loading..." : "View"}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        title="Timesheet Photo"
        width={720}
      >
        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
          </div>
        )}

        {!loading && photoUrl && (
          <img
            src={photoUrl}
            alt="Timesheet check-in"
            className="mx-auto max-h-[70vh] w-full rounded object-contain"
          />
        )}

        {!loading && !photoUrl && (
          <p className="text-sm text-gray">Photo is unavailable.</p>
        )}
      </Modal>
    </>
  );
}
