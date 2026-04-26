import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { List } from "@ionic-layout/list/List";
import { Button } from "@ionic-input/button/Button";
import { LabelInput } from "./components/label-input/LabelInput";
import { SuburbSelect } from "./components/suburb-select/SuburbSelect";
import { StreetSelect } from "./components/street-select/StreetSelect";
import { HouseNumberInput } from "./components/house-number-input/HouseNumberInput";
import { UnitNumberInput } from "./components/unit-number-input/UnitNumberInput";
import { useAddEditAddressStore } from "./store/useAddEditAddressStore";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { useEffect, useState } from "react";
import { geocodeAddress } from "@services/vendor/mapbox/helper/geocodeAddress";

interface AddEditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: {
    label: string;
    suburb?: string;
    street?: string;
    house_number?: string;
    unit_number?: string;
    coordinates?: number[];
  }) => void;
  existingAddress?: {
    label?: string;
    suburb?: string;
    street?: string;
    house_number?: string;
    unit_number?: string;
  } | null;
}

export const AddEditAddressModal: React.FC<AddEditAddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingAddress,
}) => {
  const label = useAddEditAddressStore((state: { label: string }) => state.label);
  const suburb = useAddEditAddressStore((state: { suburb: { id: string; name: string; bbox: [number, number, number, number] } | null }) => state.suburb);
  const street = useAddEditAddressStore((state: { street: { id: string; name: string; suburb_id: string } | null }) => state.street);
  const houseNumber = useAddEditAddressStore((state: { houseNumber: string }) => state.houseNumber);
  const resetForm = useAddEditAddressStore((state: { resetForm: () => void }) => state.resetForm);
  const initializeForm = useAddEditAddressStore((state: { initializeForm: (existingAddress?: { label?: string; suburb?: string; street?: string; house_number?: string; unit_number?: string; } | null, suburbs?: { id: string; name: string; bbox: [number, number, number, number] }[], streets?: { id: string; name: string; suburb_id: string }[]) => void }) => state.initializeForm);
  const [isSaving, setIsSaving] = useState(false);

  // Query suburbs and streets for initialization
  const { data: suburbs } = useLiveQuery((q) =>
    q.from({ s: suburbCollection }).orderBy(({ s }) => s.name)
  );

  const { data: streets } = useLiveQuery((q) =>
    existingAddress?.suburb
      ? q
          .from({ s: streetCollection })
          .where(({ s }) => eq(s.suburb_id, suburb?.id ?? ""))
          .orderBy(({ s }) => s.name)
      : q.from({ s: streetCollection }).orderBy(({ s }) => s.name)
  );

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen) {
      initializeForm(existingAddress, suburbs, streets);
    }
  }, [isOpen, existingAddress, suburbs, streets, initializeForm]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (!suburb || !street || !houseNumber) return;

    setIsSaving(true);
    let coordinates: number[] | undefined;

    try {
      const geocodeResult = await geocodeAddress(
        {
          address_number: houseNumber,
          street: street.name,
          place: suburb.name,
        },
        {
          bbox: suburb.bbox,
        }
      );

      if (geocodeResult?.geometry?.coordinates) {
        coordinates = geocodeResult.geometry.coordinates;
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }

    onSave({
      label,
      suburb: suburb?.id,
      street: street?.id,
      house_number: houseNumber || undefined,
      unit_number: useAddEditAddressStore.getState().unitNumber || undefined,
      coordinates,
    });
    setIsSaving(false);
    resetForm();
    onClose();
  };

  const title = existingAddress ? "Edit Address" : "Add Address";

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleClose}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleClose} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List inset>
          <LabelInput />
          <SuburbSelect />
          {suburb !== null && <StreetSelect />}
          {street !== null && <HouseNumberInput />}
          {houseNumber !== "" && <UnitNumberInput />}
          <Button onClick={handleSave} disabled={!suburb || !street || isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </List>
      </IonContent>
    </IonModal>
  );
};
