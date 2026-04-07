import type { FC } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { LabelText } from "@display/label-text/LabelText";

/**
 * Displays the week identifier from the outgoing speaker store.
 */
export const WeekItem: FC = () => {
  const weekId = useOutgoingSpeakerStore((state) => state.weekId);

  if (!weekId) {
    return null;
  }

  return (
    <IonItem>
      <IonLabel>
        <LabelText>Date</LabelText>
      </IonLabel>
      <Text>{getTheocraticWeekLabel(weekId)}</Text>
    </IonItem>
  );
};
