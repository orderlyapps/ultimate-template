import { IonIcon, IonInput, IonItem, useIonAlert } from "@ionic/react";
import addIcon from "@icons/add.svg";
import {
  usePublisherEditStore,
  type PhoneItem,
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

export const PhoneListEdit: React.FC = () => {
  const { phone, addPhone, updatePhone, removePhone } = usePublisherEditStore();
  const [presentAlert] = useIonAlert();

  const handleAdd = () => {
    presentAlert({
      header: "Add Phone Number",
      inputs: [
        {
          name: "label",
          type: "text",
          placeholder: "Label",
          value: "Mobile",
        },
        {
          name: "number",
          type: "tel",
          placeholder: "Phone Number",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Add",
          handler: (data: { label?: string; number?: string }) => {
            const newPhone: PhoneItem = {
              id: crypto.randomUUID(),
              number: data.number ?? "",
              label: data.label ?? "Mobile",
              version: createVersion(),
            };
            addPhone(newPhone);
          },
        },
      ],
    });
  };

  return (
    <>
      <Item>
        <SectionHeading>Phone</SectionHeading>
        <IonIcon src={addIcon} slot="end" onClick={handleAdd} color="primary" />
      </Item>

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

const PhoneItemEdit: React.FC<PhoneItemEditProps> = ({
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
      <Label>Number</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        type="tel"
        value={item.number}
        onIonInput={(e) => onUpdate({ number: e.detail.value ?? "" })}
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
