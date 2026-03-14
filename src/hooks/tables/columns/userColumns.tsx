import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Button from "@/components/common/Button";
import type { User } from "@/types";

export const userColumns: (props: {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}) => ColumnDef<User, unknown>[] = ({ onEdit, onDelete }) => [
  {
    header: "#",
    id: "index",
    cell: ({ row }) => <span>{row.index + 1}</span>,
    size: 50,
  },
  {
    header: "Name",
    id: "name",
    accessorKey: "name",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    header: "Email",
    id: "email",
    accessorKey: "email",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    header: "Role",
    id: "role",
    accessorFn: (row) => row.role.name,
    cell: ({ getValue }) => {
      const roleName = getValue<string>();
      return (
        <span
          className={
            roleName === "Admin"
              ? "rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-900"
              : "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-900"
          }
        >
          {roleName}
        </span>
      );
    },
  },
  {
    header: "Created",
    id: "createdAt",
    accessorKey: "createdAt",
    cell: ({ getValue }) => (
      <span>{dayjs(getValue<string>()).format("YYYY-MM-DD")}</span>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="secondary" buttonSize="sm" onClick={() => onEdit(user)}>
            Edit
          </Button>
          <Button variant="danger" buttonSize="sm" onClick={() => onDelete(user)}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
