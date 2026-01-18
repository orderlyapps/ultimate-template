import type { LayerProps } from "react-map-gl/mapbox";

export const getBorderLayer = (selectedMapName: string | null): LayerProps => ({
  id: "maps-borders",
  type: "line",
  source: "maps",
  minzoom: 14,
  paint: {
    "line-color": [
      "case",
      ["==", ["get", "name"], ["literal", selectedMapName]],
      "#f00",
      "#f00",
    ],
    "line-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      14,
      2,
      23,
      ["case", ["==", ["get", "name"], ["literal", selectedMapName]], 12, 2],
    ],
    "line-opacity": [
      "case",
      ["==", ["get", "name"], ["literal", selectedMapName]],
      1,
      0.3,
    ],
  },
  beforeId: "road-label",
});
