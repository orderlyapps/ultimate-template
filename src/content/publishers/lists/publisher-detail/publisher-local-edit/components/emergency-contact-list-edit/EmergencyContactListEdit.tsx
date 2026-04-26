import { IonIcon, useIonAlert } from "@ionic/react";
import addIcon from "@icons/add.svg";
import {
  usePublisherEditStore,
  type EmergencyContactItem,
} from "../../store/usePublisherEditStore";
import { EmergencyContactItemEdit } from "./components/emergency-contact-item-edit/EmergencyContactItemEdit";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Item } from "@ionic-layout/item/Item";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const EmergencyContactListEdit: React.FC = () => {
  const { emergency_contact, addEmergencyContact, updateEmergencyContact, removeEmergencyContact } =
    usePublisherEditStore();
  const [presentAlert] = useIonAlert();

  const handleAdd = () => {
    presentAlert({
      header: "Add Emergency Contact",
      inputs: [
        {
          name: "first_name",
          type: "text",
          placeholder: "First Name",
        },
        {
          name: "last_name",
          type: "text",
          placeholder: "Last Name",
        },
        {
          name: "relationship",
          type: "text",
          placeholder: "Relationship",
        },
        {
          name: "phone",
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
          handler: (data: { first_name?: string; last_name?: string; relationship?: string; phone?: string }) => {
            const version = createVersion();
            const newContact: EmergencyContactItem = {
              id: crypto.randomUUID(),
              first_name: data.first_name ?? "",
              last_name: data.last_name ?? "",
              relationship: data.relationship ?? "",
              phone: data.phone
                ? [{ id: crypto.randomUUID(), number: data.phone, label: "Mobile", version }]
                : [],
              version,
            };
            addEmergencyContact(newContact);
          },
        },
      ],
    });
  };

  return (
    <>
      <Item>
        <SectionHeading>Emergency Contacts</SectionHeading>
        <IonIcon src={addIcon} slot="end" onClick={handleAdd} color="primary" />
      </Item>
      {emergency_contact.map((ec) => (
        <EmergencyContactItemEdit
          key={ec.id}
          item={ec}
          onUpdate={(updates) => updateEmergencyContact(ec.id, updates)}
          onRemove={() => removeEmergencyContact(ec.id)}
        />
      ))}
    </>
  );
};
