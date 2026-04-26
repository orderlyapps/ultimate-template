import { IonList } from "@ionic/react";
import { DateFieldsEdit } from "./components/date-fields-edit/DateFieldsEdit";
import { PhoneListEdit } from "./components/phone-list-edit/PhoneListEdit";
import { EmailListEdit } from "./components/email-list-edit/EmailListEdit";
import { AddressListEdit } from "./components/address-list-edit/AddressListEdit";
import { EmergencyContactListEdit } from "./components/emergency-contact-list-edit/EmergencyContactListEdit";
import { Space } from "@layout/space/Space";

interface PublisherLocalEditContentProps {
  isLoading: boolean;
}

export const PublisherLocalEditContent: React.FC<
  PublisherLocalEditContentProps
> = ({ isLoading }) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <IonList>
      <DateFieldsEdit />
      <Space height="2" />
      <PhoneListEdit />
      <Space height="2" />
      <EmailListEdit />
      <Space height="2" />
      <AddressListEdit />
      <Space height="2" />
      <EmergencyContactListEdit />
      <Space />
    </IonList>
  );
};
