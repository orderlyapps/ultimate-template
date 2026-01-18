import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import type { Map } from "@tanstack-db/map/mapSchema";

export const MapList: React.FC = () => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: mapCollection,
      })
      .orderBy(({ m }) => m.name),
  );

  const { handleZoomToMap } = useZoomToMap();

  const selectedMapName = useDoorToDoorStore((state) => state.selectedMapName);
  const setSelectedMapName = useDoorToDoorStore(
    (state) => state.setSelectedMapName,
  );
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);

  const handleSelectMap = (map: Map) => {
    if (selectedMapName) {
      addToRecentMaps(selectedMapName);
    }
    handleZoomToMap(map);
    setSelectedMapName(map.name);
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
          color={map.name === selectedMapName ? "medium" : ""}
        >
          <Text bold={map.name === selectedMapName}>{map.name}</Text>
        </Item>
      ))}
    </List>
  );
};
