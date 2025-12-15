import {
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  type ReorderEndCustomEvent,
} from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import type { Section } from "@feature/talks/state/useTalksStore";

type Props = {
  talkId: string;
  section: Section;
};

export function TalkSubsectionsList({ talkId, section }: Props) {
  const subsections = section.subsections;
  const removeSubsection = useTalksStore((s) => s.removeSubsection);
  const reorderSubsections = useTalksStore((s) => s.reorderSubsections);

  if (subsections.length === 0) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No subsections yet</Text>
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
          reorderSubsections(talkId, section.id, fromIndex, toIndex);
          e.detail.complete();
        }}
      >
        {subsections.map((subsection, index) => (
          <IonItemSliding key={subsection.id}>
            <Item
              button
              detail
              lines="full"
              routerLink={`/home/talks/${talkId}/sections/${section.id}/subsections/${subsection.id}`}
            >
              <IonReorder slot="start" />
              <IonLabel>
                <Text bold>{subsection.name}</Text>
                <br />
                <Text size="sm">{subsection.timeAllocation}s</Text>
              </IonLabel>
            </Item>

            <IonItemOptions side="end">
              <ItemOptionDelete
                expandable
                onClick={() => removeSubsection(talkId, section.id, index)}
              />
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonReorderGroup>
    </List>
  );
}
