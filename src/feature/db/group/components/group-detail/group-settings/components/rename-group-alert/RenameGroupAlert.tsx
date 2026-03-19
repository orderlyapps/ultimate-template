import { IonAlert } from "@ionic/react";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import type { Group } from "@tanstack-db/group/groupSchema";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  group: Group;
};

export function RenameGroupAlert({ isOpen, onDismiss, group }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Rename Group"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Group name",
          value: group.name,
        },
      ]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Save",
          handler: (data) => {
            const name =
              typeof data?.name === "string" ? data.name.trim() : "";

            if (!name) return false;

            groupCollection.update(group.id, (draft) => {
              draft.name = name;
            });
          },
        },
      ]}
    />
  );
}
