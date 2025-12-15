import { IonLabel } from "@ionic/react";
import type { Section } from "@feature/talks/state/useTalksStore";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";

type Props = {
  sections: Section[];
};

export function TalkSectionsList({ sections }: Props) {
  if (sections.length === 0) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No sections yet</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {sections.map((section, index) => (
        <Item key={`${index}-${section.name}`} lines="full">
          <IonLabel>
            <Text bold>{section.name}</Text>
            <br />
            <Text size="sm">{section.subsections.length} subsections</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
}
