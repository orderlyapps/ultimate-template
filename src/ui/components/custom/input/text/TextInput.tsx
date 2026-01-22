import { Label } from "@ionic-display/label/Label";
import { Item } from "@ionic-layout/item/Item";
import { IonInput } from "@ionic/react";
import type { ComponentProps } from "react";

type TextInputProps = ComponentProps<typeof IonInput>;

export const TextInput = ({ label, ...props }: TextInputProps) => {
  const defaultProps: TextInputProps = {
    className: "ion-text-right",
    ...props,
  };
  return (
    <Item>
      <Label>{label}</Label>
      <IonInput slot="end" {...defaultProps} />
    </Item>
  );
};
