import {
  useTalksStore,
  type Outline,
} from "@feature/talks/state/useTalksStore";
import { IonFooter, IonToolbar } from "@ionic/react";
import { TimeText } from "../header/components/time-text/TimeText";
import { useTalkPresentationSubsectionCountdown } from "../../hooks/useTalkPresentationSubsectionCountdown";
import { useTalkPresentationModalStore } from "../../hooks/useTalkPresentationModalStore";
import { PresentationNavigation } from "./components/presentation-navigation/PresentationNavigation";
import { useParams } from "react-router-dom";

function getTotalItems(talk?: Outline): number {
  let count = 0;

  if (!talk) return count;

  for (const section of talk.sections) {
    count += section.subsections.length;
  }

  return count;
}

export function PresentationModalFooter() {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const subsectionStartMs = useTalkPresentationModalStore(
    (s) => s.subsectionStartMs
  );
  const subsectionEndMs = useTalkPresentationModalStore(
    (s) => s.subsectionEndMs
  );
  const currentIndex = useTalkPresentationModalStore((s) => s.currentIndex);
  const next = useTalkPresentationModalStore((s) => s.next);
  const prev = useTalkPresentationModalStore((s) => s.prev);

  const isRunning = startMs !== null && endMs !== null;
  const totalItems = getTotalItems(talk);
  const maxIndex = Math.max(0, totalItems - 1);
  const clampedIndex = Math.min(maxIndex, Math.max(0, currentIndex));

  const countdown = useTalkPresentationSubsectionCountdown({
    subsectionStartMs,
    subsectionEndMs,
  });

  if (!isRunning) return null;
  if (totalItems === 0) return null;

  return (
    <IonFooter>
      <IonToolbar>
        <PresentationNavigation
          canPrev={clampedIndex > 0}
          canNext={clampedIndex < maxIndex}
          onPrev={() => prev()}
          onNext={() => next(maxIndex)}
          title={
            countdown ? (
              <TimeText remainingSeconds={countdown.remainingSeconds} />
            ) : (
              ""
            )
          }
        />
      </IonToolbar>
    </IonFooter>
  );
}
