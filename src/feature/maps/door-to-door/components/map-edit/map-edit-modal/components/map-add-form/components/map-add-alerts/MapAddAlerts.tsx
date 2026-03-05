import { IonAlert } from "@ionic/react";

export const MapAddAlerts: React.FC<{
  showSaveAlert: boolean;
  setShowSaveAlert: (show: boolean) => void;
  handleConfirmSave: () => void;
  showCancelAlert: boolean;
  setShowCancelAlert: (show: boolean) => void;
  handleConfirmCancel: () => void;
}> = ({
  showSaveAlert,
  setShowSaveAlert,
  handleConfirmSave,
  showCancelAlert,
  setShowCancelAlert,
  handleConfirmCancel,
}) => {
  return (
    <>
      <IonAlert
        isOpen={showSaveAlert}
        onDidDismiss={() => setShowSaveAlert(false)}
        header="Save New Map"
        message="Are you sure you want to save this new map?"
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Save", handler: handleConfirmSave },
        ]}
      />
      <IonAlert
        isOpen={showCancelAlert}
        onDidDismiss={() => setShowCancelAlert(false)}
        header="Discard New Map"
        message="You have unsaved changes. Are you sure you want to discard this new map?"
        buttons={[
          { text: "Keep Editing", role: "cancel" },
          { text: "Discard", handler: handleConfirmCancel },
        ]}
      />
    </>
  );
};
