import {
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  type ReorderEndCustomEvent,
} from "@ionic/react";
import type { Section } from "@feature/talks/state/useTalksStore";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { useTalksStore } from "@feature/talks/state/useTalksStore";

type Props = {
  talkId: string;
  sections: Section[];
};

export function TalkSectionsList({ talkId, sections }: Props) {
  const removeSection = useTalksStore((s) => s.removeSection);
  const reorderSections = useTalksStore((s) => s.reorderSections);

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
      <IonReorderGroup
        disabled={false}
        onIonReorderEnd={(e: ReorderEndCustomEvent) => {
          const fromIndex = e.detail.from;
          const toIndex = e.detail.to;
          reorderSections(talkId, fromIndex, toIndex);
          e.detail.complete();
        }}
      >
        {sections.map((section, index) => (
          <IonItemSliding key={section.id}>
            <Item lines="full">
              <IonReorder slot="start" />
              <IonLabel>
                <Text bold>{section.name}</Text>
                <br />
                <Text size="sm">{section.subsections.length} subsections</Text>
              </IonLabel>
            </Item>

            <IonItemOptions side="end">
              <ItemOptionDelete
                expandable
                onClick={() => removeSection(talkId, index)}
              />
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonReorderGroup>
    </List>
  );
}
