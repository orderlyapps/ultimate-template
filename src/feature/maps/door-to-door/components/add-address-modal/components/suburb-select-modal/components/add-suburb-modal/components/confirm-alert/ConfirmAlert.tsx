import { IonAlert } from "@ionic/react";
import { useAddSuburbModalStore } from "../../store/useAddSuburbModalStore";
import { handleConfirmAddSuburb } from "../../handlers/handleConfirmAddSuburb";

interface ConfirmAlertProps {
  onClose: () => void;
}

export const ConfirmAlert: React.FC<ConfirmAlertProps> = ({ onClose }) => {
  const selectedSuburb = useAddSuburbModalStore((state) => state.selectedSuburb);
  const setSelectedSuburb = useAddSuburbModalStore((state) => state.setSelectedSuburb);

  return (
    <IonAlert
      isOpen={!!selectedSuburb}
      header="Add New Suburb"
      message={
        selectedSuburb ? `Add "${selectedSuburb.name}" to the database?` : ""
      }
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: () => setSelectedSuburb(null),
        },
        {
          text: "Add",
          role: "confirm",
          handler: () => handleConfirmAddSuburb(onClose),
        },
      ]}
      onDidDismiss={() => setSelectedSuburb(null)}
    />
  );
};
