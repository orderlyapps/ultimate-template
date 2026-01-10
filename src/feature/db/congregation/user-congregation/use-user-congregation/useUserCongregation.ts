import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";

export const USER_CONGREGATION_KEY = "user-congregation";

export const useUserCongregation = () => {
  return useLocalStorage<Congregation | null>(USER_CONGREGATION_KEY, null);
};
