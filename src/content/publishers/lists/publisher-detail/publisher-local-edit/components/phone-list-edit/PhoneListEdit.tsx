import { IonButton, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { addOutline, trashOutline } from "ionicons/icons";
import { usePublisherEditStore, type PhoneItem } from "../../store/usePublisherEditStore";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const PhoneListEdit: React.FC = () => {
  const { phone, addPhone, updatePhone, removePhone } = usePublisherEditStore();

  const handleAdd = () => {
    const newPhone: PhoneItem = {
      id: crypto.randomUUID(),
      number: "",
      label: "Mobile",
      version: createVersion(),
    };
    addPhone(newPhone);
  };

  return (
    <>
      <IonItem lines="none">
        <IonLabel>Phone Numbers</IonLabel>
        <IonButton fill="clear" slot="end" onClick={handleAdd}>
          <IonIcon icon={addOutline} />
        </IonButton>
      </IonItem>
      {phone.map((p) => (
        <PhoneItemEdit
          key={p.id}
          item={p}
          onUpdate={(updates) => updatePhone(p.id, updates)}
          onRemove={() => removePhone(p.id)}
        />
      ))}
    </>
  );
};

interface PhoneItemEditProps {
  item: PhoneItem;
  onUpdate: (updates: Partial<PhoneItem>) => void;
  onRemove: () => void;
}

const PhoneItemEdit: React.FC<PhoneItemEditProps> = ({ item, onUpdate, onRemove }) => (
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
        label="Number"
        labelPlacement="stacked"
        type="tel"
        value={item.number}
        onIonInput={(e) => onUpdate({ number: e.detail.value ?? "" })}
      />
      <IonButton fill="clear" slot="end" color="danger" onClick={onRemove}>
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  </>
);
