import { useState } from "react";
import { IonIcon, IonInput, IonItem } from "@ionic/react";
import addIcon from "@icons/add.svg";
import {
  usePublisherEditStore,
  type AddressItem,
} from "../../store/usePublisherEditStore";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Button } from "@ionic-input/button/Button";
import { AddEditAddressModal } from "./components/add-edit-address-modal/AddEditAddressModal";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";

const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

export const AddressListEdit: React.FC = () => {
  const { address, addAddress, updateAddress, removeAddress } = usePublisherEditStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);

  const handleAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: AddressItem) => {
    setEditingAddress(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = (data: {
    label: string;
    suburb?: string;
    street?: string;
    house_number?: string;
    unit_number?: string;
    coordinates?: number[];
  }) => {
    if (editingAddress) {
      // Update existing address
      updateAddress(editingAddress.id, {
        label: data.label,
        suburb: data.suburb,
        street: data.street,
        house_number: data.house_number,
        unit_number: data.unit_number,
        coordinates: data.coordinates,
      });
    } else {
      // Add new address
      const newAddress: AddressItem = {
        id: crypto.randomUUID(),
        label: data.label,
        suburb: data.suburb,
        street: data.street,
        house_number: data.house_number,
        unit_number: data.unit_number,
        coordinates: data.coordinates,
        version: createVersion(),
      };
      addAddress(newAddress);
    }
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
          onEdit={() => handleEdit(a)}
        />
      ))}
      <AddEditAddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        existingAddress={editingAddress}
      />
    </>
  );
};

interface AddressItemEditProps {
  item: AddressItem;
  onUpdate: (updates: Partial<AddressItem>) => void;
  onRemove: () => void;
  onEdit: () => void;
}

const AddressItemEdit: React.FC<AddressItemEditProps> = ({
  item,
  onUpdate,
  onRemove,
  onEdit,
}) => {
  // Fetch suburb and street names from database using IDs
  const { data: suburbData } = useLiveQuery(
    (q) => {
      if (!item.suburb) return null;
      return q
        .from({ s: suburbCollection })
        .where(({ s }) => eq(s.id, item.suburb));
    },
    [item.suburb]
  );

  const { data: streetData } = useLiveQuery(
    (q) => {
      if (!item.street) return null;
      return q
        .from({ s: streetCollection })
        .where(({ s }) => eq(s.id, item.street));
    },
    [item.street]
  );

  const suburbName = suburbData?.[0]?.name ?? item.suburb ?? "";
  const streetName = streetData?.[0]?.name ?? item.street ?? "";

  return (
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
          value={streetName}
          onIonInput={(e) => onUpdate({ street: e.detail.value ?? "" })}
          clearInput={true}
        />
      </IonItem>

      <IonItem lines="none">
        <Label>Suburb</Label>
        <IonInput
          slot="end"
          className="ion-text-end"
          value={suburbName}
          onIonInput={(e) => onUpdate({ suburb: e.detail.value ?? "" })}
          clearInput={true}
        />
      </IonItem>

      <IonItem lines="none">
        <Label>
          <Button fill="clear" color="primary" onClick={onEdit}>
            Edit in Modal
          </Button>
        </Label>
      </IonItem>

      <IonItem>
        <Label>
          <Button fill="clear" color="danger" onClick={onRemove}>
            Delete
          </Button>
        </Label>
      </IonItem>
    </>
  );
};
