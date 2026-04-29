import { IonButton, IonIcon } from "@ionic/react";
import exportIcon from "@icons/export.svg";
import { useState } from "react";
import {
  createPublisherLocalExporter,
  generateExportFilename,
  type OptionalPublisherExportField,
} from "@state/tanstack/db/publisher-local/publisherLocalExportImport";
import { ExportPublishersModal } from "./components/export-publishers-modal/ExportPublishersModal";

/**
 * Header button that lets the user choose which optional publisher fields to
 * include in an export, then triggers a download of the filtered JSON.
 */
export const ExportPublishersButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionalPublisherExportField[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const toggle = (field: OptionalPublisherExportField) => {
    setSelected((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field],
    );
  };

  const handleConfirm = async () => {
    try {
      setIsExporting(true);
      const blob = await createPublisherLocalExporter(selected)();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = generateExportFilename();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch (error) {
      console.error("Publisher export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <IonIcon src={exportIcon} slot="icon-only" />
      </IonButton>
      <ExportPublishersModal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        selected={selected}
        onToggle={toggle}
        onConfirm={handleConfirm}
        isExporting={isExporting}
      />
    </>
  );
};
