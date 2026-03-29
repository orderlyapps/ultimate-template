import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline, trashOutline } from "ionicons/icons";
import { usePublisherEditStore, type EmailItem } from "../../store/usePublisherEditStore";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const EmailListEdit: React.FC = () => {
  const { email, addEmail, updateEmail, removeEmail } = usePublisherEditStore();

  const handleAdd = () => {
    const newEmail: EmailItem = {
      id: crypto.randomUUID(),
      address: "",
      label: "Personal",
      version: createVersion(),
    };
    addEmail(newEmail);
  };

  return (
    <IonList>
      <IonItem lines="none">
        <IonLabel>Email Addresses</IonLabel>
        <IonButton fill="clear" slot="end" onClick={handleAdd}>
          <IonIcon icon={addOutline} />
        </IonButton>
      </IonItem>
      {email.map((e) => (
        <EmailItemEdit
          key={e.id}
          item={e}
          onUpdate={(updates) => updateEmail(e.id, updates)}
          onRemove={() => removeEmail(e.id)}
        />
      ))}
    </IonList>
  );
};

interface EmailItemEditProps {
  item: EmailItem;
  onUpdate: (updates: Partial<EmailItem>) => void;
  onRemove: () => void;
}

const EmailItemEdit: React.FC<EmailItemEditProps> = ({ item, onUpdate, onRemove }) => (
  <>
    <IonItem>
      <IonInput
        label="Label"
        labelPlacement="stacked"
        value={item.label}
        onIonInput={(e) => onUpdate({ label: e.detail.value ?? "" })}
      />
    </IonItem>
    <IonItem>
      <IonInput
        label="Email"
        labelPlacement="stacked"
        type="email"
        value={item.address}
        onIonInput={(e) => onUpdate({ address: e.detail.value ?? "" })}
      />
      <IonButton fill="clear" slot="end" color="danger" onClick={onRemove}>
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  </>
);
