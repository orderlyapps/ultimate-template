// import { SOURCE_ID } from "@feature/maps/door-to-door/sources/maps/Maps";
import type { LayerProps } from "react-map-gl/mapbox";

export const label: LayerProps = {
  id: "maps-labels",
  type: "symbol",
  source: "maps",
  minzoom: 14,
  layout: {
    "text-field": ["get", "name"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 14, 8, 23, 75],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#F00",
  },
  beforeId: "road-label",
};
