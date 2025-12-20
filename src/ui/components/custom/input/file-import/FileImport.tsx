import { IonButton, IonIcon } from "@ionic/react";
import { useRef } from "react";
import importIcon from "@icons/import.svg";

interface FileImportProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  disabled?: boolean;
}

export const FileImport: React.FC<FileImportProps> = ({
  onFileSelect,
  accept = "*",
  label = "Import",
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset value to allow selecting the same file again
    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: "none" }}
      />
      <IonButton onClick={handleClick} disabled={disabled}>
        <IonIcon slot="start" src={importIcon} />
        {label}
      </IonButton>
    </>
  );
};
