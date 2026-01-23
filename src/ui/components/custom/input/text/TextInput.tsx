import { Label } from "@ionic-display/label/Label";
import { Item } from "@ionic-layout/item/Item";
import { IonInput } from "@ionic/react";
import type { ComponentProps } from "react";

type TextInputProps = ComponentProps<typeof IonInput>;

export const TextInput = ({ label, ...props }: TextInputProps) => {
  const defaultProps: TextInputProps = {
    className: "ion-text-right",
    clearInput: !!props.value,
    ...props,
  };
  return (
    <Item>
      <IonInput {...defaultProps}>
        <Label slot="label">{label}</Label>
      </IonInput>
    </Item>
  );
};
