import type { MapMouseEvent } from "react-map-gl/mapbox";
import type { GeoJSONSource } from "mapbox-gl";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import type { DoNotCall } from "@feature/maps/door-to-door/sources/do-not-calls/DoNotCalls";
import type { NotAtHome } from "@feature/maps/door-to-door/sources/not-at-home/NotAtHome";

export const useMapClickHandler = () => {
  const mapRef = useDoorToDoorStore((state) => state.mapRef);

  const setSelectedDoNotCall = useDoorToDoorStore(
    (state) => state.setSelectedDoNotCall,
  );

  const setSelectedNotAtHome = useDoorToDoorStore(
    (state) => state.setSelectedNotAtHome,
  );

  const setSelectedUnits = useDoorToDoorStore(
    (state) => state.setSelectedUnits,
  );

  const handleMapClick = ({ features }: MapMouseEvent) => {
    if (!features?.[0]) return;

    if (features?.[0].layer?.id === "do-not-call-house-points") {
      setSelectedDoNotCall(features[0].properties as DoNotCall);
    }

    if (features?.[0].layer?.id === "do-not-call-unit-points") {
      setSelectedDoNotCall(features[0].properties as DoNotCall);
    }

    if (features?.[0].layer?.id === "not-at-home-house-points") {
      console.log(features[0]);
      setSelectedNotAtHome(features[0].properties as NotAtHome);
    }

    if (features?.[0].layer?.id === "not-at-home-unit-points") {
      console.log(features[0]);
      const unitData = JSON.parse(features[0].properties?.unit_data);
      if (unitData && Array.isArray(unitData)) {
        setSelectedUnits(unitData as NotAtHome[]);
      }
    }

    if (features?.[0].layer?.id === "not-at-home-cluster-points") {
      console.log(features[0]);

      if (!features?.[0].properties?.cluster) {
        setSelectedNotAtHome(features[0].properties as NotAtHome);
        return;
      }

      const feature = features[0];
      const clusterId = feature.properties?.cluster_id;

      if (feature.geometry.type !== "Point") return;

      const coordinates = feature.geometry.coordinates as [number, number];
      const mapboxSource = mapRef?.getSource("not-at-home") as GeoJSONSource;

      mapboxSource?.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || zoom === null) {
          return;
        }

        mapRef?.easeTo({
          center: coordinates,
          zoom,
          duration: 500,
        });
      });
    }
  };

  return handleMapClick;
};
