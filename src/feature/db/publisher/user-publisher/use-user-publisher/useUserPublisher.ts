import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

export const USER_PUBLISHER_KEY = "user-publisher";

export const useUserPublisher = () => {
  return useLocalStorage<Publisher | null>(USER_PUBLISHER_KEY, null);
};
