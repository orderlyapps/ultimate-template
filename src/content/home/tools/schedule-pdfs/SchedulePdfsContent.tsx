import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { format } from "date-fns";
import { MonthPicker } from "@ui/components/custom/input/date/month-picker/MonthPicker";
import { SchedulePdfDocument } from "./components/SchedulePdfDocument";
import { useSchedulePdfsStore } from "./store/useSchedulePdfsStore";
import { PdfDownloadButton } from "@services/vendor/pdf/pdf-download-button";
import { List } from "@ionic-layout/list/List";
import { Button } from "@ionic-input/button/Button";

export const SchedulePdfsContent: React.FC = () => {
  const { activeModal, setActiveModal, selectedMonth, setSelectedMonth } =
    useSchedulePdfsStore();

  const getModalTitle = () => {
    switch (activeModal) {
      case "midweek":
        return "Midweek Meeting";
      case "weekend":
        return "Weekend Meeting";
      case "audio-video":
        return "Audio Video";
      case "cleaning":
        return "Cleaning";
      default:
        return "";
    }
  };

  const getButtonLabel = () => {
    if (!selectedMonth) return `Download ${getModalTitle()} PDF`;

    const firstDate = format(new Date(selectedMonth.firstMonday), "MMM d");
    const lastDate = format(new Date(selectedMonth.lastMonday), "MMM d, yyyy");
    return `Download ${getModalTitle()} PDF (${firstDate} - ${lastDate})`;
  };

  const getFilename = () => {
    if (!selectedMonth) return "";

    const title = getModalTitle();
    const firstDate = format(new Date(selectedMonth.firstMonday), "MMM-d");
    const lastDate = format(new Date(selectedMonth.lastMonday), "MMM-d-yyyy");
    return `${title.replace(/\s+/g, "-")}_${firstDate}_${lastDate}`;
  };

  return (
    <>
      <List>
        <Button onClick={() => setActiveModal("midweek")}>
          Midweek Meeting
        </Button>
        <br />

        <Button onClick={() => setActiveModal("weekend")}>
          Weekend Meeting
        </Button>
        <br />

        <Button onClick={() => setActiveModal("audio-video")}>
          Audio Video
        </Button>
        <br />

        <Button onClick={() => setActiveModal("cleaning")}>Cleaning</Button>
      </List>

      <IonModal
        isOpen={activeModal !== null}
        onDidDismiss={() => setActiveModal(null)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>{getModalTitle()}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setActiveModal(null)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <MonthPicker label="Select Month" onValueChange={setSelectedMonth} />

          {selectedMonth ? (
            <PdfDownloadButton
              document={
                <SchedulePdfDocument
                  title={getModalTitle()}
                  dateRange={selectedMonth}
                />
              }
              filename={getFilename()}
              expand="block"
              style={{ marginTop: "1rem" }}
            >
              {getButtonLabel()}
            </PdfDownloadButton>
          ) : (
            <IonButton expand="block" disabled style={{ marginTop: "1rem" }}>
              {getButtonLabel()}
            </IonButton>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};
