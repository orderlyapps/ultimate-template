import { IonToast } from "@ionic/react";
import { useAddStreetModalStore } from "../../store/useAddStreetModalStore";

export const ErrorToast: React.FC = () => {
  const errorMessage = useAddStreetModalStore((state) => state.errorMessage);
  const setErrorMessage = useAddStreetModalStore((state) => state.setErrorMessage);

  return (
    <IonToast
      isOpen={!!errorMessage}
      message={errorMessage ?? ""}
      duration={3000}
      color="danger"
      position="bottom"
      onDidDismiss={() => setErrorMessage(null)}
    />
  );
};
