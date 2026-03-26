import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { IonIcon, IonLabel } from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import { PublicTalkSelectModal } from "./components/public-talk-select-modal/PublicTalkSelectModal";
import { useWeekendMeetingEditStore } from "@feature/weekend-meeting/edit/store/useWeekendMeetingEditStore";

type PublicTalkSelectProps = {
  speakerId?: string | null;
  outlineId?: string | null;
  speakerName?: string;
  outlineTheme?: string;
  congregationName?: string;
  isLocalSpeaker?: boolean;
  disabled?: boolean;
};

export const PublicTalkSelect: React.FC<PublicTalkSelectProps> = ({
  speakerId,
  outlineId,
  speakerName,
  outlineTheme,
  congregationName,
  isLocalSpeaker = true,
  disabled = false,
}) => {
  const openModal = useWeekendMeetingEditStore((s) => s.openModal);

  const displayText =
    speakerName && outlineTheme ? `${speakerName}` : "Select Speaker & Talk";

  return (
    <>
      <Item onClick={() => !disabled && openModal()} disabled={disabled}>
        <IonLabel>
          <Text bold>{outlineTheme}</Text>
          <br />
          <Text size="sm">{displayText}</Text>
          {!isLocalSpeaker && congregationName && (
            <Text color="medium"> - {congregationName}</Text>
          )}
        </IonLabel>
        <IonIcon
          ios={chevronExpand}
          md={caretDownSharp}
          color="medium"
          size="small"
          className="ion-padding-start"
        />
      </Item>

      <PublicTalkSelectModal
        currentSpeakerId={speakerId}
        currentOutlineId={outlineId}
      />
    </>
  );
};
