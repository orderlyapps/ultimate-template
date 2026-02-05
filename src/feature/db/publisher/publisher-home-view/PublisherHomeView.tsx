import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { SelectUserPublisherModal } from "../user-publisher/select-user-publisher-modal/SelectUserPublisherModal";
import { usePublisherHomeQueries } from "./usePublisherHomeQueries";
import { HomeItemsList } from "./components/home-items-list/HomeItemsList";

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
