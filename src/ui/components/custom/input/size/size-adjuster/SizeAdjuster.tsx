import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import type { Size } from "../size-select/SizeSelect";
import add from "@icons/add.svg";
import minus from "@icons/minus.svg";

const SIZE_ORDER: Size[] = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];

const SIZE_LABELS: Record<Size, string> = {
  xxs: "XXS",
  xs: "XS",
  sm: "SM",
  md: "MD",
  lg: "LG",
  xl: "XL",
  xxl: "XXL",
  xxxl: "XXXL",
};

type SizeAdjusterProps = {
  value: Size;
  onSizeChange: (size: Size) => void;
  label?: string;
  disabled?: boolean;
};

export const SizeAdjuster: React.FC<SizeAdjusterProps> = ({
  value,
  onSizeChange,
  label = "Size",
  disabled = false,
}) => {
  const currentIndex = SIZE_ORDER.indexOf(value);
  const canDecrease = currentIndex > 0;
  const canIncrease = currentIndex < SIZE_ORDER.length - 1;

  const handleDecrease = () => {
    if (canDecrease) {
      onSizeChange(SIZE_ORDER[currentIndex - 1]);
    }
  };

  const handleIncrease = () => {
    if (canIncrease) {
      onSizeChange(SIZE_ORDER[currentIndex + 1]);
    }
  };

  return (
    <IonItem>
      <IonLabel>{label}</IonLabel>
      <div slot="end" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IonButton
          fill="clear"
          size="small"
          onClick={handleDecrease}
          disabled={disabled || !canDecrease}
        >
          <IonIcon src={minus} slot="icon-only" />
        </IonButton>
        <IonLabel style={{ minWidth: "40px", textAlign: "center" }}>
          {SIZE_LABELS[value]}
        </IonLabel>
        <IonButton
          fill="clear"
          size="small"
          onClick={handleIncrease}
          disabled={disabled || !canIncrease}
        >
          <IonIcon src={add} slot="icon-only" />
        </IonButton>
      </div>
    </IonItem>
  );
};
