import type { ActiveUser, GenericResponse } from "@/types";
import type { LoginRequest } from "@/types/requests";
import { Service } from "./base/Service";
import serviceUrls from ".";

type LoginData = ActiveUser & { token?: string };
export type LoginResponse = GenericResponse<LoginData>;

export const authService = {
  login: async (payload: LoginRequest) => {
    return new Service(serviceUrls.authPath()).request<LoginResponse>(
      "POST",
      payload,
      { withToken: false },
    );
  },

  logout: async () => {
    return new Service(serviceUrls.authPath("logout")).request<
      GenericResponse<null>
    >("POST", undefined, { withToken: false });
  },

  getProfile: async (token = "") => {
    return new Service(serviceUrls.authPath("profile"), token).get<
      GenericResponse<ActiveUser>
    >();
  },
};
