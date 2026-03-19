import { IonLabel } from "@ionic/react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { SelectModal } from "@input/select/SelectModal";
import { formatPublisherName } from "@format/formatPublisherName";
import { RenameGroupAlert } from "./components/rename-group-alert/RenameGroupAlert";
import { useState } from "react";

type Props = {
  groupId: string;
};

export function GroupSettings({ groupId }: Props) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, groupId))
  );

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

  const group = groups?.[0];

  const memberOptions = [
    { value: "__none__", label: "None" },
    ...(members?.map((m) => ({
      value: m.id,
      label: formatPublisherName(m),
    })) ?? []),
  ];

  const handleOverseerChange = (value: string | null) => {
    if (!group) return;
    groupCollection.update(group.id, (draft) => {
      draft.overseer_id = value === "__none__" ? null : value;
    });
  };

  const handleAssistantChange = (value: string | null) => {
    if (!group) return;
    groupCollection.update(group.id, (draft) => {
      draft.assistant_id = value === "__none__" ? null : value;
    });
  };

  if (!group) return null;

  return (
    <>
      <List>
        <Item onClick={() => setIsRenameOpen(true)} detail>
          <IonLabel>
            <Text color="medium">Name</Text>
          </IonLabel>
          <Text slot="end">{group.name}</Text>
        </Item>
        <SelectModal
          label="Overseer"
          options={memberOptions}
          value={group.overseer_id ?? "__none__"}
          onValueChange={handleOverseerChange}
          modalTitle="Select Overseer"
          placeholder="None"
        />
        <SelectModal
          label="Assistant"
          options={memberOptions}
          value={group.assistant_id ?? "__none__"}
          onValueChange={handleAssistantChange}
          modalTitle="Select Assistant"
          placeholder="None"
        />
      </List>
      <RenameGroupAlert
        isOpen={isRenameOpen}
        onDismiss={() => setIsRenameOpen(false)}
        group={group}
      />
    </>
  );
}
