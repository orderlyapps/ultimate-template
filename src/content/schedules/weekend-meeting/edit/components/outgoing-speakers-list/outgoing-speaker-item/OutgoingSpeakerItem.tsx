import { useState } from "react";
import type { FC } from "react";
import { IonAlert, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { useDeleteOutgoingSpeakerAssignment } from "./hooks/useDeleteOutgoingSpeakerAssignment";

type OutgoingSpeaker = {
  speakerId: string;
  first_name: string;
  last_name: string;
  display_name: string | null | undefined;
  outlineTheme: string | undefined;
  targetCongregationName: string | undefined;
  targetCongregationId: string;
};

type OutgoingSpeakerItemProps = {
  speaker: OutgoingSpeaker;
  weekId: string;
};

/**
 * Displays a single outgoing speaker with their
 * outline and target congregation. Supports swipe-to-delete
 * with a confirmation alert.
 */
export const OutgoingSpeakerItem: FC<OutgoingSpeakerItemProps> = ({
  speaker,
  weekId,
}) => {
  const name = formatPublisherName(speaker, "display last");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { executeDelete } = useDeleteOutgoingSpeakerAssignment();

  /** Triggers the confirmation alert before deleting */
  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  /** Executes the actual delete after user confirms */
  const handleDeleteConfirm = async () => {
    await executeDelete({
      weekId,
      congregationId: speaker.targetCongregationId,
    });
  };

  return (
    <IonItemSliding>
      <Item
        button
        detail
        routerLink={`/schedules/weekend-meeting/${weekId}/edit/outgoing-speaker/${speaker.speakerId}`}
      >
        <IonLabel>
          <Text bold>{name}</Text>
          <Text size="sm" color={"medium"}>
            {" ("}
            {speaker.targetCongregationName || "Unknown congregation"}
            {")"}
          </Text>
          <br />
          <Text size="sm" color={"medium"}>
            {speaker.outlineTheme || "Unknown outline"}
            <br />
          </Text>
        </IonLabel>
      </Item>

      <IonItemOptions side="end">
        <ItemOptionDelete onClick={handleDeleteClick} />
      </IonItemOptions>

      <IonAlert
        isOpen={showDeleteAlert}
        header="Delete Assignment"
        message="Are you sure you want to delete this outgoing speaker assignment? This action cannot be undone."
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: "Delete",
            role: "destructive",
            handler: handleDeleteConfirm,
          },
        ]}
        onDidDismiss={() => setShowDeleteAlert(false)}
      />
    </IonItemSliding>
  );
};
