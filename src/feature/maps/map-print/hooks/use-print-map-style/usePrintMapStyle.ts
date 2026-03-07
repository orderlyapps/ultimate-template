import { fromJS, List, type Map as ImmutableMap } from "immutable";
import MAP_STYLE from "@services/vendor/mapbox/styling/style.json";
import { useMapPrintStore } from "@feature/maps/map-print/store/use-map-print-store";

const defaultMapStyle = fromJS(MAP_STYLE);
const defaultLayers = defaultMapStyle.get("layers") as List<
  ImmutableMap<string, unknown>
>;

const roadWidthLayers = [
  "road-street",
  "road-street-low",
  "road-street-case",
  "road-secondary-tertiary",
  "road-secondary-tertiary-case",
  "road-primary",
  "road-primary-case",
  "road-motorway-trunk",
  "road-motorway-trunk-case",
  "road-minor",
  "road-minor-low",
  "road-minor-case",
  "road-major-link",
  "road-major-link-case",
];

const roadLabelLayers = ["road-label"];

const multiplyInterpolateValues = (
  expr: List<unknown>,
  multiplier: number
): unknown[] => {
  const arr = expr.toJS() as unknown[];
  if (arr[0] !== "interpolate" && arr[0] !== "step") {
    return arr;
  }

  const result = [...arr];
  const startIndex = arr[0] === "interpolate" ? 3 : 2;

  for (let i = startIndex; i < result.length; i += 2) {
    if (typeof result[i + 1] === "number") {
      result[i + 1] = (result[i + 1] as number) * multiplier;
    }
  }

  return result;
};

export const usePrintMapStyle = () => {
  const { styling } = useMapPrintStore();

  const layers = defaultLayers?.map((layer: ImmutableMap<string, unknown>) => {
    const layerId = layer.get("id") as string;
    let modifiedLayer = layer;

    if (roadWidthLayers.includes(layerId)) {
      const currentWidth = layer.getIn(["paint", "line-width"]);
      if (currentWidth !== undefined) {
        if (typeof currentWidth === "number") {
          modifiedLayer = modifiedLayer.setIn(
            ["paint", "line-width"],
            currentWidth * styling.roadWidth
          );
        } else if (List.isList(currentWidth)) {
          modifiedLayer = modifiedLayer.setIn(
            ["paint", "line-width"],
            multiplyInterpolateValues(currentWidth as List<unknown>, styling.roadWidth)
          );
        }
      }
    }

    if (roadLabelLayers.includes(layerId)) {
      const currentSize = layer.getIn(["layout", "text-size"]);
      if (currentSize !== undefined) {
        if (typeof currentSize === "number") {
          modifiedLayer = modifiedLayer.setIn(
            ["layout", "text-size"],
            currentSize * styling.roadLabelSize
          );
        } else if (List.isList(currentSize)) {
          modifiedLayer = modifiedLayer.setIn(
            ["layout", "text-size"],
            multiplyInterpolateValues(currentSize as List<unknown>, styling.roadLabelSize)
          );
        }
      }
    }

    return modifiedLayer;
  });

  return defaultMapStyle.set("layers", layers);
};
