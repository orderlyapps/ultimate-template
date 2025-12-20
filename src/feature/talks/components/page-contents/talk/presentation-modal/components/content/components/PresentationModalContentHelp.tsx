import { HelpText } from "@services/app/help-text/HelpText";

export function PresentationModalContentHelp() {
  return (
    <HelpText id="presentation:modal-setup" group="talks">
      <strong>Presentation Setup:</strong> set the end time for
      your talk and tap Start to begin the timer.
    </HelpText>
  );
}
