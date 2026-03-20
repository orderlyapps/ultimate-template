import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { usePublisherHomeItems } from "./usePublisherHomeItems";
import { formatPublisherName } from "@format/formatPublisherName";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { HomeItemsList } from "./components/home-items-list/HomeItemsList";
import { NewAssignmentsBanner } from "./components/new-assignments-banner/NewAssignmentsBanner";
import { useNewAssignments } from "./use-new-assignments/useNewAssignments";

export const PublisherHomeView2: React.FC = () => {
  const [publisher] = useUserPublisher();
  const items = usePublisherHomeItems(publisher);
  const { newItems, dismiss, dismissAll } = useNewAssignments(items);

  return (
    <>
      <Space height="3" />
      <Item lines="none">
        <Text bold size="xxl">
          Welcome {formatPublisherName(publisher, "display last")}
        </Text>
      </Item>
      <NewAssignmentsBanner
        items={newItems}
        onDismiss={dismiss}
        onDismissAll={dismissAll}
      />
      <Space height="2" />
      <Item lines="none">
        <Text color={"primary"} size="xxl">
          Calendar
        </Text>
      </Item>
      <HomeItemsList items={items} />
    </>
  );
};
