import { useNotAtHomeAlertStore } from "@feature/maps/door-to-door/components/not-at-homes/store/useNotAtHomeAlertStore";
import { IonToast } from "@ionic/react";

export const ErrorToast: React.FC = () => {
  const errorMessage = useNotAtHomeAlertStore((state) => state.errorMessage);
  const setErrorMessage = useNotAtHomeAlertStore((state) => state.setErrorMessage);

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
