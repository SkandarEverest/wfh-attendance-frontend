import { ColumnDef } from "@tanstack/react-table";
import type { Timesheet } from "@/types";
import dayjs from "dayjs";
import TimesheetPhotoLink from "@/components/common/PhotoLink";

export const myTimesheetColumns: () => ColumnDef<Timesheet, unknown>[] =
  () => [
    {
      header: "#",
      id: "index",
      cell: ({ row }) => <span>{row.index + 1}</span>,
      size: 50,
    },
    {
      header: "Check-in Time",
      id: "checkInTime",
      accessorKey: "checkInTime",
      cell: ({ getValue }) => (
        <span>{dayjs(getValue<string>()).format("YYYY-MM-DD HH:mm")}</span>
      ),
    },
    {
      header: "Notes",
      id: "notes",
      accessorKey: "notes",
      cell: ({ getValue }) => <span>{getValue<string | null>() ?? "-"}</span>,
    },
    {
      header: "Photo",
      id: "photoPath",
      accessorKey: "photoPath",
      cell: ({ getValue }) => (
        <TimesheetPhotoLink photoPath={getValue<string | null>()} />
      ),
    },
  ];
