import { IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { ItemOptionCopy } from "@input/sliding-item-option/ItemOptionCopy";
import { formatTimeAllocation } from "@feature/talks/utils/format-time-allocation";

export function TalksOutlineList() {
  const talks = useTalksStore((s) => s.talks);
  const removeTalk = useTalksStore((s) => s.removeTalk);
  const duplicateTalk = useTalksStore((s) => s.duplicateTalk);

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
        <IonItemSliding key={talk.id}>
          <Item
            button
            detail
            routerLink={`/home/talks/${talk.id}`}
            routerDirection="forward"
          >
            <IonLabel>
              <Text bold>{talk.name}</Text>
              <br />
              <Text size="sm">{formatTimeAllocation(talk)}</Text>
            </IonLabel>
          </Item>

          <IonItemOptions side="end">
            <ItemOptionCopy expandable onClick={() => duplicateTalk(talk.id)} />
            <ItemOptionDelete expandable onClick={() => removeTalk(talk.id)} />
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </List>
  );
}
