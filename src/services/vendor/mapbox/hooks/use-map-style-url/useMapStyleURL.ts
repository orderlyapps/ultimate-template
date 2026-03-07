import { useTheme } from "@services/app/theme/useTheme";
import { useMapStyle } from "@services/vendor/mapbox/hooks/use-map-style/useMapStyle";
import type { ImmutableLike, StyleSpecification } from "react-map-gl/mapbox";
import { usePrintMapStyle } from "@feature/maps/map-print/hooks/use-print-map-style/usePrintMapStyle";

export type MapStyle = "standard" | "dark" | "satellite" | "rural" | "print";

type StyleValue =
  | string
  | StyleSpecification
  | ImmutableLike<StyleSpecification>
  | undefined;

const mapStyles: Record<Exclude<MapStyle, "print">, StyleValue> = {
  standard: "mapbox://styles/damianamodeo/cmdpsma8m001101srez71g8d0",
  dark: "mapbox://styles/damianamodeo/cmel2s3td005z01si07d9b3wb",
  satellite: "mapbox://styles/damianamodeo/cmelauoui00jd01r9240kd3rl",
  rural: "mapbox://styles/damianamodeo/cmdrwoc0r003c01re3npfcu9z",
};

export const useMapStyleURL = (id?: string): StyleValue => {
  const isDark = useTheme();
  const [mapStyle = "standard"] = useMapStyle(id);
  const printStyle = usePrintMapStyle();

  if (id === "map-print") return printStyle as unknown as ImmutableLike<StyleSpecification>;

  if (mapStyle === "standard")
    return isDark ? mapStyles["dark"] : mapStyles["standard"];

  return mapStyles[mapStyle as Exclude<MapStyle, "print">];
};
