import { IonIcon, IonItemOption } from "@ionic/react";
import icon from "@icons/repeat.svg";
import type { ComponentProps, MouseEvent, ReactNode, RefObject } from "react";

export const ItemOptionMove = ({
  children,
  onClick,
  slidingRef,
  ...rest
}: {
  children?: ReactNode;
  onClick: () => void;
  slidingRef?: RefObject<HTMLIonItemSlidingElement | null>;
} & ComponentProps<typeof IonItemOption>) => {
  const handleOptionClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onClick();

    const slidingEl =
      slidingRef?.current ||
      ((e.currentTarget as HTMLElement).closest(
        "ion-item-sliding",
      ) as HTMLIonItemSlidingElement | null);

    await slidingEl?.close();
  };

  return (
    <IonItemOption color="primary" {...rest} onClick={handleOptionClick}>
      {children || <IonIcon icon={icon} size="large"></IonIcon>}
    </IonItemOption>
  );
};
