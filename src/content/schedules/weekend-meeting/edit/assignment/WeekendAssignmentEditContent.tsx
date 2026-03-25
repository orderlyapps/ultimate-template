import { usePublishers } from "./hooks/usePublishers";
import { PublisherList } from "./components/publisher-list/PublisherList";

export const WeekendAssignmentEditContent: React.FC = () => {
  const { publishers } = usePublishers();

  return <PublisherList publishers={publishers} />;
};
