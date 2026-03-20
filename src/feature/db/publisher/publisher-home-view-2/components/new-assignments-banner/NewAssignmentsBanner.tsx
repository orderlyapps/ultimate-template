import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import type { HomeItem } from "../../usePublisherHomeItems";
import { Button } from "@ionic-input/button/Button";

type Props = {
  items: HomeItem[];
  onDismiss: (key: string) => void;
  onDismissAll: () => void;
};

export const NewAssignmentsBanner: React.FC<Props> = ({
  items,
  onDismiss,
  onDismissAll,
}) => {
  if (items.length === 0) return null;

  return (
    <List>
      <Item lines="none">
        <Text color="primary" size="xxl">
          New Assignments
        </Text>
        <Button slot="end" onClick={onDismissAll} fill="clear">
          Clear All
        </Button>
      </Item>
      {items.map((item) => (
        <Item key={item.key} lines="full">
          <div>
            <Text bold size="sm">
              {item.title}
            </Text>
            <br />
            <Text size="xs" color="medium">
              {item.dateLabel}
            </Text>
          </div>
          <button
            slot="end"
            onClick={() => onDismiss(item.key)}
            aria-label={`Dismiss ${item.title}`}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <IonIcon icon={close} color="medium" />
          </button>
        </Item>
      ))}
    </List>
  );
};
