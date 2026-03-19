import { IonAlert } from "@ionic/react";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { useHistory } from "react-router-dom";
import type { Group } from "@tanstack-db/group/groupSchema";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  group: Group | undefined;
};

export function DeleteGroupAlert({ isOpen, onDismiss, group }: Props) {
  const history = useHistory();

  const handleDelete = () => {
    if (!group) return;
    groupCollection.delete(group.id);
    history.replace("/home/groups");
  };

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Delete Group"
      message={`Are you sure you want to delete "${group?.name}"? Members will be unassigned from this group.`}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          role: "destructive",
          handler: handleDelete,
        },
      ]}
    />
  );
}
