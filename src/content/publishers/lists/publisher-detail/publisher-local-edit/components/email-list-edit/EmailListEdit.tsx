import { IonIcon, IonInput, IonItem, useIonAlert } from "@ionic/react";
import addIcon from "@icons/add.svg";
import {
  usePublisherEditStore,
  type EmailItem,
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

export const EmailListEdit: React.FC = () => {
  const { email, addEmail, updateEmail, removeEmail } = usePublisherEditStore();
  const [presentAlert] = useIonAlert();

  const handleAdd = () => {
    presentAlert({
      header: "Add Email Address",
      inputs: [
        {
          name: "label",
          type: "text",
          placeholder: "Label",
          value: "Personal",
        },
        {
          name: "address",
          type: "email",
          placeholder: "Email Address",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Add",
          handler: (data: { label?: string; address?: string }) => {
            const newEmail: EmailItem = {
              id: crypto.randomUUID(),
              address: data.address ?? "",
              label: data.label ?? "Personal",
              version: createVersion(),
            };
            addEmail(newEmail);
          },
        },
      ],
    });
  };

  return (
    <>
      <Item>
        <SectionHeading>Email</SectionHeading>
        <IonIcon src={addIcon} slot="end" onClick={handleAdd} color="primary" />
      </Item>

      {email.map((e) => (
        <EmailItemEdit
          key={e.id}
          item={e}
          onUpdate={(updates) => updateEmail(e.id, updates)}
          onRemove={() => removeEmail(e.id)}
        />
      ))}
    </>
  );
};

interface EmailItemEditProps {
  item: EmailItem;
  onUpdate: (updates: Partial<EmailItem>) => void;
  onRemove: () => void;
}

const EmailItemEdit: React.FC<EmailItemEditProps> = ({
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
      <Label>Email</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        type="email"
        value={item.address}
        onIonInput={(e) => onUpdate({ address: e.detail.value ?? "" })}
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
