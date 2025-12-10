import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Select } from "@ionic-input/select/Select";
import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import type { ComponentProps } from "react";

type SelectItemProps = ComponentProps<typeof IonSelect> & {
  options:
    | readonly { readonly value: string | null; readonly label: string }[]
    | { value: string; label: string }[];
};

export const SelectItem: React.FC<SelectItemProps> = ({
  options,
  label,
  ...props
}) => {
  const defaultProps = {
    slot: "end",
    ...props,
  };

  return (
    <IonItem>
      <Label>
        <Text bold>{label}</Text>
      </Label>
      <Select {...defaultProps}>
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </Select>
    </IonItem>
  );
};
