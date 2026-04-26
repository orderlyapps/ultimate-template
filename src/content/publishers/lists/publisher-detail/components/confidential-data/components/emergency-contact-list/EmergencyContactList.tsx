import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { PhoneNumber } from "@ionic-display/phone-number/PhoneNumber";
import { Item } from "@ionic-layout/item/Item";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import type { EmergencyContact } from "@state/rxdb/collections/publisher";

interface EmergencyContactListProps {
  emergencyContacts: EmergencyContact;
}

export const EmergencyContactList: React.FC<EmergencyContactListProps> = ({
  emergencyContacts,
}) => {
  if (!emergencyContacts || emergencyContacts.length === 0) {
    return null;
  }

  return (
    <>
      <Item>
        <SectionHeading>Emergency Contacts</SectionHeading>
      </Item>
      {emergencyContacts.map((contact) => (
        <IonItem key={contact.id}>
          <IonLabel>
            <Text bold>
              {contact.first_name} {contact.last_name}
            </Text>
            <Text size="sm" color="medium">
              {" "}
              ({contact.relationship})
            </Text>
          </IonLabel>
          <PhoneNumber slot="end" number={contact.phone[0].number} />
        </IonItem>
      ))}
    </>
  );
};
