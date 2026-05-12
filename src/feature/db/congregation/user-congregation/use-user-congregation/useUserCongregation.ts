import { useEffect } from "react";
import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";

export const USER_CONGREGATION_KEY = "user-congregation";
export const CONGREGATION_ID_KEY = "congregationId";

export const useUserCongregation = () => {
  // Read the persisted user-congregation object as the source of truth.
  const result = useLocalStorage<Congregation | null>(USER_CONGREGATION_KEY, {
    id: localStorage.getItem(CONGREGATION_ID_KEY) || "null",
    name: "Maitland",
    congregation_id: null,
  });

  const [congregation] = result;

  // Mirror the selected congregation's id into the legacy "congregationId"
  // localStorage key so non-hook callsites that read it continue to work.
  useEffect(() => {
    const id = congregation?.id;
    if (id && id !== "null") {
      localStorage.setItem(CONGREGATION_ID_KEY, id);
    }
  }, [congregation?.id]);

  return result;
};
