import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Icon } from "@ionic-display/icon/Icon";
import crossIcon from "@icons/cross.svg";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import { List } from "@ionic-layout/list/List";
import { IonListHeader } from "@ionic/react";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";

export const SelectedMap: React.FC = () => {
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);
  const setSelectedMap = useDoorToDoorStore((state) => state.setSelectedMap);
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);
  const { handleZoomToMap } = useZoomToMap();

  if (!selectedMap) return null;

  const handleClear = () => {
    addToRecentMaps(selectedMap);
    setSelectedMap(null);
  };

  return (
    <List>
      <IonListHeader>
        <Label>Selected Map</Label>
      </IonListHeader>
      <Item>
        <div
          style={{ width: "100%" }}
          onClick={() => handleZoomToMap(selectedMap)}
        >
          <Text className="ion-padding-end">{selectedMap?.name}</Text>
        </div>
        <Icon slot="end" src={crossIcon} onClick={handleClear} />
      </Item>
    </List>
  );
};
