import { TalkPresentationTimePicker } from "../talk-presentation-time-picker/TalkPresentationTimePicker";
import { useTalkPresentationModalStore } from "../../hooks/useTalkPresentationModalStore";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";

export function TalkPresentationModalContent() {
  const selectedTime = useTalkPresentationModalStore((s) => s.selectedTime);
  const setSelectedTime = useTalkPresentationModalStore(
    (s) => s.setSelectedTime
  );
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const start = useTalkPresentationModalStore((s) => s.start);

  const isRunning = startMs !== null && endMs !== null;

  if (isRunning && startMs !== null && endMs !== null) {
    return null;
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
