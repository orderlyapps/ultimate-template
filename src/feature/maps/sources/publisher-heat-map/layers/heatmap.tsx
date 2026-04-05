import type { LayerProps } from "react-map-gl/mapbox";

export const getHeatmapLayer = (): LayerProps => {
  return {
    id: "publisher-heat-map-heatmap",
    type: "heatmap",
    source: "publisher-heat-map",
    maxzoom: 12,
    paint: {
      "heatmap-weight": 0.1,
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        15,
        3,
      ],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.05,
        "rgb(103,169,207)",
        0.1,
        "rgb(209,229,240)",
        0.2,
        "rgb(253,219,119)",
        0.3,
        "rgb(239,138,98)",
        1,
        "rgb(178,24,43)",
      ],
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        5,
        1,
        22,
        60,
      ],
      "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        1,
        12,
        0,
      ],
    },
  };
};
