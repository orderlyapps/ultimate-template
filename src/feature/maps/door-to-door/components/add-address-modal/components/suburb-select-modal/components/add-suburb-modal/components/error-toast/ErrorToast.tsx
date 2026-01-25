import { IonToast } from "@ionic/react";
import { useAddSuburbModalStore } from "../../store/useAddSuburbModalStore";

export const ErrorToast: React.FC = () => {
  const errorMessage = useAddSuburbModalStore((state) => state.errorMessage);
  const setErrorMessage = useAddSuburbModalStore((state) => state.setErrorMessage);

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
