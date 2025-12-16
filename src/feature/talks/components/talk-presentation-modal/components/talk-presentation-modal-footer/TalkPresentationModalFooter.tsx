import type { Outline } from "@feature/talks/state/useTalksStore";
import { IonFooter, IonToolbar } from "@ionic/react";
import { TalkPresentationCountdownProgressBar } from "../talk-presentation-modal-header/components/talk-presentation-countdown-progress-bar/TalkPresentationCountdownProgressBar";
import { TalkPresentationCountdownTimeText } from "../talk-presentation-modal-header/components/talk-presentation-countdown-time-text/TalkPresentationCountdownTimeText";
import { useTalkPresentationSubsectionCountdown } from "../../hooks/useTalkPresentationSubsectionCountdown";
import { useTalkPresentationModalStore } from "../../hooks/useTalkPresentationModalStore";
import { TalkPresentationNavigation } from "./components/talk-presentation-navigation/TalkPresentationNavigation";

type Props = {
  talk: Outline;
};

function getTotalItems(talk: Outline): number {
  let count = 0;

  for (const section of talk.sections) {
    count += section.subsections.length;
  }

  return count;
}

export function TalkPresentationModalFooter({ talk }: Props) {
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const currentIndex = useTalkPresentationModalStore((s) => s.currentIndex);
  const next = useTalkPresentationModalStore((s) => s.next);
  const prev = useTalkPresentationModalStore((s) => s.prev);

  const isRunning = startMs !== null && endMs !== null;
  const totalItems = getTotalItems(talk);
  const maxIndex = Math.max(0, totalItems - 1);
  const clampedIndex = Math.min(maxIndex, Math.max(0, currentIndex));

  const countdown = useTalkPresentationSubsectionCountdown({
    talk,
    presentationStartMs: startMs,
    currentIndex: clampedIndex,
  });

  if (!isRunning) return null;
  if (totalItems === 0) return null;

  return (
    <IonFooter>
      <IonToolbar>
        <TalkPresentationNavigation
          canPrev={clampedIndex > 0}
          canNext={clampedIndex < maxIndex}
          onPrev={() => prev()}
          onNext={() => next(maxIndex)}
          title={
            countdown ? (
              <TalkPresentationCountdownTimeText
                remainingSeconds={countdown.remainingSeconds}
              />
            ) : (
              ""
            )
          }
        />
      </IonToolbar>
      {countdown ? (
        <TalkPresentationCountdownProgressBar value={countdown.progress} />
      ) : null}
    </IonFooter>
  );
}
