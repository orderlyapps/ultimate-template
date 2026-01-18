import type { LayerProps } from "react-map-gl/mapbox";

export const getLabelLayer = (selectedMapName: string | null): LayerProps => {
  const opacity = selectedMapName ? 50 : 75;

  return {
    id: "maps-labels",
    type: "symbol",
    source: "maps",
    minzoom: 14,
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        8,
        23,
        [
          "case",
          ["==", ["get", "name"], ["literal", selectedMapName]],
          100,
          opacity,
        ],
      ],

      "text-anchor": "center",
    },
    paint: {
      "text-color": "#F00",
    },
    beforeId: "road-label",
  };
};
