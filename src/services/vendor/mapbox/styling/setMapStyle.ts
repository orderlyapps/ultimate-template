import {
  defaultLayers,
  defaultMapStyle,
} from "@services/vendor/mapbox/styling/defaultStyling";
import type { Map as ImmutableMap } from "immutable";

export const features = {
  roadWidth: {
    "road-street": ["paint", "line-width"],
    "road-secondary-tertiary": ["paint", "line-width"],
  },
  roadLabelSize: {
    "road-label": ["layout", "text-size"],
  },
};

export const setMapStyle = (
  feature: keyof typeof features,
  newSize: number
) => {
  const layers = defaultLayers?.map((layer: ImmutableMap<string, unknown>) => {
    const layerId = layer.get("id") as keyof (typeof features)[typeof feature];

    const featureExists = features[feature][layerId];

    if (featureExists) {
      return layer.setIn(features[feature][layerId], newSize);
    }

    return layer;
  });

  // @ts-expect-error - Immutable.js type inference is overly strict for this use case
  return defaultMapStyle.set("layers", layers);
};
