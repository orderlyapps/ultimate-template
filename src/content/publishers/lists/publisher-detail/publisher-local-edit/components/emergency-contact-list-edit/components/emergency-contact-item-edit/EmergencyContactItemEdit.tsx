import { IonInput, IonItem } from "@ionic/react";
import type { EmergencyContactItem } from "../../../../store/usePublisherEditStore";
import { Label } from "@ionic-display/label/Label";
import { Button } from "@ionic-input/button/Button";

interface EmergencyContactItemEditProps {
  item: EmergencyContactItem;
  onUpdate: (updates: Partial<EmergencyContactItem>) => void;
  onRemove: () => void;
}

export const EmergencyContactItemEdit: React.FC<EmergencyContactItemEditProps> = ({
  item,
  onUpdate,
  onRemove,
}) => (
  <>
    <IonItem lines="none">
      <Label>First Name</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.first_name}
        onIonInput={(e) => onUpdate({ first_name: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>Last Name</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.last_name}
        onIonInput={(e) => onUpdate({ last_name: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>Relationship</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        value={item.relationship}
        onIonInput={(e) => onUpdate({ relationship: e.detail.value ?? "" })}
        clearInput={true}
      />
    </IonItem>

    <IonItem lines="none">
      <Label>Phone</Label>
      <IonInput
        slot="end"
        className="ion-text-end"
        type="tel"
        value={item.phone?.[0]?.number ?? ""}
        onIonInput={(e) => {
          const version = {
            created_by: "user",
            updated_by: "user",
            created_at: Date.now(),
            updated_at: Date.now(),
          };
          const phone = item.phone?.[0]
            ? [{ ...item.phone[0], number: e.detail.value ?? "" }]
            : [{ id: crypto.randomUUID(), number: e.detail.value ?? "", label: "Mobile", version }];
          onUpdate({ phone });
        }}
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
