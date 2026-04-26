import { IonItem } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Space } from "@layout/space/Space";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import type { Address } from "@state/rxdb/collections/publisher";

interface AddressItemProps {
  address: Address extends (infer U)[] | undefined ? U : never;
}

const AddressItem: React.FC<AddressItemProps> = ({ address }) => {
  // Fetch street and suburb names from database using stored IDs
  const { data: streetData } = useLiveQuery(
    (q) => {
      if (!address.street) return null;
      return q
        .from({ s: streetCollection })
        .where(({ s }) => eq(s.id, address.street));
    },
    [address.street]
  );

  const { data: suburbData } = useLiveQuery(
    (q) => {
      if (!address.suburb) return null;
      return q
        .from({ s: suburbCollection })
        .where(({ s }) => eq(s.id, address.suburb));
    },
    [address.suburb]
  );

  const streetName = streetData?.[0]?.name ?? address.street ?? "";
  const suburbName = suburbData?.[0]?.name ?? address.suburb ?? "";

  return (
    <IonItem key={address.id}>
      <Label>{address.label}</Label>
      <Text slot="end" className="ion-text-end">
        {address.unit_number} {address.house_number} {streetName}
        <br />
        {suburbName}
      </Text>
    </IonItem>
  );
};

interface AddressListProps {
  addresses: Address;
}

export const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  if (!addresses || addresses.length === 0) {
    return null;
  }

  return (
    <>
      <Space height="1" />
      <Item>
        <SectionHeading>Address</SectionHeading>
      </Item>
      {addresses.map((address) => (
        <AddressItem key={address.id} address={address} />
      ))}
    </>
  );
};
