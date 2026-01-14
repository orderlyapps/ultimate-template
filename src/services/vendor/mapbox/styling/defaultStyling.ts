import { fromJS, type Map as ImmutableMap, type List } from "immutable";
import MAP_STYLE from "./style.json";

export const defaultMapStyle = fromJS(MAP_STYLE);

export const defaultLayers = defaultMapStyle.get("layers") as List<
  ImmutableMap<string, unknown>
>;
