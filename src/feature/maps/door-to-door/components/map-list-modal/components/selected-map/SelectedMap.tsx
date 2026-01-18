import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Icon } from "@ionic-display/icon/Icon";
import crossIcon from "@icons/cross.svg";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import { List } from "@ionic-layout/list/List";
import { IonListHeader } from "@ionic/react";

export const SelectedMap: React.FC = () => {
  const selectedMapName = useDoorToDoorStore((state) => state.selectedMapName);
  const setSelectedMapName = useDoorToDoorStore(
    (state) => state.setSelectedMapName,
  );
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);

  if (!selectedMapName) return null;

  const handleClear = () => {
    addToRecentMaps(selectedMapName);
    setSelectedMapName(null);
  };

  return (
    <List>
      <IonListHeader>
        <Label>Selected Map</Label>
      </IonListHeader>
      <Item>
        <Text className="ion-padding-end">{selectedMapName}</Text>
        <Icon slot="end" src={crossIcon} onClick={handleClear} />
      </Item>
    </List>
  );
};
