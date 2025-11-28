import { IonSpinner } from "@ionic/react";
import type { ComponentProps } from "react";

interface SpinnerProps extends ComponentProps<typeof IonSpinner> {}

export const Spinner: React.FC<SpinnerProps> = (props) => {
  return <IonSpinner {...props} />;
};
