import { useTalkPresentationModalStore } from "../use-talk-presentation-modal-store/useTalkPresentationModalStore";
import { useTalkPresentationCountdown } from "../use-talk-presentation-countdown/useTalkPresentationCountdown";

export function useCurrentTalkPresentationCountdown() {
  const selectedTime = useTalkPresentationModalStore((s) => s.selectedTime);
  const setSelectedTime = useTalkPresentationModalStore(
    (s) => s.setSelectedTime
  );
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
    selectedTime,
    setSelectedTime,
    startMs,
    endMs,
    start,
    countdown,
  };
}
