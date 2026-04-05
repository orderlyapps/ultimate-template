import { formatPublisherName } from "@format/formatPublisherName";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";

export const WelcomeHeading: React.FC = () => {
  const [publisher] = useUserPublisher();

  return (
    <Item lines="none">
      <Text bold size="xxl">
        Welcome {formatPublisherName(publisher, "display last")}
      </Text>
    </Item>
  );
};
