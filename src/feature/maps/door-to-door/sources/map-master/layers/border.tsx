import type { LayerProps } from "react-map-gl/mapbox";

export const getBorderLayer = (): LayerProps => {
  return {
    id: "map-master-border",
    type: "line",
    source: "map-master",
    // minzoom: 10,
    paint: {
      "line-color": "grey",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        1,
        2,
        18,
        4,
      ],
      "line-opacity": 0.6,
    },
    beforeId: "road-label",
  };
};
