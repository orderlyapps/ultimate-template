import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";

export const USER_CONGREGATION_KEY = "user-congregation";

export const useUserCongregation = () => {
  return useLocalStorage<Congregation | null>(USER_CONGREGATION_KEY, {
    id: "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b",
    name: "Maitland",
    congregation_id: null,
  });
};
