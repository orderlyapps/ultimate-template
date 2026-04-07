import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { IonItem, IonLabel } from "@ionic/react";
import { useWeekendMeetingEditStore } from "@/content/schedules/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import { useHistory } from "react-router-dom";
import { SectionHeading } from "@display/section-heading/SectionHeading";

type PublicTalkSelectProps = {
  speakerName?: string;
  outlineTheme?: string;
  congregationName?: string;
  isLocalSpeaker?: boolean;
  disabled?: boolean;
};

export const PublicTalkSelect: React.FC<PublicTalkSelectProps> = ({
  speakerName,
  outlineTheme,
  congregationName,
  isLocalSpeaker = true,
  disabled = false,
}) => {
  const weekId = useWeekendMeetingEditStore((s) => s.weekId);
  const history = useHistory();

  const displayText =
    speakerName && outlineTheme ? `${speakerName}` : "Select Speaker & Talk";

  /** Navigate to the edit-speaker page for speaker selection */
  const handleClick = () => {
    if (!disabled) {
      history.push(`/schedules/weekend-meeting/${weekId}/edit/edit-speaker`);
    }
  };

  return (
    <>
      <IonItem lines="none">
        <SectionHeading>Public Talk</SectionHeading>
      </IonItem>
      <Item
        lines="none"
        onClick={handleClick}
        disabled={disabled}
        button
        detail
      >
        <IonLabel>
          <Text bold>{outlineTheme}</Text>
          <br />
            <Text size="sm" color="medium">{displayText}</Text>
            {!isLocalSpeaker && congregationName && (
              <Text size="sm" color="medium"> - {congregationName}</Text>
            )}
        </IonLabel>
      </Item>
    </>
  );
};
