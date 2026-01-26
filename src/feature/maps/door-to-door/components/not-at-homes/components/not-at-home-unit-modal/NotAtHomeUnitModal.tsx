import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { ErrorToast } from "@feature/maps/door-to-door/components/not-at-homes/components/error-toast/ErrorToast";
import { HelpText } from "@services/app/help-text/HelpText";
import { handleDeleteNotAtHomeById } from "@feature/maps/door-to-door/components/not-at-homes/handlers/handleDeleteNotAtHomeById";
import { handleToggleNotAtHomeWriteById } from "@feature/maps/door-to-door/components/not-at-homes/handlers/handleToggleNotAtHomeWriteById";
import { UnitList } from "@feature/maps/door-to-door/components/not-at-homes/components/not-at-home-unit-modal/components/unit-list/UnitList";
import { List } from "@ionic-layout/list/List";

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
        <List inset>
          <HelpText id="door-to-door:not-at-home-unit-modal-swipe">
            <strong>Instructions:</strong> Swipe a unit row to reveal actions
            (move or delete).
          </HelpText>
        </List>
        <UnitList
          title="Return List"
          units={returnUnits}
          onMove={(id) => {
            void handleToggleNotAtHomeWriteById(id);
          }}
          onDelete={(id) => {
            void handleDeleteNotAtHomeById(id);
          }}
        />

        <UnitList
          title="Write List"
          units={writeUnits}
          onMove={(id) => {
            void handleToggleNotAtHomeWriteById(id);
          }}
          onDelete={(id) => {
            void handleDeleteNotAtHomeById(id);
          }}
        />
        <ErrorToast />
      </IonContent>
    </IonModal>
  );
};
