import { IonButton, IonButtons, IonTitle } from "@ionic/react";

type Props = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  time: string;
};

export function TalkPresentationNavigation({
  canPrev,
  canNext,
  onPrev,
  onNext,
  time,
}: Props) {
  return (
    <>
      <IonButtons slot="start">
        <IonButton expand="block" disabled={!canPrev} onClick={onPrev}>
          Back
        </IonButton>
      </IonButtons>
      <IonTitle>{time}</IonTitle>
      <IonButtons slot="end">
        <IonButton expand="block" disabled={!canNext} onClick={onNext}>
          Next
        </IonButton>
      </IonButtons>
    </>
  );
}
