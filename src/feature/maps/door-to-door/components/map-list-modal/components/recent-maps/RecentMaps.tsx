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

export const RecentMaps: React.FC = () => {
  const recentMaps = useDoorToDoorStore((state) => state.recentMaps);
  const { handleZoomToMap } = useZoomToMap();
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);
  const setSelectedMap = useDoorToDoorStore((state) => state.setSelectedMap);
  const addToRecentMaps = useDoorToDoorStore((state) => state.addToRecentMaps);

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

  return (
    <List>
      <IonListHeader>
        <Label>Recent Maps</Label>
      </IonListHeader>
      {recentMapObjects.map((map) => (
        <Item key={map.id} onClick={() => handleSelectMap(map)}>
          <Text>{map.name}</Text>
        </Item>
      ))}
    </List>
  );
};
