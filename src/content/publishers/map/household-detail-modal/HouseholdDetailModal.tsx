import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";
import { HouseholdMemberItem } from "@/content/publishers/map/household-detail-modal/components/household-member-item/HouseholdMemberItem";

export const HouseholdDetailModal: React.FC = () => {
  const { selectedHousehold, closeHouseholdModal } = usePublishersMapStore();

  const isOpen = selectedHousehold !== null;
  const isHousehold = (selectedHousehold?.length ?? 0) > 1;
  const title = isHousehold ? "Household" : "Publisher";

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeHouseholdModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeHouseholdModal}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {selectedHousehold?.length === 0 && (
            <IonItem>
              <IonLabel>No members found</IonLabel>
            </IonItem>
          )}
          {selectedHousehold?.map((member) => (
            <HouseholdMemberItem key={member.address_id} member={member} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
