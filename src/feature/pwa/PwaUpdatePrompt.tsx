import { IonAlert } from "@ionic/react";
import { useRegisterSW } from "virtual:pwa-register/react";

export const PwaUpdatePrompt: React.FC = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setNeedRefresh(false);
  };

  return (
    <IonAlert
      isOpen={needRefresh}
      header="Update Available"
      message="A new version of the app is available. Would you like to update now?"
      buttons={[
        {
          text: "Later",
          role: "cancel",
          handler: handleDismiss,
        },
        {
          text: "Update",
          handler: handleUpdate,
        },
      ]}
    />
  );
};
