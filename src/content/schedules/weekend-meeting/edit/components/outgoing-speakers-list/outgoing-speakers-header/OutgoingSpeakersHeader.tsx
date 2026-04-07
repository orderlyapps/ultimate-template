import type { FC } from "react";
import { IonItem } from "@ionic/react";
import { AddButton } from "@input/button/add-button/AddButton";
import { useHistory } from "react-router-dom";
import { SectionHeading } from "@display/section-heading/SectionHeading";

type OutgoingSpeakersHeaderProps = {
  weekId: string;
};

/**
 * Header component for the outgoing speakers list.
 */
export const OutgoingSpeakersHeader: FC<OutgoingSpeakersHeaderProps> = ({
  weekId,
}) => {
  const history = useHistory();

  const handleAdd = () => {
    history.push(
      `/schedules/weekend-meeting/${weekId}/edit/outgoing-speaker/new`,
    );
  };

  return (
    <IonItem lines="none">
      <SectionHeading>Outgoing Speakers</SectionHeading>
      <AddButton slot="end" onClick={handleAdd} fill="clear" />
    </IonItem>
  );
};
