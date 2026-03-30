import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline, trashOutline } from "ionicons/icons";
import { usePublisherEditStore, type AddressItem } from "../../store/usePublisherEditStore";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const AddressListEdit: React.FC = () => {
  const { address, addAddress, updateAddress, removeAddress } = usePublisherEditStore();

  const handleAdd = () => {
    const newAddress: AddressItem = {
      id: crypto.randomUUID(),
      label: "Home",
      version: createVersion(),
    };
    addAddress(newAddress);
  };

  return (
    <IonList>
      <IonItem lines="none">
        <IonLabel>Addresses</IonLabel>
        <IonButton fill="clear" slot="end" onClick={handleAdd}>
          <IonIcon icon={addOutline} />
        </IonButton>
      </IonItem>
      {address.map((a) => (
        <AddressItemEdit
          key={a.id}
          item={a}
          onUpdate={(updates) => updateAddress(a.id, updates)}
          onRemove={() => removeAddress(a.id)}
        />
      ))}
    </IonList>
  );
};

interface AddressItemEditProps {
  item: AddressItem;
  onUpdate: (updates: Partial<AddressItem>) => void;
  onRemove: () => void;
}

const AddressItemEdit: React.FC<AddressItemEditProps> = ({ item, onUpdate, onRemove }) => (
  <>
    <IonItem>
      <IonInput
        label="Label"
        labelPlacement="stacked"
        value={item.label}
        onIonInput={(e) => onUpdate({ label: e.detail.value ?? "" })}
      />
      <IonButton fill="clear" slot="end" color="danger" onClick={onRemove}>
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
    <IonItem>
      <IonInput
        label="Unit Number"
        labelPlacement="stacked"
        value={item.unit_number ?? ""}
        onIonInput={(e) => onUpdate({ unit_number: e.detail.value ?? "" })}
      />
    </IonItem>
    <IonItem>
      <IonInput
        label="House Number"
        labelPlacement="stacked"
        value={item.house_number ?? ""}
        onIonInput={(e) => onUpdate({ house_number: e.detail.value ?? "" })}
      />
    </IonItem>
    <IonItem>
      <IonInput
        label="Street"
        labelPlacement="stacked"
        value={item.street ?? ""}
        onIonInput={(e) => onUpdate({ street: e.detail.value ?? "" })}
      />
    </IonItem>
    <IonItem>
      <IonInput
        label="Suburb"
        labelPlacement="stacked"
        value={item.suburb ?? ""}
        onIonInput={(e) => onUpdate({ suburb: e.detail.value ?? "" })}
      />
    </IonItem>
  </>
);
