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
import { ItemOptionCopy } from "@input/sliding-item-option/ItemOptionCopy";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { formatTimeAllocation } from "@feature/talks/utils/format-time-allocation";

type Props = {
  talk: Outline;
};

export function SectionsList({ talk }: Props) {
  const sections = talk.sections;
  const removeSection = useTalksStore((s) => s.removeSection);
  const reorderSections = useTalksStore((s) => s.reorderSections);
  const duplicateSection = useTalksStore((s) => s.duplicateSection);

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
          reorderSections(talk.id, fromIndex, toIndex);
          e.detail.complete();
        }}
      >
        {sections.map((section, index) => (
          <IonItemSliding key={section.id}>
            <Item
              button
              detail
              lines="full"
              routerLink={`/home/talks/${talk.id}/sections/${section.id}`}
            >
              <IonReorder slot="start" />
              <IonLabel>
                <Text bold>{section.name}</Text>
                <br />
                <Text size="sm">{formatTimeAllocation(section)}</Text>
              </IonLabel>
            </Item>

            <IonItemOptions side="end">
              <ItemOptionCopy
                expandable
                onClick={() => duplicateSection(talk.id, index)}
              />
              <ItemOptionDelete
                expandable
                onClick={() => removeSection(talk.id, index)}
              />
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonReorderGroup>
    </List>
  );
}
