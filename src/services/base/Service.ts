import axios, { type AxiosInstance, type AxiosRequestConfig, type Method } from "axios";
import { ServiceError } from "./ServiceError";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export class Service {
  private url: string;
  private token: string;
  private axios: AxiosInstance;
  private config: AxiosRequestConfig;

  constructor(url: string, token?: string) {
    this.url = url;
    this.token = token ?? "";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    this.config = {
      headers,
    };

    this.axios = axios.create({
      baseURL: `${API_BASE_URL}/api/v1`,
      timeout: 15000,
    });
    this.axios.defaults.withCredentials = true;

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error),
    );
  }

  private handleError(error: unknown): never {
    if (error instanceof ServiceError) {
      throw error;
    }

    const serviceError = new ServiceError(
      "An unknown error occurred.",
    );

    if (axios.isAxiosError(error)) {
      if (!error.response?.data) throw serviceError;

      const { data } = error.response;
      const parsed =
        typeof data === "object" ? data : ({} as Record<string, unknown>);

      serviceError.status = parsed.status ?? error.response.status ?? null;
      serviceError.message =
        parsed.message ?? "An error occurred. Please try again.";
      serviceError.data = parsed;

      throw serviceError;
    }

    if (error instanceof Error) {
      serviceError.message = error.message;
    }

    throw serviceError;
  }

  async request<T>(
    method: Method,
    payload?: Record<string, unknown> | FormData,
    opts: { withToken?: boolean; additionalConfig?: AxiosRequestConfig } = {},
  ) {
    const { withToken = true, additionalConfig = {} } = opts;

    const headers: Record<string, string> = {
      ...(this.config.headers as Record<string, string>),
      ...(additionalConfig.headers as Record<string, string> | undefined),
    };

    if (!withToken) {
      delete headers["Authorization"];
    } else if (!this.token) {
      delete headers["Authorization"];
    }

    return this.axios.request<T>({
      method,
      url: this.url,
      data: payload,
      ...additionalConfig,
      headers,
    });
  }

  async get<T>(params?: Record<string, unknown>) {
    return this.axios.get<T>(this.url, {
      ...this.config,
      params,
    });
  }

  async post<T>(
    payload: Record<string, unknown> | FormData,
    additionalConfig: AxiosRequestConfig = {},
  ) {
    return this.axios.post<T>(this.url, payload, {
      ...this.config,
      ...additionalConfig,
      headers: {
        ...(this.config.headers as Record<string, string>),
        ...(additionalConfig.headers as Record<string, string> | undefined),
      },
    });
  }

  async put<T>(payload: Record<string, unknown>) {
    return this.axios.put<T>(this.url, payload, this.config);
  }

  async patch<T>(payload?: Record<string, unknown>) {
    return this.axios.patch<T>(this.url, payload, this.config);
  }

  async delete<T>(params?: Record<string, unknown>) {
    return this.axios.delete<T>(this.url, {
      ...this.config,
      params,
    });
  }
}
