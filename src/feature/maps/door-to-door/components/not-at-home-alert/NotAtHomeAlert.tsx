import { IonAlert } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { formatDistanceToNow } from "date-fns";

export const NotAtHomeAlert: React.FC = () => {
  const selectedNotAtHome = useDoorToDoorStore(
    (state) => state.selectedNotAtHome,
  );

  const setSelectedNotAtHome = useDoorToDoorStore(
    (state) => state.setSelectedNotAtHome,
  );

  const { unit_number, house_number, street, suburb, created_at } =
    selectedNotAtHome || {};

  const isOpen = !!selectedNotAtHome;

  const handleDismiss = () => {
    setSelectedNotAtHome(null);
  };

  const address = `${unit_number ? unit_number + "/" : ""}${house_number} ${street}, ${suburb} `;

  const created =
    created_at != null
      ? formatDistanceToNow(new Date(created_at), { addSuffix: true })
      : created_at;

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={handleDismiss}
      header={address}
      subHeader={"Added " + created}
      buttons={["Close"]}
    />
  );
};
