import type { FC } from "react";
import { useEffect, useState } from "react";
import { IonAlert, IonList } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useOutgoingSpeakerAssignment } from "./hooks/useOutgoingSpeakerAssignment";
import { useOutgoingSpeakerStore } from "./store/useOutgoingSpeakerStore";
import { useSaveOutgoingSpeaker } from "./hooks/useSaveOutgoingSpeaker";
import { SpeakerDetailsHeader } from "./components/speaker-details-header/SpeakerDetailsHeader";
import { SpeakerNameItem } from "./components/speaker-name-item/SpeakerNameItem";
import { TargetCongregationItem } from "./components/target-congregation-item/TargetCongregationItem";
import { PublicTalkOutlineItem } from "./components/public-talk-outline-item/PublicTalkOutlineItem";
import { WeekItem } from "./components/week-item/WeekItem";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";

/**
 * Props for the OutgoingSpeakerContent component.
 */
type OutgoingSpeakerContentProps = {
  weekId: string;
  speakerId: string | null;
  isAddMode?: boolean;
};

/**
 * Content component for displaying or adding outgoing speaker details.
 * Shows the speaker name, outline theme, and target congregation.
 * In add mode, progressively reveals fields as the form is filled.
 */
export const OutgoingSpeakerContent: FC<OutgoingSpeakerContentProps> = ({
  weekId,
  speakerId,
  isAddMode = false,
}) => {
  const { data: assignment } = useOutgoingSpeakerAssignment(
    weekId,
    speakerId ?? ""
  );
  const storeAssignment = useOutgoingSpeakerStore((state) => state.assignment);
  const setWeekId = useOutgoingSpeakerStore((state) => state.setWeekId);
  const setSpeakerId = useOutgoingSpeakerStore((state) => state.setSpeakerId);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);
  const { executeSave } = useSaveOutgoingSpeaker();
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  useEffect(() => {
    setWeekId(weekId);
    setSpeakerId(speakerId ?? null);
  }, [weekId, speakerId, setWeekId, setSpeakerId]);

  useEffect(() => {
    if (assignment) {
      setAssignment(assignment);
    }
  }, [assignment, setAssignment]);

  // Show loading only in edit mode when no assignment exists yet
  if (!isAddMode && !assignment) {
    return (
      <div className="ion-padding">
        <Text color="medium">Loading speaker details...</Text>
      </div>
    );
  }

  // In add mode, determine progressive reveal state based on store assignment
  const hasSpeakerSelected = !!storeAssignment?.speakerId;
  const hasCongregationSelected = !!storeAssignment?.targetCongregationId;
  const hasOutlineSelected = !!storeAssignment?.outlineId;
  const canSave = hasSpeakerSelected && hasCongregationSelected && hasOutlineSelected;

  const handleSave = async () => {
    if (!storeAssignment || !canSave) return;

    await executeSave({
      weekId,
      speakerId: storeAssignment.speakerId,
      congregationId: storeAssignment.targetCongregationId!,
      outlineId: storeAssignment.outlineId,
    });
  };

  return (
    <IonList>
      <Space height="1"></Space>
      <SpeakerDetailsHeader />
      <Space height="1"></Space>
      <WeekItem />
      <SpeakerNameItem />
      {hasSpeakerSelected && <TargetCongregationItem />}
      {hasCongregationSelected && <PublicTalkOutlineItem />}

      {/* Save button - only in add mode when all required data is entered */}
      {isAddMode && canSave && (
        <>
          <Space height="2"></Space>
          <Button expand="block" onClick={() => setShowSaveAlert(true)}>
            Save Assignment
          </Button>

          <IonAlert
            isOpen={showSaveAlert}
            header="Save Assignment"
            message="Are you sure you want to save this outgoing speaker assignment?"
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                handler: () => setShowSaveAlert(false),
              },
              {
                text: "Save",
                role: "confirm",
                handler: handleSave,
              },
            ]}
            onDidDismiss={() => setShowSaveAlert(false)}
          />
        </>
      )}

    </IonList>
  );
};
