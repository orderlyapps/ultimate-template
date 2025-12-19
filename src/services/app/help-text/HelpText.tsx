import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import { useHelpTextStore } from "@services/app/help-text/useHelpTextStore";
import type { HelpTextProps } from "@services/app/help-text/types";
import "./HelpText.css";

export const HelpText: React.FC<HelpTextProps> = ({ id, children }) => {
  const shouldShow = useHelpTextStore((state) => state.shouldShow(id));
  const dismissHelpText = useHelpTextStore((state) => state.dismissHelpText);

  if (!shouldShow) {
    return null;
  }

  const handleDismiss = () => {
    dismissHelpText(id);
  };

  return (
    <IonCard className="help-text-card" color="light">
      <IonCardContent className="help-text-content">
        <div className="help-text-body">{children}</div>
        <button
          className="help-text-dismiss-button"
          onClick={handleDismiss}
          aria-label="Dismiss help text"
        >
          <IonIcon icon={close} />
        </button>
      </IonCardContent>
    </IonCard>
  );
};
