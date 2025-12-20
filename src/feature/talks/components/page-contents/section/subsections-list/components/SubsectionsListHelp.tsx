import { HelpText } from "@services/app/help-text/HelpText";

export function SubsectionsListHelp() {
  return (
    <HelpText id="subsections:list-actions" group="talks">
      <strong>Manage Subsections:</strong> Drag the reorder handle to rearrange
      subsections. Tap a subsection to edit it, or swipe left to duplicate or
      delete.
    </HelpText>
  );
}
