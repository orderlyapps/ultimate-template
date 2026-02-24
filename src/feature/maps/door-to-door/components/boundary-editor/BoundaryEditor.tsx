import { useEffect, useRef } from "react";
import { useControl } from "react-map-gl/mapbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";

export const BoundaryEditor: React.FC = () => {
  const isEditingBoundary = useDoorToDoorStore((state) => state.isEditingBoundary);
  const editingMap = useDoorToDoorStore((state) => state.editingMap);
  const setEditedBoundary = useDoorToDoorStore((state) => state.setEditedBoundary);
  const drawRef = useRef<MapboxDraw | null>(null);

  const draw = useControl<MapboxDraw>(
    () => {
      const instance = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
        defaultMode: "simple_select",
      });
      drawRef.current = instance;
      return instance;
    },
    ({ map }) => {
      const handleDrawUpdate = () => {
        if (!drawRef.current) return;
        const data = drawRef.current.getAll();
        if (data.features.length > 0) {
          const feature = data.features[0];
          if (feature.geometry.type === "Polygon") {
            const coordinates = feature.geometry.coordinates[0] as [number, number][];
            setEditedBoundary(coordinates);
          }
        } else {
          setEditedBoundary(null);
        }
      };

      map.on("draw.create", handleDrawUpdate);
      map.on("draw.update", handleDrawUpdate);
      map.on("draw.delete", handleDrawUpdate);
    },
    ({ map }) => {
      map.off("draw.create", () => {});
      map.off("draw.update", () => {});
      map.off("draw.delete", () => {});
    },
    {
      position: "top-left",
    }
  );

  useEffect(() => {
    if (!draw || !isEditingBoundary || !editingMap) return;

    draw.deleteAll();

    if (editingMap.boundary && editingMap.boundary.length > 0) {
      const polygon = {
        type: "Feature" as const,
        geometry: {
          type: "Polygon" as const,
          coordinates: [editingMap.boundary],
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
  }, [isEditingBoundary, editingMap, draw]);

  useEffect(() => {
    if (!isEditingBoundary && draw) {
      draw.deleteAll();
    }
  }, [isEditingBoundary, draw]);

  if (!isEditingBoundary) return null;

  return null;
};
