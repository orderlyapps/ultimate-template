import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { List } from "@ionic-layout/list/List";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";

export const RecentMaps: React.FC = () => {
  const recentMaps = useDoorToDoorStore((state) => state.recentMaps);
  const selectedMapName = useDoorToDoorStore((state) => state.selectedMapName);
  const { handleZoomToMap } = useZoomToMap();

  const { data: allMaps } = useLiveQuery((q) =>
    q.from({
      m: mapCollection,
    }),
  );

  const filteredRecentMaps = recentMaps.filter(
    (mapName) => mapName !== selectedMapName,
  );

  if (filteredRecentMaps.length === 0 || !allMaps) return null;

  const recentMapObjects = filteredRecentMaps
    .map((mapName) => allMaps.find((map) => map.name === mapName))
    .filter((map) => map !== undefined);

  if (recentMapObjects.length === 0) return null;

  return (
    <List>
      <IonListHeader>
        <Label>Recent Maps</Label>
      </IonListHeader>
      {recentMapObjects.map((map) => (
        <Item key={map.id} onClick={() => handleZoomToMap(map)}>
          <Text>{map.name}</Text>
        </Item>
      ))}
    </List>
  );
};
