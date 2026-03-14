import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { userService } from "@/services/userService";
import type { Role, User } from "@/types";
import { userColumns } from "@/components/tables/columns/userColumns";
import { useApiErrorHandler } from "@/hooks/handlers/useApiErrorHandler";
import { useAuthStore } from "@/stores/authStore";
import { hasModuleAccess } from "@/utils/permissions";
import Table from "@/components/common/Table";
import Button from "@/components/common/Button";
import CreateUserModal from "./partials/modals/CreateUserModal";
import EditUserModal from "./partials/modals/EditUserModal";
import DeleteUserModal from "./partials/modals/DeleteUserModal";

type UserModal = "create" | "edit" | "delete" | null;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalToShow, setModalToShow] = useState<UserModal>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const user = useAuthStore((s) => s.user);
  const canAccessUsers = hasModuleAccess(user, "user");
  const apiErrorHandler = useApiErrorHandler();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersResponse = await userService.getAll({ page, size });
      setUsers(usersResponse.data.data);
      setTotal(
        usersResponse.data.total ??
          usersResponse.data.meta?.total ??
          usersResponse.data.data.length,
      );
    } catch (err) {
      apiErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }, [apiErrorHandler, page, size]);

  const fetchRoles = useCallback(async () => {
    try {
      const rolesResponse = await userService.getRoles();
      setRoles(rolesResponse.data.data);
    } catch (err) {
      apiErrorHandler(err);
    }
  }, [apiErrorHandler]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    void fetchRoles();
  }, [fetchRoles]);

  const closeModal = () => {
    setModalToShow(null);
    setSelectedUser(null);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setModalToShow("create");
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalToShow("edit");
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setModalToShow("delete");
  };

  const handleSuccess = async () => {
    closeModal();
    try {
      const { data } = await userService.getAll({ page, size });
      setUsers(data.data);
      setTotal(data.total ?? data.meta?.total ?? data.data.length);
    } catch (err) {
      apiErrorHandler(err);
    }
  };

  const columns = userColumns({ onEdit: handleEdit, onDelete: handleDelete });

  if (!canAccessUsers) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mb-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700 hover:underline">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Users</span>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <Button variant="primary" onClick={handleCreate}>
            Create User
          </Button>
        </div>

        <Table
          data={users}
          columns={columns}
          emptyMessage="No users found."
          pagination={{
            page,
            size,
            total,
            onPageChange: setPage,
            onPageSizeChange: (nextSize) => {
              setSize(nextSize);
              setPage(1);
            },
          }}
        />
      </div>

      <CreateUserModal
        open={modalToShow === "create"}
        onCancel={closeModal}
        onSuccess={handleSuccess}
        roles={roles}
      />

      <EditUserModal
        open={modalToShow === "edit"}
        userId={selectedUser?.id ?? null}
        onCancel={closeModal}
        onSuccess={handleSuccess}
        roles={roles}
      />

      <DeleteUserModal
        open={modalToShow === "delete"}
        userId={selectedUser?.id ?? null}
        displayName={selectedUser?.name}
        onCancel={closeModal}
        onSuccess={handleSuccess}
      />
    </>
  );
}
