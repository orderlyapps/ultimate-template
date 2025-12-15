import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { useEffect, useRef, useState } from "react";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { TalkPresentationCountdownProgressBar } from "../talk-presentation-countdown/talk-presentation-countdown-progress-bar/TalkPresentationCountdownProgressBar";
import { TalkPresentationCountdownTimeText } from "../talk-presentation-countdown/talk-presentation-countdown-time-text/TalkPresentationCountdownTimeText";
import { getTalkPresentationCountdownValues } from "../talk-presentation-countdown/utils/getTalkPresentationCountdownValues";

type Props = {
  talk: Outline;
  startMs: number | null;
  endMs: number | null;
  onClose: () => void;
  onFinished: () => void;
};

export function TalkPresentationModalHeader({
  talk,
  startMs,
  endMs,
  onClose,
  onFinished,
}: Props) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const hasNotifiedFinished = useRef(false);

  const isRunning = startMs !== null && endMs !== null;

  useEffect(() => {
    hasNotifiedFinished.current = false;
  }, [startMs, endMs]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const countdown =
    isRunning && startMs !== null && endMs !== null
      ? getTalkPresentationCountdownValues({ startMs, endMs, nowMs })
      : null;

  useEffect(() => {
    if (!isRunning) return;
    if (!countdown) return;
    if (countdown.remainingSeconds > 0) return;
    if (hasNotifiedFinished.current) return;

    hasNotifiedFinished.current = true;
    onFinished();
  }, [countdown, isRunning, onFinished]);

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          {countdown ? (
            <TalkPresentationCountdownTimeText
              remainingSeconds={countdown.remainingSeconds}
            />
          ) : (
            talk.name
          )}
        </IonTitle>
        <IonButtons slot="end">
          <CloseButton onClick={onClose} />
        </IonButtons>
      </IonToolbar>
      {countdown ? (
        <TalkPresentationCountdownProgressBar value={countdown.progress} />
      ) : null}
    </IonHeader>
  );
}
