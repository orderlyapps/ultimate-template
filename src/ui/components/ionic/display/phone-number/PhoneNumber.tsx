import { useIonActionSheet } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { callOutline, chatboxOutline } from "ionicons/icons";

interface PhoneNumberProps {
  number: string;
  slot?: "end" | "start" | "icon-only";
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({ number, slot }) => {
  const [presentActionSheet] = useIonActionSheet();

  const handleClick = () => {
    const cleanNumber = number.replace(/\s/g, "");

    presentActionSheet({
      header: number,
      buttons: [
        {
          text: "Call",
          icon: callOutline,
          handler: () => {
            window.open(`tel:${cleanNumber}`, "_system");
          },
        },
        {
          text: "SMS",
          icon: chatboxOutline,
          handler: () => {
            window.open(`sms:${cleanNumber}`, "_system");
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
  };

  return (
    <Text
      slot={slot}
      onClick={handleClick}
      color="primary"
      style={{ cursor: "pointer" }}
    >
      {number}
    </Text>
  );
};
