import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Icon } from "@ionic-display/icon/Icon";
import crossIcon from "@icons/cross.svg";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import { List } from "@ionic-layout/list/List";
import { IonLabel, IonListHeader } from "@ionic/react";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";
import { MapEditButton } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/components/map-edit-button/MapEditButton";
import type { Map } from "@tanstack-db/map/mapSchema";

interface SelectedMapProps {
  show: boolean;
}

export const SelectedMap: React.FC<SelectedMapProps> = ({ show }) => {
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);
  const setSelectedMap = useDoorToDoorStore((state) => state.setSelectedMap);
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);
  const setEditMode = useDoorToDoorStore((state) => state.setEditMode);
  const setEditingMap = useDoorToDoorStore((state) => state.setEditingMap);
  const closeMapListModal = useDoorToDoorStore(
    (state) => state.closeMapListModal,
  );
  const { handleZoomToMap } = useZoomToMap();

  if (!selectedMap) return null;

  const handleClear = () => {
    addToRecentMaps(selectedMap);
    setSelectedMap(null);
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
        <Label>Selected Map</Label>
      </IonListHeader>
      <Item>
        <IonLabel
          style={{ width: "100%" }}
          onClick={() => handleZoomToMap(selectedMap)}
        >
          <Text className="ion-padding-end">{selectedMap?.name}</Text>
        </IonLabel>
        <div slot="end">
          <MapEditButton
            map={selectedMap}
            selectedMap={selectedMap}
            show={show}
            onEdit={handleEditMap}
          />
          {show && <span className="ion-padding-end"></span>}
          <Icon src={crossIcon} onClick={handleClear} />
        </div>
      </Item>
    </List>
  );
};
