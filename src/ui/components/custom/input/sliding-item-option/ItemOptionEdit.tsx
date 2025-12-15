import { IonIcon, IonItemOption } from "@ionic/react";
import editIcon from "@icons/edit.svg";
import { type ComponentProps } from "react";

export const ItemOptionEdit = ({
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
    <IonItemOption color="warning" {...rest} onClick={handleOptionClick}>
      {children || <IonIcon icon={editIcon} size="large"></IonIcon>}
    </IonItemOption>
  );
};
