import { useTheme } from "@services/app/theme/useTheme";
import { useMapStyle } from "@services/vendor/mapbox/hooks/use-map-style/useMapStyle";
import DEFAULT_MAP_STYLE from "../../styling/style.json";
import type { ImmutableLike, StyleSpecification } from "react-map-gl/mapbox";

export type MapStyle = "standard" | "dark" | "satellite" | "rural" | "print";

type StyleValue =
  | string
  | StyleSpecification
  | ImmutableLike<StyleSpecification>
  | undefined;

const mapStyles: Record<MapStyle, StyleValue> = {
  standard: "mapbox://styles/damianamodeo/cmdpsma8m001101srez71g8d0",
  dark: "mapbox://styles/damianamodeo/cmel2s3td005z01si07d9b3wb",
  satellite: "mapbox://styles/damianamodeo/cmelauoui00jd01r9240kd3rl",
  rural: "mapbox://styles/damianamodeo/cmdrwoc0r003c01re3npfcu9z",
  print: DEFAULT_MAP_STYLE as unknown as StyleSpecification,
};

export const useMapStyleURL = (id?: string): StyleValue => {
  const isDark = useTheme();

  const [mapStyle = "standard"] = useMapStyle(id);

  if (id === "map-print") return mapStyles.print;

  if (mapStyle === "standard")
    return isDark ? mapStyles["dark"] : mapStyles["standard"];

  return mapStyles[mapStyle];
};
