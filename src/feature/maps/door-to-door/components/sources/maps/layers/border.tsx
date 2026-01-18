// import { SOURCE_ID } from "@feature/maps/door-to-door/sources/maps/Maps";
import type { LayerProps } from "react-map-gl/mapbox";

export const border: LayerProps = {
  id: "maps-borders",
  type: "line",
  source: "maps",
  minzoom: 14,
  paint: {
    "line-color": "#f00",
    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 2, 23, 12],
  },
  beforeId: "road-label",
};
