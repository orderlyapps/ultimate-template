import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import type { LayerProps } from "react-map-gl/mapbox";

export const SOURCE_ID = "edited-blocks";

const getEditedBlocksBorderLayer = (): LayerProps => ({
  id: "edited-blocks-borders",
  type: "line",
  source: SOURCE_ID,
  paint: {
    "line-color": "#f59e0b",
    "line-width": 3,
    "line-opacity": 0.9,
  },
  beforeId: "road-label",
});

const getEditedBlocksLabelLayer = (): LayerProps => ({
  id: "edited-blocks-labels",
  type: "symbol",
  source: SOURCE_ID,
  layout: {
    "text-field": ["get", "name"],
    "text-size": 12,
    "text-anchor": "center",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#92400e",
    "text-halo-color": "#ffffff",
    "text-halo-width": 2,
  },
});

export const EditedBlocks: React.FC = () => {
  const editedBlocks = useDoorToDoorStore((state) => state.editedBlocks);
  const editingBlockId = useDoorToDoorStore((state) => state.editingBlockId);

  if (!editedBlocks || editedBlocks.length === 0) return null;

  const blocksToShow = editedBlocks.filter(
    (block) => block.id !== editingBlockId && block.coordinates && block.coordinates.length > 0
  );

  if (blocksToShow.length === 0) return null;

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: blocksToShow.map((block) => ({
      type: "Feature" as const,
      id: block.id,
      properties: {
        id: block.id,
        name: block.name,
        type: block.type,
      },
      geometry: block.type === "block"
        ? {
            type: "Polygon" as const,
            coordinates: [block.coordinates],
          }
        : {
            type: "LineString" as const,
            coordinates: block.coordinates,
          },
    })),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getEditedBlocksBorderLayer()} />
      <Layer {...getEditedBlocksLabelLayer()} />
    </Source>
  );
};
