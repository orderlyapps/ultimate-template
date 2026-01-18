import { useThemeStore } from "@services/app/theme/themeStore";
import { useMapStyle } from "@services/vendor/mapbox/hooks/use-map-style/useMapStyle";

export type MapStyle = "standard" | "satellite" | "rural";

const mapStyles: Record<MapStyle, string | { light: string; dark: string }> = {
  standard: {
    light: "mapbox://styles/damianamodeo/cmdpsma8m001101srez71g8d0",
    dark: "mapbox://styles/damianamodeo/cmel2s3td005z01si07d9b3wb",
  },
  satellite: "mapbox://styles/damianamodeo/cmelauoui00jd01r9240kd3rl",
  rural: "mapbox://styles/damianamodeo/cmdrwoc0r003c01re3npfcu9z",
};

export const useMapStyleURL = (id?: string): string => {
  const [mapStyle] = useMapStyle(id);

  const theme = useThemeStore((state) => state.preference);

  const ruralStyle = mapStyles.rural;
  if (mapStyle === "rural") {
    return typeof ruralStyle === "string" ? ruralStyle : ruralStyle.light;
  }

  const satelliteStyle = mapStyles.satellite;
  if (mapStyle === "satellite") {
    return typeof satelliteStyle === "string" ? satelliteStyle : satelliteStyle.light;
  }

  const standardStyle = mapStyles.standard;
  if (typeof standardStyle === "string") return standardStyle;

  if (theme === "dark") return standardStyle.dark;

  return standardStyle.light;
};
