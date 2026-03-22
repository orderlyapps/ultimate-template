import { useLocalStorage } from "@util/hooks/useLocalStorage";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";

// TEMPORARY: Remove this entire file when auth is fully implemented
const TEMP_FEATURE_ACCESS_KEY = "temp-feature-access-unlocked";

// TEMPORARY: Authorized users with passwords
const TEMP_AUTHORIZED_USERS = [
  { id: "9da270dd-ef23-417b-89a8-2a61bcbe24e0", password: "amodeo" , name: "damian"},
  { id: "3d0dbd38-c50d-487c-a6a4-2aa2f9b844b0", password: "bennies", name: "tom" },
] as const;

export const useFeatureAccess = (allowedNames: string[]) => {
  const [userPublisher] = useUserPublisher();
  const [unlockedUsers, setUnlockedUsers] = useLocalStorage<string[]>(
    TEMP_FEATURE_ACCESS_KEY,
    []
  );

  const currentUserId = userPublisher?.id;

  const currentUserName = TEMP_AUTHORIZED_USERS.find(
    (u) => u.id === currentUserId
  )?.name;

  const isUserAllowed = currentUserName
    ? allowedNames.includes(currentUserName)
    : false;

  const isUnlocked = currentUserId ? unlockedUsers.includes(currentUserId) : false;

  const validatePassword = (password: string): boolean => {
    if (!currentUserId) return false;

    const authorizedUser = TEMP_AUTHORIZED_USERS.find(
      (u) => u.id === currentUserId
    );
    if (!authorizedUser) return false;

    if (authorizedUser.password === password) {
      setUnlockedUsers([...unlockedUsers.filter((id) => id !== currentUserId), currentUserId]);
      return true;
    }
    return false;
  };

  const lock = () => {
    if (!currentUserId) return;
    setUnlockedUsers(unlockedUsers.filter((id) => id !== currentUserId));
  };

  return {
    isUserAllowed,
    isUnlocked,
    validatePassword,
    lock,
    currentUserId,
  };
};

// TEMPORARY: Get all authorized user names for convenience
export const TEMP_ALL_AUTHORIZED_NAMES = TEMP_AUTHORIZED_USERS.map((u) => u.name);
