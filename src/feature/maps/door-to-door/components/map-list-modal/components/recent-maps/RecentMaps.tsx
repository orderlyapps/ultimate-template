import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { List } from "@ionic-layout/list/List";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import type { Map } from "@tanstack-db/map/mapSchema";
import { MapEditButton } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/components/map-edit-button/MapEditButton";

interface RecentMapsProps {
  show: boolean;
}

export const RecentMaps: React.FC<RecentMapsProps> = ({ show }) => {
  const recentMaps = useDoorToDoorStore((state) => state.recentMaps);
  const { handleZoomToMap } = useZoomToMap();
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);
  const setSelectedMap = useDoorToDoorStore((state) => state.setSelectedMap);
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);
  const setEditMode = useDoorToDoorStore((state) => state.setEditMode);
  const setEditingMap = useDoorToDoorStore((state) => state.setEditingMap);
  const closeMapListModal = useDoorToDoorStore(
    (state) => state.closeMapListModal,
  );

  const { data: allMaps } = useLiveQuery((q) =>
    q.from({
      m: mapCollection,
    }),
  );

  const filteredRecentMaps = recentMaps.filter(
    (map) => map.id !== selectedMap?.id,
  );

  if (filteredRecentMaps.length === 0 || !allMaps) return null;

  const recentMapObjects = filteredRecentMaps
    .map((recentMap) => allMaps.find((map) => map.id === recentMap.id))
    .filter((map) => map !== undefined);

  if (recentMapObjects.length === 0) return null;

  const handleSelectMap = (map: Map) => {
    if (selectedMap) {
      addToRecentMaps(selectedMap);
    }
    handleZoomToMap(map);
    setSelectedMap(map);
  };

  const handleEditMap = (map: Map, event: React.MouseEvent) => {
    event.stopPropagation();
    handleZoomToMap(map);
    setEditingMap(map);
    setEditMode(true);
    closeMapListModal();
  };

  return (
    <List>
      <IonListHeader>
        <Label>Recent Maps</Label>
      </IonListHeader>
      {recentMapObjects.map((map) => (
        <Item key={map.id} onClick={() => handleSelectMap(map)}>
          <Text>{map.name}</Text>
          <div slot="end">
            <MapEditButton
              map={map}
              selectedMap={selectedMap}
              show={show}
              onEdit={handleEditMap}
            />
          </div>
        </Item>
      ))}
    </List>
  );
};
