import { IonIcon, IonLabel } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { optionsOutline } from "ionicons/icons";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { Space } from "@layout/space/Space";
import type { PublisherFilterState } from "./publisherFilterState";
import { Button } from "@ionic-input/button/Button";
import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";

interface AllPublishersListProps {
  filters: PublisherFilterState;
  searchQuery: string;
  onOpenPresets: () => void;
}

export function AllPublishersList({
  filters,
  searchQuery,
  onOpenPresets,
}: AllPublishersListProps) {
  const { isUnlocked } = useFeatureAccess([
    "9da270dd-ef23-417b-89a8-2a61bcbe24e0",
  ]);

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const filteredPublishers = publishers?.filter((publisher) => {
    if (
      filters.standing.length > 0 &&
      !filters.standing.includes(publisher.standing)
    ) {
      return false;
    }
    if (filters.type.length > 0 && !filters.type.includes(publisher.type)) {
      return false;
    }
    if (
      filters.gender.length > 0 &&
      !filters.gender.includes(publisher.gender)
    ) {
      return false;
    }
    if (
      filters.group.length > 0 &&
      (!publisher.group_id || !filters.group.includes(publisher.group_id))
    ) {
      return false;
    }
    if (searchQuery) {
      const name = formatPublisherName(publisher).toLowerCase();
      if (!name.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  if (!publishers?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No publishers found.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  const count = filteredPublishers?.length ?? 0;

  return (
    <>
      <Button fill="clear" onClick={onOpenPresets}>
        <IonIcon icon={optionsOutline} slot="start" />
        Lists
      </Button>
      <Item>
        <Text color="medium" size="sm">
          {count} {count === 1 ? "record" : "records"} found
        </Text>
      </Item>
      <List>
        {filteredPublishers?.map((publisher) => (
          <Item
            key={publisher.id}
            routerLink={isUnlocked ? `/publishers/all/${publisher.id}` : undefined}
          >
            <IonLabel>
              <Text>{formatPublisherName(publisher)}</Text>
            </IonLabel>
          </Item>
        ))}
        {filteredPublishers?.length === 0 && (
          <Item lines="none">
            <IonLabel>
              <Text>No publishers match the current filters.</Text>
            </IonLabel>
          </Item>
        )}
        <Space />
      </List>
    </>
  );
}
