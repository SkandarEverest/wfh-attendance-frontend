import type { GenericResponse, PaginatedResponse, Timesheet } from "@/types";
import { Service } from "./base/Service";
import serviceUrls from ".";
import { useAuthStore } from "@/stores/authStore";

const getToken = () => useAuthStore.getState().token;

export const timesheetService = {
  getAll: async (params?: { page?: number; size?: number }) => {
    return new Service(serviceUrls.timesheetsPath(), getToken()).get<
      PaginatedResponse<Timesheet>
    >(params);
  },

  getMy: async (params?: { page?: number; size?: number }) => {
    return new Service(serviceUrls.timesheetsPath("my"), getToken()).get<
      PaginatedResponse<Timesheet>
    >(params);
  },

  checkIn: async (data: FormData) => {
    return new Service(
      serviceUrls.timesheetsPath("check-in"),
      getToken(),
    ).post<GenericResponse<Timesheet>>(data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getPhotoBlob: async (path: string) => {
    return new Service(
      serviceUrls.timesheetsPath("photo"),
      getToken(),
    ).request<Blob>("GET", undefined, {
      additionalConfig: {
        params: { path },
        responseType: "blob",
      },
    });
  },
};
