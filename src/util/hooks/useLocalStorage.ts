import { useCallback, useEffect, useSyncExternalStore, type SetStateAction } from "react";

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

const setLocalStorageItem = (key: string, value: unknown) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback: () => void) => {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};

const getLocalStorageServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

const safeJsonParse = <T,>(value: string | null): T | undefined => {
  if (value === null) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (v: SetStateAction<T | null | undefined>) => void];
export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T | undefined, (v: SetStateAction<T | null | undefined>) => void];
export function useLocalStorage<T>(key: string, initialValue?: T) {
  const getSnapshot = (): string | null => getLocalStorageItem(key);

  const store = useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot
  );

  const currentValue = (safeJsonParse<T>(store) ?? initialValue) as
    | T
    | undefined;

  const setState = useCallback(
    (v: SetStateAction<T | null | undefined>) => {
      try {
        const nextState =
          typeof v === "function"
            ? (v as (prev: T | null | undefined) => T | null | undefined)(
                currentValue
              )
            : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, currentValue]
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [currentValue, setState];
}
