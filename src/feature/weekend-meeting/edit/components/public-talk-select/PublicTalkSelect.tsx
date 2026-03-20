import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { IonIcon, IonLabel } from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import { useState } from "react";
import { PublicTalkSelectModal } from "./components/public-talk-select-modal/PublicTalkSelectModal";

type PublicTalkSelectProps = {
  speakerId?: string | null;
  outlineId?: string | null;
  speakerName?: string;
  outlineTheme?: string;
  congregationName?: string;
  isLocalSpeaker?: boolean;
  onSelect?: (speakerId: string, outlineId: string) => void;
  disabled?: boolean;
};

export const PublicTalkSelect: React.FC<PublicTalkSelectProps> = ({
  speakerId,
  outlineId,
  speakerName,
  outlineTheme,
  congregationName,
  isLocalSpeaker = true,
  onSelect,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayText =
    speakerName && outlineTheme ? `${speakerName}` : "Select Speaker & Talk";

  const handleSelect = (
    selectedSpeakerId: string,
    selectedOutlineId: string,
  ) => {
    onSelect?.(selectedSpeakerId, selectedOutlineId);
    setIsModalOpen(false);
  };

  return (
    <>
      <Item>
        <Text>{outlineTheme}</Text>
      </Item>
      <Item
        onClick={() => !disabled && setIsModalOpen(true)}
        disabled={disabled}
      >
        <IonLabel>
          <Text>{displayText}</Text>
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
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        currentSpeakerId={speakerId}
        currentOutlineId={outlineId}
      />
    </>
  );
};
