import { useEffect, useRef, useCallback } from "react";
import { useControl } from "react-map-gl/mapbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";

export const ShapeEditor: React.FC = () => {
  const isDrawMode = useDoorToDoorStore((state) => state.isDrawMode);
  const isEditingBoundary = useDoorToDoorStore((state) => state.isEditingBoundary);
  const editingBlockId = useDoorToDoorStore((state) => state.editingBlockId);
  const editingMap = useDoorToDoorStore((state) => state.editingMap);
  const editedBlocks = useDoorToDoorStore((state) => state.editedBlocks);
  const editedBoundary = useDoorToDoorStore((state) => state.editedBoundary);
  const setEditedBoundary = useDoorToDoorStore((state) => state.setEditedBoundary);
  const setEditedBlocks = useDoorToDoorStore((state) => state.setEditedBlocks);
  const mapRef = useDoorToDoorStore((state) => state.mapRef);
  const drawRef = useRef<MapboxDraw | null>(null);

  const draw = useControl<MapboxDraw>(
    () => {
      const instance = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          line_string: true,
          trash: true,
        },
        defaultMode: "simple_select",
      });
      drawRef.current = instance;
      return instance;
    },
    () => {},
    () => {},
    {
      position: "top-left",
    }
  );

  const handleDrawUpdate = useCallback(() => {
    if (!draw) return;
    
    const data = draw.getAll();
    
    if (isEditingBoundary) {
      if (data.features.length > 0) {
        const feature = data.features[0];
        if (feature.geometry.type === "Polygon") {
          const coordinates = feature.geometry.coordinates[0] as [number, number][];
          setEditedBoundary(coordinates);
        }
      } else {
        setEditedBoundary(null);
      }
    } else if (editingBlockId && editedBlocks) {
      if (data.features.length > 0) {
        const feature = data.features[0];
        let coordinates: [number, number][] = [];
        
        if (feature.geometry.type === "Polygon") {
          coordinates = feature.geometry.coordinates[0] as [number, number][];
        } else if (feature.geometry.type === "LineString") {
          coordinates = feature.geometry.coordinates as [number, number][];
        }

        const updatedBlocks = editedBlocks.map((block) =>
          block.id === editingBlockId
            ? { ...block, coordinates }
            : block
        );
        setEditedBlocks(updatedBlocks);
      }
    }
  }, [draw, isEditingBoundary, editingBlockId, editedBlocks, setEditedBoundary, setEditedBlocks]);

  useEffect(() => {
    if (!mapRef) return;
    const map = mapRef.getMap();
    
    map.on("draw.create", handleDrawUpdate);
    map.on("draw.update", handleDrawUpdate);
    map.on("draw.delete", handleDrawUpdate);

    return () => {
      map.off("draw.create", handleDrawUpdate);
      map.off("draw.update", handleDrawUpdate);
      map.off("draw.delete", handleDrawUpdate);
    };
  }, [mapRef, handleDrawUpdate]);

  useEffect(() => {
    if (!draw) return;

    draw.deleteAll();

    if (isEditingBoundary && editingMap) {
      const boundary = editedBoundary ?? editingMap.boundary;
      if (boundary && boundary.length > 0) {
        const polygon = {
          type: "Feature" as const,
          geometry: {
            type: "Polygon" as const,
            coordinates: [boundary],
          },
          properties: {},
        };
        
        const featureIds = draw.add(polygon);
        if (featureIds.length > 0) {
          draw.changeMode("simple_select", { featureIds: [featureIds[0]] });
        }
      } else {
        draw.changeMode("draw_polygon");
      }
    } else if (editingBlockId && editedBlocks) {
      const currentBlock = editedBlocks.find((b) => b.id === editingBlockId);
      if (!currentBlock) return;

      if (currentBlock.coordinates && currentBlock.coordinates.length > 0) {
        const feature = currentBlock.type === "block"
          ? {
              type: "Feature" as const,
              geometry: {
                type: "Polygon" as const,
                coordinates: [currentBlock.coordinates],
              },
              properties: {},
            }
          : {
              type: "Feature" as const,
              geometry: {
                type: "LineString" as const,
                coordinates: currentBlock.coordinates,
              },
              properties: {},
            };
        
        const featureIds = draw.add(feature);
        if (featureIds.length > 0) {
          draw.changeMode("simple_select", { featureIds: [featureIds[0]] });
        }
      } else {
        if (currentBlock.type === "block") {
          draw.changeMode("draw_polygon");
        } else {
          draw.changeMode("draw_line_string");
        }
      }
    }
  }, [isEditingBoundary, editingBlockId, editingMap, editedBoundary, editedBlocks, draw]);

  useEffect(() => {
    if (!isDrawMode && draw) {
      draw.deleteAll();
    }
  }, [isDrawMode, draw]);

  if (!isDrawMode) return null;

  return null;
};
