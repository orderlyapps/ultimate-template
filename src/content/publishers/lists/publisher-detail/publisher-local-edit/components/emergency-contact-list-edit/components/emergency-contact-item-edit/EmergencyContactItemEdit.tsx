import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import type { EmergencyContactItem } from "../../../../store/usePublisherEditStore";

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
    <IonItem>
      <IonInput
        label="First Name"
        labelPlacement="stacked"
        value={item.first_name}
        onIonInput={(e) => onUpdate({ first_name: e.detail.value ?? "" })}
      />
      <IonButton fill="clear" slot="end" color="danger" onClick={onRemove}>
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
    <IonItem>
      <IonInput
        label="Last Name"
        labelPlacement="stacked"
        value={item.last_name}
        onIonInput={(e) => onUpdate({ last_name: e.detail.value ?? "" })}
      />
    </IonItem>
    <IonItem>
      <IonInput
        label="Relationship"
        labelPlacement="stacked"
        value={item.relationship}
        onIonInput={(e) => onUpdate({ relationship: e.detail.value ?? "" })}
      />
    </IonItem>
    <IonItem>
      <IonInput
        label="Phone"
        labelPlacement="stacked"
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
      />
    </IonItem>
  </>
);
