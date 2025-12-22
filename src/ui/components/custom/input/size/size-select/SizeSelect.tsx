import { Label } from "@ionic-display/label/Label";
import { Select } from "@ionic-input/select/Select";
import { IonItem, IonSelectOption } from "@ionic/react";
import type { ComponentProps } from "react";

export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: "xxs", label: "XXS" },
  { value: "xs", label: "XS" },
  { value: "sm", label: "SM" },
  { value: "md", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
  { value: "xxxl", label: "XXXL" },
];

type SizeSelectProps = Omit<ComponentProps<typeof Select>, "children"> & {
  value?: Size;
  onSelectionChange?: (value: Size) => void;
  label?: string;
};

export const SizeSelect: React.FC<SizeSelectProps> = ({
  value,
  onSelectionChange,
  label = "Size",
  ...props
}) => {
  const handleSelectionChange = (event: CustomEvent) => {
    const selectedValue = event.detail.value as Size;
    onSelectionChange?.(selectedValue);
  };

  return (
    <IonItem>
      <Label>{label}</Label>
      <Select
        value={value}
        onIonChange={handleSelectionChange}
        slot="end"
        {...props}
      >
        {SIZE_OPTIONS.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </Select>
    </IonItem>
  );
};
