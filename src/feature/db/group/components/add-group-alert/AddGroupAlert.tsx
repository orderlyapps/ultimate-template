import { IonAlert } from "@ionic/react";
import { groupCollection } from "@tanstack-db/group/groupCollection";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddGroupAlert({ isOpen, onDismiss }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Add Group"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Group name",
        },
      ]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Add",
          handler: (data) => {
            const name =
              typeof data?.name === "string" ? data.name.trim() : "";

            if (!name) return false;

            const congregationId = localStorage.getItem("congregationId");
            if (!congregationId) return false;

            groupCollection.insert({
              id: crypto.randomUUID(),
              congregation_id: congregationId,
              name,
              overseer_id: null,
              assistant_id: null,
            });
          },
        },
      ]}
    />
  );
}
