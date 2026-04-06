import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { IonLabel } from "@ionic/react";
import { useWeekendMeetingEditStore } from "@/content/schedules/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import { useHistory } from "react-router-dom";

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
      <Item lines="none" onClick={handleClick} disabled={disabled} button>
        <IonLabel>
          <Text bold>{outlineTheme}</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text size="sm">{displayText}</Text>
          {!isLocalSpeaker && congregationName && (
            <Text color="medium"> - {congregationName}</Text>
          )}
        </IonLabel>
      </Item>
    </>
  );
};
