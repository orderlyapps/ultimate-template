import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { useUserPublisher } from "../user-publisher/use-user-publisher/useUserPublisher";
import { SelectUserPublisherModal } from "../user-publisher/select-user-publisher-modal/SelectUserPublisherModal";

export const PublisherHomeView: React.FC = () => {
  const [publisher] = useUserPublisher();

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
      {publisher && (
        <Text size="lg">
          Welcome {publisher.display_name || publisher.first_name}
        </Text>
      )}
    </>
  );
};
