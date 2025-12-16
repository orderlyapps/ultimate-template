import type { ReactNode } from "react";
import { IonButton, IonButtons, IonTitle } from "@ionic/react";

type Props = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  title: ReactNode;
};

export function TalkPresentationNavigation({
  canPrev,
  canNext,
  onPrev,
  onNext,
  title,
}: Props) {
  return (
    <>
      <IonButtons slot="start">
        <IonButton expand="block" disabled={!canPrev} onClick={onPrev}>
          Back
        </IonButton>
      </IonButtons>
      <IonTitle>{title}</IonTitle>
      <IonButtons slot="end">
        <IonButton expand="block" disabled={!canNext} onClick={onNext}>
          Next
        </IonButton>
      </IonButtons>
    </>
  );
}
