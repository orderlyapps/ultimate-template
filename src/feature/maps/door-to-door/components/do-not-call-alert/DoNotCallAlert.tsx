import { IonAlert } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { formatDistanceToNow } from "date-fns";

export const DoNotCallAlert: React.FC = () => {
  const selectedDoNotCall = useDoorToDoorStore(
    (state) => state.selectedDoNotCall,
  );

  const setSelectedDoNotCall = useDoorToDoorStore(
    (state) => state.setSelectedDoNotCall,
  );

  const { unit_number, house_number, street, suburb, notes, updated_at } =
    selectedDoNotCall || {};

  const isOpen = !!selectedDoNotCall;

  const handleDismiss = () => {
    setSelectedDoNotCall(null);
  };

  const address = `${unit_number ? unit_number + "/" : ""}${house_number} ${street}, ${suburb} `;

  const updated =
    updated_at != null
      ? formatDistanceToNow(new Date(updated_at), { addSuffix: true })
      : updated_at;

  const message = `${notes || "No notes available"}`;

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={handleDismiss}
      header={address}
      subHeader={"Last updated " + updated}
      message={message}
      buttons={["Close"]}
    />
  );
};
