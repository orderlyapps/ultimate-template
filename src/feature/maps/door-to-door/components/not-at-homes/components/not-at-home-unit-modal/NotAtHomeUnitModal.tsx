import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { formatDistanceToNow } from "date-fns";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Space } from "@layout/space/Space";
import { CloseButton } from "@input/button/close-button/CloseButton";

export const NotAtHomeUnitModal: React.FC = () => {
  const selectedUnits = useDoorToDoorStore((state) => state.selectedUnits);
  const setSelectedUnits = useDoorToDoorStore(
    (state) => state.setSelectedUnits,
  );

  const isOpen = !!selectedUnits && selectedUnits.length > 0;

  const handleDismiss = () => {
    setSelectedUnits(null);
  };

  if (!selectedUnits || selectedUnits.length === 0) return null;

  const firstUnit = selectedUnits[0];
  const address = `${firstUnit.house_number} ${firstUnit.street}, ${firstUnit.suburb}`;

  const writeUnits = selectedUnits.filter((unit) => unit.write);
  const returnUnits = selectedUnits.filter((unit) => !unit.write);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{address}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleDismiss}></CloseButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {returnUnits.length > 0 && (
          <List>
            <IonListHeader>Return List</IonListHeader>
            {returnUnits.map((unit) => {
              const created = unit.created_at
                ? formatDistanceToNow(new Date(unit.created_at), {
                    addSuffix: true,
                  })
                : "Unknown";

              return (
                <Item key={unit.id} className="ion-margin">
                  <Label>Unit {unit.unit_number || "N/A"}</Label>
                  <IonNote>Added {created}</IonNote>
                </Item>
              );
            })}
          </List>
        )}

        <Space height="2" />

        {writeUnits.length > 0 && (
          <List>
            <IonListHeader>Write List</IonListHeader>
            {writeUnits.map((unit) => {
              const created = unit.created_at
                ? formatDistanceToNow(new Date(unit.created_at), {
                    addSuffix: true,
                  })
                : "Unknown";

              return (
                <Item key={unit.id} className="ion-margin">
                  <Label>Unit {unit.unit_number || "N/A"}</Label>
                  <IonNote>Added {created}</IonNote>
                </Item>
              );
            })}
          </List>
        )}
      </IonContent>
    </IonModal>
  );
};
