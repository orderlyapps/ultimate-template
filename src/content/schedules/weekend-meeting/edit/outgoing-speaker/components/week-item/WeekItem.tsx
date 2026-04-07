import type { FC } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { LabelText } from "@display/label-text/LabelText";
import { useParams } from "react-router-dom";

/**
 * Displays the week identifier from the outgoing speaker store.
 */
export const WeekItem: FC = () => {
  const { week_id } = useParams<{ week_id: string }>();

  return (
    <IonItem>
      <IonLabel>
        <LabelText>Date</LabelText>
      </IonLabel>
      <Text>{getTheocraticWeekLabel(week_id)}</Text>
    </IonItem>
  );
};
