import { IonAlert } from "@ionic/react";
import { useAddStreetModalStore } from "../../store/useAddStreetModalStore";
import { handleConfirmAddStreet } from "../../handlers/handleConfirmAddStreet";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";

interface ConfirmAlertProps {
  suburb: Suburb | null;
  onClose: () => void;
}

export const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  suburb,
  onClose,
}) => {
  const selectedStreet = useAddStreetModalStore(
    (state) => state.selectedStreet,
  );
  const setSelectedStreet = useAddStreetModalStore(
    (state) => state.setSelectedStreet,
  );

  return (
    <IonAlert
      isOpen={!!selectedStreet}
      header="Add New Street"
      message={
        selectedStreet && suburb
          ? `Add "${selectedStreet.properties.name}" to ${suburb.name}?`
          : ""
      }
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: () => setSelectedStreet(null),
        },
        {
          text: "Add",
          role: "confirm",
          handler: () => handleConfirmAddStreet(suburb, onClose),
        },
      ]}
      onDidDismiss={() => setSelectedStreet(null)}
    />
  );
};
