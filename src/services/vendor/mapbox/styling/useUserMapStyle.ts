import { defaultMapStyle } from "@services/vendor/mapbox/styling/defaultStyling";
import { useLocalStorage } from "@util/hooks/useLocalStorage";

export const getUserMapStyleKey = (id?: string) =>
  `user-map-style-[${id || "default"}]`;

export const useUserMapStyle = (id?: string) => {
  return useLocalStorage(getUserMapStyleKey(id), defaultMapStyle);
};
