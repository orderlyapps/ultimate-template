import { useThemeStore } from "@services/app/theme/themeStore";
import { useMapStyle } from "@services/vendor/mapbox/hooks/use-map-style/useMapStyle";

const mapStyles = {
  standard: {
    light: "mapbox://styles/damianamodeo/cmdpsma8m001101srez71g8d0",
    dark: "mapbox://styles/damianamodeo/cmel2s3td005z01si07d9b3wb",
  },
  satellite: "mapbox://styles/damianamodeo/cmelauoui00jd01r9240kd3rl",
  rural: "mapbox://styles/damianamodeo/cmdrwoc0r003c01re3npfcu9z",
};

export type MapStyle = Omit<keyof typeof mapStyles, "standard"> | undefined;

export const useMapStyleURL = (id?: string) => {
  const [mapStyle] = useMapStyle(id);
  
  const theme = useThemeStore((state) => state.preference);

  if (mapStyle === "rural") return mapStyles.rural;

  if (mapStyle === "satellite") return mapStyles.satellite;

  if (theme === "dark") return mapStyles.standard.dark;

  return mapStyles.standard.light;
};
