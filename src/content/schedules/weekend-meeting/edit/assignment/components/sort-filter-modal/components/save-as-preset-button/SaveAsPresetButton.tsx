import { useIonAlert } from "@ionic/react";
import { usePublisherSortFilterStore } from "../../../../store/usePublisherSortFilterStore";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";

export const SaveAsPresetButton: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const createPreset = usePublisherSortFilterStore((s) => s.createPreset);
  const applyPreset = usePublisherSortFilterStore((s) => s.applyPreset);
  const hasUnsavedChanges = usePublisherSortFilterStore(
    (s) => s.hasUnsavedChanges,
  );

  const activeConfig = currentAssignmentId
    ? configByAssignment[currentAssignmentId]?.config
    : null;

  if (!hasUnsavedChanges()) return null;

  const handleSave = () => {
    presentAlert({
      header: "Save As Preset",
      message: "Save current settings as a new preset",
      inputs: [{ name: "name", type: "text", placeholder: "Preset name" }],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          handler: (data) => {
            if (data.name?.trim() && activeConfig) {
              const newPreset = createPreset(data.name.trim(), activeConfig);
              console.log(newPreset)
              applyPreset(newPreset);
            }
          },
        },
      ],
    });
  };

  return (
    <>
      <Space />
      <Button onClick={handleSave}>Save As Preset</Button>
    </>
  );
};
