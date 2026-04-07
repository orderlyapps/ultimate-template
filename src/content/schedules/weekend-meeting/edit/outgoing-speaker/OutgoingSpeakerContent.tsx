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
  speakerId: string;
};

/**
 * Content component for displaying outgoing speaker details.
 * Shows the speaker name, outline theme, and target congregation.
 */
export const OutgoingSpeakerContent: FC<OutgoingSpeakerContentProps> = ({
  weekId,
  speakerId,
}) => {
  const { data: assignment } = useOutgoingSpeakerAssignment(weekId, speakerId);
  const setWeekId = useOutgoingSpeakerStore((state) => state.setWeekId);
  const setSpeakerId = useOutgoingSpeakerStore((state) => state.setSpeakerId);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);

  useEffect(() => {
    setWeekId(weekId);
    setSpeakerId(speakerId);
  }, [weekId, speakerId, setWeekId, setSpeakerId]);

  useEffect(() => {
    if (assignment) {
      setAssignment(assignment);
    }
  }, [assignment, setAssignment]);

  if (!assignment) {
    return (
      <div className="ion-padding">
        <Text color="medium">Loading speaker details...</Text>
      </div>
    );
  }

  return (
    <IonList>
      <Space height="1"></Space>
      <SpeakerDetailsHeader />
      <Space height="1"></Space>
      <WeekItem />
      <SpeakerNameItem />
      <TargetCongregationItem />
      <PublicTalkOutlineItem />
    </IonList>
  );
};
