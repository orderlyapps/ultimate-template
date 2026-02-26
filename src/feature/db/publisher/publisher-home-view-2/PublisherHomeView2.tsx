import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { usePublisherHomeItems } from "./usePublisherHomeItems";
import { formatPublisherName } from "@format/formatPublisherName";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { HomeItemsList } from "./components/home-items-list/HomeItemsList";

export const PublisherHomeView2: React.FC = () => {
  const [publisher] = useUserPublisher();
  const items = usePublisherHomeItems(publisher);

  return (
    <>
      <Space height="3" />
      <Item lines="none">
        <Text bold size="xxl">
          Welcome {formatPublisherName(publisher, "display last")}
        </Text>
      </Item>
      <HomeItemsList items={items} />
    </>
  );
};
