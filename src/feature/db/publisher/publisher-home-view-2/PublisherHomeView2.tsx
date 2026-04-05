import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { usePublisherHomeItems } from "../../../../content/home/content/home-accordions/components/notifications-content/hooks/usePublisherHomeItems";
import { Item } from "@ionic-layout/item/Item";
import { HomeItemsList } from "./components/home-items-list/HomeItemsList";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { List } from "@ionic-layout/list/List";

export const PublisherHomeView2: React.FC = () => {
  const [publisher] = useUserPublisher();
  const items = usePublisherHomeItems(publisher);

  return (
    <List>
      <Item lines="none">
        <SectionHeading>Calendar</SectionHeading>
      </Item>
      <HomeItemsList items={items} />
    </List>
  );
};
