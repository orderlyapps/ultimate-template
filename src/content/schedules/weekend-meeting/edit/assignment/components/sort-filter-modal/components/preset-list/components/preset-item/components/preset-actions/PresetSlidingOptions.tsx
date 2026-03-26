import {
  IonIcon,
  IonItemOption,
  IonItemOptions,
  useIonAlert,
} from "@ionic/react";
import editIcon from "@icons/edit.svg";
import copyIcon from "@icons/copy.svg";
import deleteIcon from "@icons/delete.svg";
import { usePublisherSortFilterStore } from "../../../../../../../../store/usePublisherSortFilterStore";
import type { SortFilterPreset } from "../../../../../../../../store/publisher-sort-filter.types";

type Props = {
  preset: SortFilterPreset;
};

export const PresetSlidingOptions: React.FC<Props> = ({ preset }) => {
  const [presentAlert] = useIonAlert();
  const updatePreset = usePublisherSortFilterStore((s) => s.updatePreset);
  const duplicatePreset = usePublisherSortFilterStore((s) => s.duplicatePreset);
  const deletePreset = usePublisherSortFilterStore((s) => s.deletePreset);

  const handleRename = () => {
    presentAlert({
      header: "Rename Preset",
      inputs: [{ name: "name", type: "text", value: preset.name }],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          handler: (data) => {
            if (data.name?.trim()) {
              updatePreset(preset.id, { name: data.name.trim() });
            }
          },
        },
      ],
    });
  };

  const handleDuplicate = () => {
    duplicatePreset(preset.id);
  };

  const handleDelete = () => {
    presentAlert({
      header: "Delete Preset",
      message: `Are you sure you want to delete "${preset.name}"?`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        { text: "Delete", role: "destructive", handler: () => deletePreset(preset.id) },
      ],
    });
  };

  return (
    <>
      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={handleRename}>
          <IonIcon slot="icon-only" src={editIcon} />
        </IonItemOption>
        <IonItemOption color="secondary" onClick={handleDuplicate}>
          <IonIcon slot="icon-only" src={copyIcon} />
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={handleDelete}>
          <IonIcon slot="icon-only" src={deleteIcon} />
        </IonItemOption>
      </IonItemOptions>
    </>
  );
};
