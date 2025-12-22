import { IonButton, IonIcon } from "@ionic/react";
import type { Size } from "../size-select/SizeSelect";
import add from "@icons/add.svg";
import minus from "@icons/minus.svg";

const SIZE_ORDER: Size[] = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];

type SizeButtonsProps = {
  value: Size;
  onSizeChange: (size: Size) => void;
  disabled?: boolean;
};

export const SizeButtons: React.FC<SizeButtonsProps> = ({
  value,
  onSizeChange,
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
    <>
      <IonButton
        fill="clear"
        size="small"
        onClick={handleDecrease}
        disabled={disabled || !canDecrease}
      >
        <IonIcon src={minus} slot="icon-only" />
      </IonButton>
      <IonButton
        fill="clear"
        size="small"
        onClick={handleIncrease}
        disabled={disabled || !canIncrease}
      >
        <IonIcon src={add} slot="icon-only" />
      </IonButton>
    </>
  );
};
