import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
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
    publicTalks,
  } = usePublisherHomeQueries(publisher);

  return (
    <>
      <Space height="3" />
      <Item lines="none">
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
        publicTalks={publicTalks}
      />
    </>
  );
};
