import type { FC } from "react";
import { useState } from "react";
import { IonAlert } from "@ionic/react";
import type { Outline } from "@tanstack-db/outline/outlineSchema";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";
import { SpeakerOutlineSelect } from "@feature/db/speaker_outline/components/speaker-outline-select/SpeakerOutlineSelect";
import { useOutlineUpdate } from "./hooks/useOutlineUpdate";

/**
 * Displays and allows editing the public talk outline for the outgoing speaker assignment.
 * Shows a confirmation alert before persisting the change to the database.
 * In add mode, updates the store without persisting to the database.
 */
export const PublicTalkOutlineItem: FC = () => {
  const assignment = useOutgoingSpeakerStore((state) => state.assignment);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);
  const { updateOutline } = useOutlineUpdate();
  const [pendingOutline, setPendingOutline] = useState<Outline | null>(null);

  const isAddMode = !assignment?.outlineId;

  /** Stage the selected outline and prompt the user to confirm */
  const handleSelect = (outline: Outline) => {
    setPendingOutline(outline);
  };

  /** Persist the pending outline to the database on confirmation, or just update store in add mode */
  const handleConfirm = () => {
    if (!pendingOutline) return;

    // In add mode, just update the store without persisting
    if (isAddMode) {
      const baseAssignment = assignment ?? {
        speakerId: "",
        first_name: null,
        last_name: null,
        display_name: null,
        outlineId: null,
        outlineTheme: null,
        targetCongregationId: null,
        targetCongregationName: null,
      };

      setAssignment({
        ...baseAssignment,
        outlineId: pendingOutline.id,
        outlineTheme: pendingOutline.theme,
      });
      setPendingOutline(null);
      return;
    }

    // Edit mode - persist to database
    updateOutline(pendingOutline.id, pendingOutline.theme);
    setPendingOutline(null);
  };

  const handleCancel = () => setPendingOutline(null);

  const selectedOutline: Outline | null =
    assignment?.outlineId && assignment?.outlineTheme
      ? { id: assignment.outlineId, theme: assignment.outlineTheme }
      : null;

  return (
    <>
      <SpeakerOutlineSelect
        publisher_id={assignment?.speakerId}
        value={selectedOutline}
        onSelect={handleSelect}
      />
      <IonAlert
        isOpen={!!pendingOutline}
        header="Change Outline"
        message={`Change outline to "${pendingOutline?.theme}"?`}
        buttons={[
          { text: "Cancel", role: "cancel", handler: handleCancel },
          { text: "Confirm", role: "confirm", handler: handleConfirm },
        ]}
        onDidDismiss={handleCancel}
      />
    </>
  );
};
