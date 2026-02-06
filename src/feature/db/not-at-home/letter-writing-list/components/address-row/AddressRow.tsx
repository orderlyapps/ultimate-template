import type { FC } from "react";
import { IonButton, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Icon } from "@ionic-display/icon/Icon";
import deleteIcon from "@icons/delete.svg";
import type { AddressItem } from "../../groupBySuburbAndStreet";

type Props = {
  address: AddressItem;
  onDelete: (id: string) => void;
};

export const AddressRow: FC<Props> = ({ address, onDelete }) => {
  const label = address.unit_number
    ? `${address.unit_number}/${address.house_number}`
    : address.house_number;

  return (
    <Item>
      <IonLabel>{label}</IonLabel>
      <IonButton fill="clear" slot="end" onClick={() => onDelete(address.id)}>
        <Icon icon={deleteIcon} color="danger" />
      </IonButton>
    </Item>
  );
};
