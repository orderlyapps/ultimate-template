import { IonIcon, IonInput, IonItem, useIonAlert } from "@ionic/react";
import addIcon from "@icons/add.svg";
import {
  usePublisherEditStore,
  type AddressItem,
} from "../../store/usePublisherEditStore";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Button } from "@ionic-input/button/Button";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const AddressListEdit: React.FC = () => {
  const { address, addAddress, updateAddress, removeAddress } = usePublisherEditStore();
  const [presentAlert] = useIonAlert();

  const handleAdd = () => {
    presentAlert({
      header: "Add Address",
      inputs: [
        {
          name: "label",
          type: "text",
          placeholder: "Label",
          value: "Home",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Add",
          handler: (data: { label?: string }) => {
            const newAddress: AddressItem = {
              id: crypto.randomUUID(),
              label: data.label ?? "Home",
              version: createVersion(),
            };
            addAddress(newAddress);
          },
        },
      ],
    });
  };

  return (
    <>
      <Item>
        <SectionHeading>Addresses</SectionHeading>
        <IonIcon src={addIcon} slot="end" onClick={handleAdd} color="primary" />
      </Item>
      {address.map((a) => (
        <AddressItemEdit
          key={a.id}
          item={a}
          onUpdate={(updates) => updateAddress(a.id, updates)}
          onRemove={() => removeAddress(a.id)}
        />
      ))}
    </>
  );
};

interface AddressItemEditProps {
  item: AddressItem;
  onUpdate: (updates: Partial<AddressItem>) => void;
  onRemove: () => void;
}

const AddressItemEdit: React.FC<AddressItemEditProps> = ({
  item,
  onUpdate,
  onRemove,
}) => (
  <>
    <IonItem lines="none">
      <Label>Label</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.label}
        onIonInput={(e) => onUpdate({ label: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>Unit Number</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.unit_number ?? ""}
        onIonInput={(e) => onUpdate({ unit_number: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>House Number</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.house_number ?? ""}
        onIonInput={(e) => onUpdate({ house_number: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>Street</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.street ?? ""}
        onIonInput={(e) => onUpdate({ street: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>Suburb</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.suburb ?? ""}
        onIonInput={(e) => onUpdate({ suburb: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem>
      <Label>
        <Button fill="clear" color="danger" onClick={onRemove} className="">
          Delete
        </Button>
      </Label>
    </IonItem>
  </>
);
