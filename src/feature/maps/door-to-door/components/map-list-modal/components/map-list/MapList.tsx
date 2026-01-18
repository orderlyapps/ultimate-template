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

  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);
  const setSelectedMap = useDoorToDoorStore(
    (state) => state.setSelectedMap,
  );
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);

  const handleSelectMap = (map: Map) => {
    if (selectedMap) {
      addToRecentMaps(selectedMap);
    }
    handleZoomToMap(map);
    setSelectedMap(map);
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
        </Item>
      ))}
    </List>
  );
};
