import { IonToast } from "@ionic/react";
import { useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { useSavePublisherAddress } from "./use-save-publisher-address";

export const SaveAddressButton: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const houseNumber = usePublisherAddressStore((state) => state.houseNumber);
  const { saveAddress } = useSavePublisherAddress();

  const isDisabled = !houseNumber || isSaving;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveAddress();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save address");
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <IonButton expand="block" disabled={isDisabled} onClick={handleSave}>
        {isSaving ? <IonSpinner /> : "Save Address"}
      </IonButton>
      <IonToast
        isOpen={showError}
        message={errorMessage}
        duration={3000}
        onDidDismiss={() => setShowError(false)}
        color="danger"
      />
    </>
  );
};
