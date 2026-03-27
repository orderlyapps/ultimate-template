import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { MonthPicker } from "@ui/components/custom/input/date/month-picker/MonthPicker";
import { SchedulePdfDocument } from "./components/SchedulePdfDocument";
import { useSchedulePdfsStore } from "./store/useSchedulePdfsStore";

export const SchedulePdfsContent: React.FC = () => {
  const { activeModal, setActiveModal, selectedMonth, setSelectedMonth } = useSchedulePdfsStore();

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

  const handleDownloadPdf = async () => {
    if (!selectedMonth) return;

    const title = getModalTitle();
    const firstDate = format(new Date(selectedMonth.firstMonday), "MMM-d");
    const lastDate = format(new Date(selectedMonth.lastMonday), "MMM-d-yyyy");
    const filename = `${title.replace(/\s+/g, "-")}_${firstDate}_${lastDate}.pdf`;

    const blob = await pdf(
      <SchedulePdfDocument title={title} dateRange={selectedMonth} />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <IonButton onClick={() => setActiveModal("midweek")}>
        Midweek Meeting
      </IonButton>
      <IonButton onClick={() => setActiveModal("weekend")}>
        Weekend Meeting
      </IonButton>
      <IonButton onClick={() => setActiveModal("audio-video")}>
        Audio Video
      </IonButton>
      <IonButton onClick={() => setActiveModal("cleaning")}>
        Cleaning
      </IonButton>

      <IonModal isOpen={activeModal !== null} onDidDismiss={() => setActiveModal(null)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{getModalTitle()}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setActiveModal(null)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <MonthPicker
            label="Select Month"
            onValueChange={setSelectedMonth}
          />
          
          <IonButton 
            expand="block" 
            onClick={handleDownloadPdf}
            disabled={!selectedMonth}
            style={{ marginTop: "1rem" }}
          >
            {getButtonLabel()}
          </IonButton>
        </IonContent>
      </IonModal>
    </div>
  );
};
