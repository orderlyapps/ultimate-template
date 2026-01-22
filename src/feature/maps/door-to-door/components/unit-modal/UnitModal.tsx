import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { formatDistanceToNow } from "date-fns";

export const UnitModal: React.FC = () => {
  const selectedUnits = useDoorToDoorStore((state) => state.selectedUnits);
  const setSelectedUnits = useDoorToDoorStore((state) => state.setSelectedUnits);

  const isOpen = !!selectedUnits && selectedUnits.length > 0;

  const handleDismiss = () => {
    setSelectedUnits(null);
  };

  if (!selectedUnits || selectedUnits.length === 0) return null;

  const firstUnit = selectedUnits[0];
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
          {selectedUnits.map((unit) => {
            const created = unit.created_at
              ? formatDistanceToNow(new Date(unit.created_at), { addSuffix: true })
              : "Unknown";

            return (
              <IonItem key={unit.id}>
                <IonLabel>
                  <h2>Unit {unit.unit_number}</h2>
                  <p>Added {created}</p>
                  <p>{unit.write ? "Write" : "Return"}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
