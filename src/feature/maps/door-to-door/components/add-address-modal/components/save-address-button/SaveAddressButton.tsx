import { IonButton } from "@ionic/react";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { handleSubmitNotAtHome } from "@feature/maps/door-to-door/components/add-address-modal/handlers/handleSubmitNotAtHome";

interface SaveAddressButtonProps {
  onSuccess: () => void;
}

export const SaveAddressButton: React.FC<SaveAddressButtonProps> = ({
  onSuccess,
}) => {
  const suburb = useAddAddressStore((state) => state.suburb);
  const street = useAddAddressStore((state) => state.street);
  const houseNumber = useAddAddressStore((state) => state.houseNumber);

  const canSubmit =
    suburb !== null && street !== null && houseNumber.trim() !== "";

  return (
    <IonButton
      expand="block"
      disabled={!canSubmit}
      onClick={() => handleSubmitNotAtHome(onSuccess)}
    >
      Save
    </IonButton>
  );
};
