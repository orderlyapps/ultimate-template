import type { FC } from "react";
import { IonAlert } from "@ionic/react";
import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";

type Props = {
  deleteId: string | null;
  onDismiss: () => void;
};

export const DeleteAddressAlert: FC<Props> = ({ deleteId, onDismiss }) => {
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const tx = notAtHomeCollection.delete(deleteId);
      await tx.isPersisted.promise;
    } catch (error) {
      console.error(`Failed to delete address: ${error}`);
    }
  };

  return (
    <IonAlert
      isOpen={!!deleteId}
      onDidDismiss={onDismiss}
      header="Delete Address"
      message="Are you sure you want to delete this address?"
      buttons={[
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          role: "destructive",
          handler: () => void handleDelete(),
        },
      ]}
    />
  );
};
