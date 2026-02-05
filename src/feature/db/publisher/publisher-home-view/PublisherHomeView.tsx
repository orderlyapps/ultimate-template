import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { SelectUserPublisherModal } from "../user-publisher/select-user-publisher-modal/SelectUserPublisherModal";
import { usePublisherHomeQueries } from "./usePublisherHomeQueries";
import { HomeItemsList } from "./components/home-items-list/HomeItemsList";
import { formatPublisherName } from "@format/formatPublisherName";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";

export const PublisherHomeView: React.FC = () => {
  const [publisher] = useUserPublisher();

  const {
    weekendAssignments,
    speakerAssignments,
    midweekAssignments,
    events,
    avAssignments,
  } = usePublisherHomeQueries(publisher);

  if (!publisher) {
    return (
      <>
        <SelectUserPublisherModal />
        <Space height="2" />
      </>
    );
  }

  return (
    <>
      <Item>
        <Text bold size="xxl">
          Welcome {formatPublisherName(publisher, "display last")}
        </Text>
      </Item>
      <HomeItemsList
        weekendAssignments={weekendAssignments}
        speakerAssignments={speakerAssignments}
        midweekAssignments={midweekAssignments}
        events={events}
        avAssignments={avAssignments}
      />
    </>
  );
};
