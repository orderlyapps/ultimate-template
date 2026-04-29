import {
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import {
  OPTIONAL_PUBLISHER_EXPORT_FIELDS,
  type OptionalPublisherExportField,
} from "@state/tanstack/db/publisher-local/publisherLocalExportImport";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  selected: readonly OptionalPublisherExportField[];
  onToggle: (field: OptionalPublisherExportField) => void;
  onConfirm: () => void;
  isExporting: boolean;
};

const FIELD_LABELS: Record<OptionalPublisherExportField, string> = {
  phone: "Phone numbers",
  address: "Addresses",
  email: "Email addresses",
  emergency_contact: "Emergency contacts",
  photo: "Photos",
  birth_date: "Birth date",
  baptism_date: "Baptism date",
};

export function ExportPublishersModal({
  isOpen,
  onDismiss,
  selected,
  onToggle,
  onConfirm,
  isExporting,
}: Props) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Export Publishers</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Select Data to Include</IonLabel>
          </IonListHeader>
          {OPTIONAL_PUBLISHER_EXPORT_FIELDS.map((field) => (
            <IonItem key={field}>
              <IonCheckbox
                checked={selected.includes(field)}
                onIonChange={() => onToggle(field)}
              >
                {FIELD_LABELS[field]}
              </IonCheckbox>
            </IonItem>
          ))}
          <Space />
          <Button onClick={onConfirm} disabled={isExporting}>
            {isExporting ? "Exporting…" : "Export"}
          </Button>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
