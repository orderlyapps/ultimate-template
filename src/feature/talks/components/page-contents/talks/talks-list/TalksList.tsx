import { IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { useTalksStore, type SortOption } from "@feature/talks/state/useTalksStore";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { ItemOptionCopy } from "@input/sliding-item-option/ItemOptionCopy";
import { SelectItem } from "@input/select/SelectItem";
import { formatTimeAllocation } from "@feature/talks/utils/format-time-allocation";
import { TalksGettingStartedHelp } from "./components/TalksGettingStartedHelp";
import { TalksNavigationHelp } from "./components/TalksNavigationHelp";
import { TalksSwipeActionsHelp } from "./components/TalksSwipeActionsHelp";

export function TalksList() {
  const talks = useTalksStore((s) => s.talks);
  const sortOption = useTalksStore((s) => s.sortOption);
  const setSortOption = useTalksStore((s) => s.setSortOption);

  const removeTalk = useTalksStore((s) => s.removeTalk);
  const duplicateTalk = useTalksStore((s) => s.duplicateTalk);

  if (talks.length === 0) {
    return (
      <>
        <TalksGettingStartedHelp />
        <List>
          <Item lines="none">
            <IonLabel>
              <Text>No talks yet</Text>
            </IonLabel>
          </Item>
        </List>
      </>
    );
  }

  const sortedTalks = [...talks].sort((a, b) => {
    if (sortOption === "updated") {
      return b.updatedAt - a.updatedAt;
    }
    if (sortOption === "created") {
      return b.createdAt - a.createdAt;
    }
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <>
      <TalksNavigationHelp />
      <TalksSwipeActionsHelp />
      <List>
        <SelectItem
          label="Sort by"
          value={sortOption}
          onIonChange={(e) => setSortOption(e.detail.value as SortOption)}
          options={[
            { label: "A-Z", value: "alphabetical" },
            { label: "Updated", value: "updated" },
            { label: "Created", value: "created" },
          ]}
          interface="popover"
        />
        {sortedTalks.map((talk) => (
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
              <ItemOptionCopy
                expandable
                onClick={() => duplicateTalk(talk.id)}
              />

              <ItemOptionDelete
                expandable
                onClick={() => removeTalk(talk.id)}
              />
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </List>
    </>
  );
}
