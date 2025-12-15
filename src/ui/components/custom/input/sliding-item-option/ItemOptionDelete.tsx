import { IonIcon, IonItemOption } from "@ionic/react";
import deleteIcon from "@icons/delete.svg";
import type { ComponentProps } from "react";

export const ItemOptionDelete = ({
  children,
  onClick,
  slidingRef,
  ...rest
}: {
  children?: React.ReactNode;
  onClick: () => void;
  slidingRef: React.RefObject<HTMLIonItemSlidingElement | null>;
} & ComponentProps<typeof IonItemOption>) => {
  const handleOptionClick = async () => {
    onClick();
    await slidingRef?.current?.close();
  };

  return (
    <IonItemOption color="danger" {...rest} onClick={handleOptionClick}>
      {children || <IonIcon icon={deleteIcon} size="large"></IonIcon>}
    </IonItemOption>
  );
};
