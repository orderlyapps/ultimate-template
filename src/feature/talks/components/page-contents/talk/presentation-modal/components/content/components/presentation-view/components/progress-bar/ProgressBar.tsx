import { useTalkPresentationStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/useTalkPresentationStore";
import { IonProgressBar } from "@ionic/react";

export function ProgressBar() {
  const remainingSubsectionTime = useTalkPresentationStore(
    (s) => s.remainingSubsectionTime
  );

  const subsectionTime = useTalkPresentationStore((s) => s.subsectionTime);

  const progress = remainingSubsectionTime / subsectionTime;

  if (remainingSubsectionTime <= 0) {
    return null;
  }

  return <IonProgressBar value={1 - progress} />;
}
