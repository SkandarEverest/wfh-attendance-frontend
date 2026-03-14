export type LoginRequest = {
  email: string;
  password: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  roleId: number;
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
};

export type CheckInRequest = {
  notes?: string;
  photo?: File;
};
