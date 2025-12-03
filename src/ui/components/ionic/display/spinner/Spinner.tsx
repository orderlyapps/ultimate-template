import { IonSpinner } from "@ionic/react";
import type { ComponentProps } from "react";

type SpinnerProps = ComponentProps<typeof IonSpinner>;

export const Spinner: React.FC<SpinnerProps> = (props) => {
  return <IonSpinner {...props} />;
};
