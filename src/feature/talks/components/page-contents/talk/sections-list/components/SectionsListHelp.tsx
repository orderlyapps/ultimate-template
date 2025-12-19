import { HelpText } from "@services/app/help-text/HelpText";

export function SectionsListHelp() {
  return (
    <HelpText id="sections:list-actions" group="talks">
      <strong>Manage Sections:</strong> Drag the reorder handle to rearrange
      sections. Tap a section to edit it, or swipe left to duplicate or delete.
    </HelpText>
  );
}
