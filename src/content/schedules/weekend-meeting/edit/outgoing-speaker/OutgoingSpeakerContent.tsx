import type { FC } from "react";
import { useEffect } from "react";
import { IonList } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useOutgoingSpeakerAssignment } from "./hooks/useOutgoingSpeakerAssignment";
import { useOutgoingSpeakerStore } from "./store/useOutgoingSpeakerStore";
import { SpeakerDetailsHeader } from "./components/speaker-details-header/SpeakerDetailsHeader";
import { SpeakerNameItem } from "./components/speaker-name-item/SpeakerNameItem";
import { TargetCongregationItem } from "./components/target-congregation-item/TargetCongregationItem";
import { PublicTalkOutlineItem } from "./components/public-talk-outline-item/PublicTalkOutlineItem";
import { WeekItem } from "./components/week-item/WeekItem";
import { Space } from "@layout/space/Space";

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

  return (
    <IonList>
      <Space height="1"></Space>
      <SpeakerDetailsHeader />
      <Space height="1"></Space>
      <WeekItem />
      <SpeakerNameItem />
      {hasSpeakerSelected && <TargetCongregationItem />}
      {hasCongregationSelected && <PublicTalkOutlineItem />}
    </IonList>
  );
};
