import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ActiveUser } from "@/types";

type AuthState = {
  user: ActiveUser | null;
  token: string;
};

type AuthActions = {
  setToken: (token: string) => void;
  setUser: (user: ActiveUser) => void;
  reset: () => void;
};

const initialState: AuthState = {
  user: null,
  token: "",
};

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      ...initialState,

      setToken: (token) => set({ token }),

      setUser: (user) => set({ user }),

      reset: () => set({ ...initialState }),
    }),
    {
      name: "wfh-auth",
      version: 2,
      migrate: (persistedState) => {
        const state = (persistedState ?? {}) as Partial<AuthState> & {
          user?: Record<string, unknown> | null;
        };

        const previousUser = state.user as Record<string, unknown> | null | undefined;
        const migratedUser =
          previousUser &&
          !("roleName" in previousUser) &&
          "role" in previousUser
            ? {
                id: Number(previousUser.id ?? 0),
                name: String(previousUser.fullName ?? previousUser.name ?? ""),
                email: String(previousUser.email ?? ""),
                roleId: Number(
                  (previousUser.role as { id?: number } | undefined)?.id ?? 0,
                ),
                roleName: String(
                  (previousUser.role as { name?: string } | undefined)?.name ??
                    "",
                ),
                modules: Array.isArray(previousUser.modules)
                  ? previousUser.modules
                  : [],
              }
            : (previousUser as ActiveUser | null | undefined);

        return {
          ...initialState,
          token: state.token ?? "",
          user: migratedUser ?? null,
        } as AuthState & AuthActions;
      },
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
