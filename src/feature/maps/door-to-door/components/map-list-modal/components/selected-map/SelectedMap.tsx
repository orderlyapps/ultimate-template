import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Icon } from "@ionic-display/icon/Icon";
import crossIcon from "@icons/cross.svg";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import { List } from "@ionic-layout/list/List";

export const SelectedMap: React.FC = () => {
  const selectedMapName = useDoorToDoorStore((state) => state.selectedMapName);
  const setSelectedMapName = useDoorToDoorStore(
    (state) => state.setSelectedMapName,
  );

  if (!selectedMapName) return null;

  return (
    <List inset>
      <Item>
        <Label>Selected Map</Label>
        <Text className="ion-padding-end">{selectedMapName}</Text>
        <Icon src={crossIcon} onClick={() => setSelectedMapName(null)} />
      </Item>
    </List>
  );
};
