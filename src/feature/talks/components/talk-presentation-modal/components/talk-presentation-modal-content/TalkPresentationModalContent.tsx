import { TalkPresentationTimePicker } from "../talk-presentation-time-picker/TalkPresentationTimePicker";
import { useTalkPresentationModalStore } from "../../hooks/useTalkPresentationModalStore";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { TalkPresentationTalkViewer } from "../talk-presentation-talk-viewer/TalkPresentationTalkViewer";

type Props = {
  talk: Outline;
};

export function TalkPresentationModalContent({ talk }: Props) {
  const selectedTime = useTalkPresentationModalStore((s) => s.selectedTime);
  const setSelectedTime = useTalkPresentationModalStore(
    (s) => s.setSelectedTime
  );
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const start = useTalkPresentationModalStore((s) => s.start);

  const isRunning = startMs !== null && endMs !== null;

  if (isRunning && startMs !== null && endMs !== null) {
    return <TalkPresentationTalkViewer talk={talk} />;
  }

  return (
    <>
      <Space />
      <TalkPresentationTimePicker
        value={selectedTime}
        onChange={(nextValue) => setSelectedTime(nextValue)}
      />
      <Space />
      <Button expand="block" onClick={start}>
        Start
      </Button>
    </>
  );
}
