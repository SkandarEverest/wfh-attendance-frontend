export type GenericResponse<T> = {
  success?: boolean;
  status?: number;
  data: T;
  message: string;
};

export type PaginatedResponse<T> = {
  success?: boolean;
  status?: number;
  data: T[];
  message: string;
  total?: number;
  page?: number;
  size?: number;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
