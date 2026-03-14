import type { ActiveUser } from "@/types";

const normalize = (value: string) => value.trim().toLowerCase();

export const hasModuleAccess = (
  user: ActiveUser | null | undefined,
  moduleKey: string,
) => {
  if (!user) {
    return false;
  }

  const target = normalize(moduleKey);

  return user.modules.some((module) => {
    const moduleName = normalize(module.moduleName);
    return module.ability.view && moduleName.includes(target);
  });
};
