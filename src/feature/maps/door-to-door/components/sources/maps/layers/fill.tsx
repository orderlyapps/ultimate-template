import type { LayerProps } from "react-map-gl/mapbox";

export const getFillLayer = (selectedMapName: string | null): LayerProps => {
  const opacity = selectedMapName ? 0.05 : 0;

  return {
    id: "maps-fill",
    type: "fill",
    source: "maps",
    minzoom: 14,
    paint: {
      "fill-color": "#f00",
      "fill-opacity": [
        "case",
        ["==", ["get", "name"], ["literal", selectedMapName]],
        0,
        opacity,
      ],
    },
    beforeId: "road-label",
  };
};
