import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { useTalksStore } from "@feature/state/useTalksStore";

type Props = {
  onSelectTalk?: (id: string) => void;
};

export function TalksOutlineList({ onSelectTalk }: Props) {
  const talks = useTalksStore((s) => s.talks);

  if (talks.length === 0) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No talks yet</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {talks.map((talk) => (
        <Item
          key={talk.id}
          button
          detail
          onClick={() => onSelectTalk?.(talk.id)}
        >
          <IonLabel>
            <Text bold>{talk.name}</Text>
            <br />
            <Text size="sm">{talk.sections.length} sections</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
}
