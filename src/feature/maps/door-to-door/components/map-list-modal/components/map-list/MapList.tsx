import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";

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

  if (!data) return null;
  return (
    <List>
      {data.map((map) => (
        <Item
          key={map.id}
          onClick={() => handleZoomToMap(map)}
          color={map.name === selectedMapName ? "medium" : ""}
        >
          <Text bold={map.name === selectedMapName}>{map.name}</Text>
        </Item>
      ))}
    </List>
  );
};
