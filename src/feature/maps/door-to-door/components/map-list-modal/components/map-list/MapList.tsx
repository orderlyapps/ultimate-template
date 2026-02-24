import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { IonListHeader, IonIcon, IonButton } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import type { Map } from "@tanstack-db/map/mapSchema";
import pencilIcon from "@icons/edit.svg";

export const MapList: React.FC = () => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: mapCollection,
      })
      .orderBy(({ m }) => m.name),
  );

  const { handleZoomToMap } = useZoomToMap();

  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);
  const setSelectedMap = useDoorToDoorStore(
    (state) => state.setSelectedMap,
  );
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);
  const setEditMode = useDoorToDoorStore((state) => state.setEditMode);
  const setEditingMap = useDoorToDoorStore((state) => state.setEditingMap);
  const closeMapListModal = useDoorToDoorStore(
    (state) => state.closeMapListModal,
  );

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

  if (!data) return null;

  return (
    <List>
      <IonListHeader>
        <Label>All Maps</Label>
      </IonListHeader>
      {data.map((map) => (
        <Item
          key={map.id}
          onClick={() => handleSelectMap(map)}
          color={map.id === selectedMap?.id ? "medium" : ""}
        >
          <Text bold={map.id === selectedMap?.id}>{map.name}</Text>
          <IonButton
            slot="end"
            fill="clear"
            onClick={(e) => handleEditMap(map, e)}
          >
            <IonIcon icon={pencilIcon} />
          </IonButton>
        </Item>
      ))}
    </List>
  );
};
