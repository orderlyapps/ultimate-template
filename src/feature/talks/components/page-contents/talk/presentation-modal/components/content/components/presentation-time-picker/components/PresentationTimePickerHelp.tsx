import { HelpText } from "@services/app/help-text/HelpText";

export function PresentationTimePickerHelp() {
  return (
    <HelpText id="presentation:time-picker" group="talks">
      <strong>Set End Time:</strong> Tap the time button to select when your
      presentation should end. This helps you stay on schedule.
    </HelpText>
  );
}
