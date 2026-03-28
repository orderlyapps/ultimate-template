import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { funnel } from "ionicons/icons";
import { AddButton } from "@input/button/add-button/AddButton";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { AllPublishersList } from "@feature/db/publisher/all-publishers-list/AllPublishersList";
import { AddPublisherModal } from "@feature/db/publisher/all-publishers-list/components/add-publisher-modal/AddPublisherModal";
import { PublisherFilterModal } from "@feature/db/publisher/all-publishers-list/components/publisher-filter-modal/PublisherFilterModal";
import { PresetSelectionModal } from "@feature/db/publisher/all-publishers-list/components/preset-selection-modal/PresetSelectionModal";
import { usePublisherFilterPresets } from "@feature/db/publisher/all-publishers-list/usePublisherFilterPresets";
import { useLocalStorage } from "@util/hooks/useLocalStorage";
import { defaultFilters } from "@feature/db/publisher/all-publishers-list/publisherFilterState";
import type { PublisherFilterState } from "@feature/db/publisher/all-publishers-list/publisherFilterState";
import { Space } from "@layout/space/Space";
import {
  useFeatureAccess,
  TEMP_ALL_AUTHORIZED_NAMES,
} from "@services/app/auth/temp-feature-access/useFeatureAccess";
import { FileExport } from "@input/file-export/FileExport";
import { FileImport } from "@input/file-import/FileImport";
import {
  exportPublisherLocalData,
  importPublisherLocalData,
  generateExportFilename,
} from "@state/tanstack/db/publisher-local/publisherLocalExportImport";
export const AllPublishers: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePresetName, setActivePresetName] = useLocalStorage<string>(
    "publisher-list-preset-name",
    "All Publishers",
  );
  const {
    userPresets,
    savePreset,
    renamePreset,
    duplicatePreset,
    deletePreset,
  } = usePublisherFilterPresets();
  const [storedFilters, setFilters] = useLocalStorage<PublisherFilterState>(
    "publisher-list-filters",
    defaultFilters,
  );

  const filters: PublisherFilterState = {
    ...defaultFilters,
    ...storedFilters,
  };

  const hasActiveFilters =
    filters.standing.length > 0 ||
    filters.type.length > 0 ||
    filters.gender.length > 0 ||
    filters.group.length > 0;

  const { isUnlocked } = useFeatureAccess(TEMP_ALL_AUTHORIZED_NAMES);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonButtons slot="end">
            {isUnlocked && (
              <>
                <FileImport
                  onFileSelect={(file) => setPendingImportFile(file)}
                  accept=".json"
                  iconOnly
                />
                <FileExport
                  getData={exportPublisherLocalData}
                  filename={generateExportFilename()}
                  iconOnly
                />
                <IonButton onClick={() => setIsFilterModalOpen(true)}>
                  <IonIcon
                    icon={funnel}
                    slot="icon-only"
                    color={hasActiveFilters ? "primary" : undefined}
                  />
                </IonButton>
                <AddButton onClick={() => setIsAddModalOpen(true)} />
              </>
            )}
          </IonButtons>
          <IonTitle>{activePresetName}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search publishers..."
            debounce={300}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{activePresetName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <AllPublishersList
          filters={filters}
          searchQuery={searchQuery}
          onOpenPresets={() => setIsPresetModalOpen(true)}
        />
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
          onSelect={(f, name) => {
            setFilters(f);
            setActivePresetName(name);
          }}
          onRename={renamePreset}
          onDuplicate={duplicatePreset}
          onDelete={deletePreset}
        />
      </IonContent>
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
    </IonPage>
  );
};
