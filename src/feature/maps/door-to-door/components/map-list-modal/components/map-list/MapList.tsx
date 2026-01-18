import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";

export const MapList: React.FC = () => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: mapCollection,
      })
      .orderBy(({ m }) => m.name),
  );

  const { handleZoomToMap } = useZoomToMap();

  if (!data) return null;
  return (
    <List>
      {data.map((map) => (
        <Item key={map.id} onClick={() => handleZoomToMap(map)}>
          <Text>{map.name}</Text>
        </Item>
      ))}
    </List>
  );
};
