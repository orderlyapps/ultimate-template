import { AddButton } from "@input/button/add-button/AddButton";
import { FileExport } from "@input/file-export/FileExport";
import { FileImport } from "@input/file-import/FileImport";
import {
  exportPublisherLocalData,
  generateExportFilename,
} from "@state/tanstack/db/publisher-local/publisherLocalExportImport";
import {
  useFeatureAccess,
  TEMP_ALL_AUTHORIZED_NAMES,
} from "@services/app/auth/temp-feature-access/useFeatureAccess";
import { usePublisherListsStore } from "../../store/usePublisherListsStore";

export const PublisherListsHeaderButtons: React.FC = () => {
  const { setIsAddModalOpen, setPendingImportFile } = usePublisherListsStore();

  const { isUnlocked } = useFeatureAccess(TEMP_ALL_AUTHORIZED_NAMES);

  return (
    <>
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

          <AddButton onClick={() => setIsAddModalOpen(true)} />
        </>
      )}
    </>
  );
};
