export type Role = {
  id: number;
  name: string;
  status?: boolean;
  createdBy?: string | null;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string;
  deletedBy?: string | null;
  deletedAt?: string | null;
};

export type ModuleAbility = {
  view: boolean;
  edit: boolean;
  delete: boolean;
};

export type UserModule = {
  moduleId: number;
  moduleName: string;
  ability: ModuleAbility;
};

export type ActiveUser = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
  modules: UserModule[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  deletedAt?: string | null;
};

export type Timesheet = {
  id: number;
  userId: number;
  user?: User;
  checkInTime: string;
  photoUrl: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
