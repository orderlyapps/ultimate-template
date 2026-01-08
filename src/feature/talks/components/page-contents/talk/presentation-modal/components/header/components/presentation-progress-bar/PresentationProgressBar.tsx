import { IonProgressBar } from "@ionic/react";
import { useTalkPresentationStore } from "../../../../hooks/use-talk-presentation-store/useTalkPresentationStore";

export function PresentationProgressBar() {
  const remainingPresentationTime = useTalkPresentationStore(
    (s) => s.remainingPresentationTime
  );

  const presentationTime = useTalkPresentationStore((s) => s.presentationTime);

  const progress = remainingPresentationTime / presentationTime;

  if (remainingPresentationTime <= 0) {
    return null;
  }

  return <IonProgressBar value={1 - progress} />;
}
