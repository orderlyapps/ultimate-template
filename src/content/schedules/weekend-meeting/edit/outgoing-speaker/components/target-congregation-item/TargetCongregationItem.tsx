import type { FC } from "react";
import { useState } from "react";
import { IonAlert } from "@ionic/react";
import { CongregationSelect } from "@feature/db/congregation/components/congregation-select/CongregationSelect";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";
import { useCongregationChangeTransaction } from "./hooks/useCongregationChangeTransaction";

/**
 * Displays and allows changing the target congregation for an outgoing speaker.
 * In add mode, updates the store without executing a transaction.
 */
export const TargetCongregationItem: FC = () => {
  const weekId = useOutgoingSpeakerStore((state) => state.weekId);
  const assignment = useOutgoingSpeakerStore((state) => state.assignment);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);
  const { executeChange } = useCongregationChangeTransaction();

  const [pendingCongregation, setPendingCongregation] = useState<Congregation | null>(null);

  const value: Congregation | null = assignment?.targetCongregationId
    ? {
        id: assignment.targetCongregationId,
        name: assignment.targetCongregationName ?? "Unknown",
        congregation_id: null,
      }
    : null;

  const isAddMode = !assignment?.targetCongregationId && !assignment?.outlineId;

  const handleSelect = (congregation: Congregation) => {
    setPendingCongregation(congregation);
  };

  const handleConfirm = async () => {
    if (!pendingCongregation) return;

    // In add mode, just update the store without executing transaction
    if (isAddMode) {
      // Create base assignment if needed
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
        targetCongregationId: pendingCongregation.id,
        targetCongregationName: pendingCongregation.name,
      });
      setPendingCongregation(null);
      return;
    }

    // Edit mode - execute transaction for existing assignment
    if (!weekId || !assignment) return;

    await executeChange({
      weekId,
      speakerId: assignment.speakerId,
      currentCongregationId: assignment.targetCongregationId,
      newCongregation: pendingCongregation,
      outlineId: assignment.outlineId,
    });

    setAssignment({
      ...assignment,
      targetCongregationId: pendingCongregation.id,
      targetCongregationName: pendingCongregation.name,
    });

    setPendingCongregation(null);
  };

  const handleCancel = () => {
    setPendingCongregation(null);
  };

  return (
    <>
      <CongregationSelect value={value} onSelect={handleSelect} />
      <IonAlert
        isOpen={!!pendingCongregation}
        header="Change Congregation"
        message={
          pendingCongregation
            ? `Change target congregation to "${pendingCongregation.name}"?`
            : ""
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: handleCancel,
          },
          {
            text: "Confirm",
            role: "confirm",
            handler: handleConfirm,
          },
        ]}
        onDidDismiss={handleCancel}
      />
    </>
  );
};
