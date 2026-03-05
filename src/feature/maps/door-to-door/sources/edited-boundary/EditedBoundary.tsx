import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import type { LayerProps } from "react-map-gl/mapbox";

const SOURCE_ID = "edited-boundary";

const getBorderLayer = (): LayerProps => ({
  id: "edited-boundary-border",
  type: "line",
  source: SOURCE_ID,
  paint: {
    "line-color": "#3b82f6",
    "line-width": 3,
    "line-opacity": 0.9,
    "line-dasharray": [2, 2],
  },
  beforeId: "road-label",
});

export const EditedBoundary: React.FC = () => {
  const editedBoundary = useDoorToDoorStore((state) => state.editedBoundary);
  const isDrawMode = useDoorToDoorStore((state) => state.isDrawMode);
  const isEditingBoundary = useDoorToDoorStore((state) => state.isEditingBoundary);

  if (!editedBoundary || editedBoundary.length === 0) return null;
  if (isDrawMode && isEditingBoundary) return null;

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [editedBoundary],
        },
      },
    ],
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getBorderLayer()} />
    </Source>
  );
};
