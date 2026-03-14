import type { GenericResponse, PaginatedResponse, Timesheet } from "@/types";
import { Service } from "./base/Service";
import serviceUrls from ".";
import { useAuthStore } from "@/stores/authStore";

const getToken = () => useAuthStore.getState().token;

export const timesheetService = {
  getAll: async () => {
    return new Service(serviceUrls.timesheetsPath(), getToken()).get<
      PaginatedResponse<Timesheet>
    >();
  },

  getMy: async () => {
    return new Service(serviceUrls.timesheetsPath("my"), getToken()).get<
      PaginatedResponse<Timesheet>
    >();
  },

  getById: async (id: number) => {
    return new Service(
      serviceUrls.timesheetsPath(String(id)),
      getToken(),
    ).get<GenericResponse<Timesheet>>();
  },

  checkIn: async (data: FormData) => {
    return new Service(
      serviceUrls.timesheetsPath("check-in"),
      getToken(),
    ).post<GenericResponse<Timesheet>>(data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
