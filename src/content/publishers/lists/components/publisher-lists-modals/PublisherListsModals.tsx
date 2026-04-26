import { IonAlert } from "@ionic/react";
import { AddPublisherModal } from "@/content/publishers/lists/components/publisher-lists-modals/components/add-publisher-modal/AddPublisherModal";
import { PublisherFilterModal } from "@/content/publishers/lists/components/publisher-lists-modals/components/publisher-filter-modal/PublisherFilterModal";
import { PresetSelectionModal } from "@/content/publishers/lists/components/publisher-lists-modals/components/preset-selection-modal/PresetSelectionModal";
import { importPublisherLocalData } from "@state/tanstack/db/publisher-local/publisherLocalExportImport";
import { usePublisherListsStore } from "../../store/usePublisherListsStore";

export const PublisherListsModals: React.FC = () => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,
    isPresetModalOpen,
    setIsPresetModalOpen,
    pendingImportFile,
    setPendingImportFile,
    filters,
    setFilters,
    setActivePresetName,
    userPresets,
    savePreset,
    renamePreset,
    duplicatePreset,
    deletePreset,
    applyPreset,
  } = usePublisherListsStore();
  

  return (
    <>
      <AddPublisherModal
        isOpen={isAddModalOpen}
        onDismiss={() => setIsAddModalOpen(false)}
      />
      <PublisherFilterModal
        isOpen={isFilterModalOpen}
        onDismiss={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFiltersChange={(f) => {
          setFilters(f);
          setActivePresetName("All Publishers");
        }}
        onSavePreset={(name, f) => savePreset(name, f)}
      />
      <PresetSelectionModal
        isOpen={isPresetModalOpen}
        onDismiss={() => setIsPresetModalOpen(false)}
        userPresets={userPresets}
        onSelect={(f, name) => applyPreset(f, name)}
        onRename={renamePreset}
        onDuplicate={duplicatePreset}
        onDelete={deletePreset}
      />
      <IonAlert
        isOpen={pendingImportFile !== null}
        header="Import Publishers"
        message="This will overwrite all existing local publisher data. Are you sure you want to continue?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => setPendingImportFile(null),
          },
          {
            text: "Import",
            role: "destructive",
            handler: async () => {
              if (pendingImportFile) {
                await importPublisherLocalData(pendingImportFile);
                setPendingImportFile(null);
              }
            },
          },
        ]}
        onDidDismiss={() => setPendingImportFile(null)}
      />
    </>
  );
};
