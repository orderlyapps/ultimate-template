import { useTalkPresentationModalStore } from "../use-talk-presentation-modal-store/useTalkPresentationModalStore";
import { useTalkPresentationCountdown } from "../use-talk-presentation-countdown/useTalkPresentationCountdown";

export function useCurrentTalkPresentationCountdown() {
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const finish = useTalkPresentationModalStore((s) => s.finish);

  const countdown = useTalkPresentationCountdown({
    startMs,
    endMs,
    onFinished: finish,
  });

  return countdown;
}
