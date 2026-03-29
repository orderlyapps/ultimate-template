import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { usePublisherEditStore, type EmergencyContactItem } from "../../store/usePublisherEditStore";
import { EmergencyContactItemEdit } from "./components/emergency-contact-item-edit/EmergencyContactItemEdit";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const EmergencyContactListEdit: React.FC = () => {
  const { emergency_contact, addEmergencyContact, updateEmergencyContact, removeEmergencyContact } =
    usePublisherEditStore();

  const handleAdd = () => {
    const newContact: EmergencyContactItem = {
      id: crypto.randomUUID(),
      first_name: "",
      last_name: "",
      relationship: "",
      phone: [],
      version: createVersion(),
    };
    addEmergencyContact(newContact);
  };

  return (
    <IonList>
      <IonItem lines="none">
        <IonLabel>Emergency Contacts</IonLabel>
        <IonButton fill="clear" slot="end" onClick={handleAdd}>
          <IonIcon icon={addOutline} />
        </IonButton>
      </IonItem>
      {emergency_contact.map((ec) => (
        <EmergencyContactItemEdit
          key={ec.id}
          item={ec}
          onUpdate={(updates) => updateEmergencyContact(ec.id, updates)}
          onRemove={() => removeEmergencyContact(ec.id)}
        />
      ))}
    </IonList>
  );
};
