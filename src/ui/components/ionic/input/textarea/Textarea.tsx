import { IonTextarea } from "@ionic/react";
import type { ComponentProps } from "react";

interface TextareaProps extends ComponentProps<typeof IonTextarea> {}

export const Textarea: React.FC<TextareaProps> = ({ children, ...props }) => {
  return <IonTextarea {...props}>{children}</IonTextarea>;
};
