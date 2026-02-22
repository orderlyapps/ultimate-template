import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";

export const USER_CONGREGATION_KEY = "user-congregation";

export const useUserCongregation = () => {
  const congregationId = localStorage.getItem("congregationId") || "null";

  return useLocalStorage<Congregation | null>(USER_CONGREGATION_KEY, {
    id: congregationId,
    name: "Maitland",
    congregation_id: null,
  });
};
