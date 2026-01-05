import { useTalkPresentationModalStore } from "../use-talk-presentation-modal-store/useTalkPresentationModalStore";
import { useTalkPresentationCountdown } from "../use-talk-presentation-countdown/useTalkPresentationCountdown";

export function useCurrentTalkPresentationCountdown() {
  const endTime = useTalkPresentationModalStore((s) => s.endTime);
  const setEndTime = useTalkPresentationModalStore((s) => s.setEndTime);
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const start = useTalkPresentationModalStore((s) => s.start);
  const finish = useTalkPresentationModalStore((s) => s.finish);

  const countdown = useTalkPresentationCountdown({
    startMs,
    endMs,
    onFinished: finish,
  });

  return {
    endTime,
    setEndTime,
    startMs,
    endMs,
    start,
    countdown,
  };
}
