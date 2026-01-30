import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { USER_PUBLISHER_KEY } from "../use-user-publisher/useUserPublisher";

export const getUserPublisher = (): Publisher | null => {
  const value = localStorage.getItem(USER_PUBLISHER_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
