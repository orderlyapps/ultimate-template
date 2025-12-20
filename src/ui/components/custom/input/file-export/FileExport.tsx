import { IonButton, IonIcon, IonItemOption, IonSpinner } from "@ionic/react";
import { useState } from "react";
import exportIcon from "@icons/export.svg";

interface FileExportProps {
  getData: () => Promise<Blob | string> | Blob | string;
  filename: string;
  label?: string;
  disabled?: boolean;
  iconOnly?: boolean;
  asItemOption?: boolean;
}

export const FileExport: React.FC<FileExportProps> = ({
  getData,
  filename,
  label = "Export",
  disabled = false,
  iconOnly = false,
  asItemOption = false,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const data = await getData();

      const blob =
        typeof data === "string"
          ? new Blob([data], { type: "text/plain" })
          : data;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const Content = () => (
    <>
      {isExporting ? (
        <IonSpinner
          name="crescent"
          slot={iconOnly ? undefined : "start"}
          className={iconOnly ? "" : "ion-margin-end"}
        />
      ) : (
        <IonIcon slot={iconOnly ? "icon-only" : "start"} src={exportIcon} />
      )}
      {!iconOnly && label}
    </>
  );

  if (asItemOption) {
    return (
      <IonItemOption
        color="secondary"
        onClick={handleExport}
        disabled={disabled || isExporting}
      >
        <Content />
      </IonItemOption>
    );
  }

  return (
    <IonButton onClick={handleExport} disabled={disabled || isExporting}>
      <Content />
    </IonButton>
  );
};
