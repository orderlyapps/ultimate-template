import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { usePublisherHomeItems } from "./usePublisherHomeItems";
import { Item } from "@ionic-layout/item/Item";
import { HomeItemsList } from "./components/home-items-list/HomeItemsList";
import { NewAssignmentsBanner } from "./components/new-assignments-banner/NewAssignmentsBanner";
import { useNewAssignments } from "./use-new-assignments/useNewAssignments";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { List } from "@ionic-layout/list/List";

export const PublisherHomeView2: React.FC = () => {
  const [publisher] = useUserPublisher();
  const items = usePublisherHomeItems(publisher);
  const { newItems, dismiss, dismissAll } = useNewAssignments(items);

  return (
    <List>
      <NewAssignmentsBanner
        items={newItems}
        onDismiss={dismiss}
        onDismissAll={dismissAll}
      />
      <Space height="2" />
      <Item lines="none">
        <SectionHeading>Calendar</SectionHeading>
      </Item>
      <HomeItemsList items={items} />
    </List>
  );
};
