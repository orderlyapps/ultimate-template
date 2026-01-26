import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { formatDistanceToNow } from "date-fns";

export const DoNotCallUnitModal: React.FC = () => {
  const selectedDoNotCallUnits = useDoorToDoorStore((state) => state.selectedDoNotCallUnits);
  const setSelectedDoNotCallUnits = useDoorToDoorStore((state) => state.setSelectedDoNotCallUnits);

  const isOpen = !!selectedDoNotCallUnits && selectedDoNotCallUnits.length > 0;

  const handleDismiss = () => {
    setSelectedDoNotCallUnits(null);
  };

  if (!selectedDoNotCallUnits || selectedDoNotCallUnits.length === 0) return null;

  const firstUnit = selectedDoNotCallUnits[0];
  const address = `${firstUnit.house_number} ${firstUnit.street}, ${firstUnit.suburb}`;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{address}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {selectedDoNotCallUnits.map((unit) => {
            const created = unit.created_at
              ? formatDistanceToNow(new Date(unit.created_at), { addSuffix: true })
              : "Unknown";

            return (
              <IonItem key={unit.id}>
                <IonLabel>
                  <h2>Unit {unit.unit_number}</h2>
                  <p>Added {created}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
