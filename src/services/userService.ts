import type {
  GenericResponse,
  PaginatedResponse,
  User,
  Role,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/types";
import { Service } from "./base/Service";
import serviceUrls from ".";
import { useAuthStore } from "@/stores/authStore";

const getToken = () => useAuthStore.getState().token;

export const userService = {
  getRoles: async () => {
    return new Service(serviceUrls.usersPath("roles"), getToken()).get<
      GenericResponse<Role[]>
    >();
  },

  getAll: async (params?: { page?: number; size?: number }) => {
    return new Service(serviceUrls.usersPath(), getToken()).get<
      PaginatedResponse<User>
    >(params);
  },

  getById: async (id: number) => {
    return new Service(serviceUrls.usersPath(String(id)), getToken()).get<
      GenericResponse<User>
    >();
  },

  create: async (payload: CreateUserRequest) => {
    return new Service(serviceUrls.usersPath(), getToken()).post<
      GenericResponse<User>
    >(payload);
  },

  update: async (id: number, payload: UpdateUserRequest) => {
    return new Service(serviceUrls.usersPath(String(id)), getToken()).put<
      GenericResponse<User>
    >(payload);
  },

  delete: async (id: number) => {
    return new Service(
      serviceUrls.usersPath(`delete/${id}`),
      getToken(),
    ).patch<GenericResponse<null>>();
  },
};
