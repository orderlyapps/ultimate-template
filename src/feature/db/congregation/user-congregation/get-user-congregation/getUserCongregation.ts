import type { Congregation } from "@tanstack-db/congregation/congregationSchema";
import { USER_CONGREGATION_KEY } from "../use-user-congregation/useUserCongregation";

export const getUserCongregation = (): Congregation | null => {
  const value = localStorage.getItem(USER_CONGREGATION_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
