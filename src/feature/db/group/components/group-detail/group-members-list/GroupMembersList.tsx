import { IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { formatPublisherName } from "@format/formatPublisherName";
import { MemberActionsModal } from "./components/member-actions-modal/MemberActionsModal";
import { useState } from "react";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

type Props = {
  groupId: string;
};

export function GroupMembersList({ groupId }: Props) {
  const [selectedMember, setSelectedMember] = useState<Publisher | null>(null);

  const { data: members } = useLiveQuery(
    (q) =>
      groupId
        ? q
            .from({ p: publisherCollection })
            .where(({ p }) => eq(p.group_id, groupId))
            .orderBy(({ p }) => p.last_name)
        : undefined,
    [groupId]
  );

  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name)
  );

  const handleRemoveFromGroup = (publisherId: string) => {
    publisherCollection.update(publisherId, (draft) => {
      draft.group_id = null;
    });
  };

  if (!members?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No members in this group. Tap + to add one.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <>
      <List>
        {members.map((member) => (
          <IonItemSliding key={member.id}>
            <Item onClick={() => setSelectedMember(member)} detail>
              <IonLabel>
                <Text size="lg">{formatPublisherName(member)}</Text>
              </IonLabel>
            </Item>
            <IonItemOptions side="end">
              <ItemOptionDelete onClick={() => handleRemoveFromGroup(member.id)} />
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </List>
      <MemberActionsModal
        member={selectedMember}
        groups={groups ?? []}
        currentGroupId={groupId}
        onDismiss={() => setSelectedMember(null)}
      />
    </>
  );
}
