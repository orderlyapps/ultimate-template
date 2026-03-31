import type { LayerProps } from "react-map-gl/mapbox";

export const getCircleLayer = (): LayerProps => {
  return {
    id: "publishers-addresses-circle",
    type: "circle",
    source: "publishers-addresses",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        4,
        18,
        10,
      ],
      "circle-color": "#4A90D9",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.9,
    },
  };
};
