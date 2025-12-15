import { IonTextarea } from "@ionic/react";
import type { ComponentProps } from "react";

type TextareaProps = ComponentProps<typeof IonTextarea>;

export const Textarea: React.FC<TextareaProps> = ({ children, ...props }) => {
  const { autoGrow = true, ...rest } = props;
  return (
    <IonTextarea autoGrow={autoGrow} {...rest}>
      {children}
    </IonTextarea>
  );
};
