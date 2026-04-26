import {
  IonDatetime,
  IonDatetimeButton,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { usePublisherEditStore } from "../../store/usePublisherEditStore";
import { Item } from "@ionic-layout/item/Item";
import { SectionHeading } from "@display/section-heading/SectionHeading";

/** Renders Birth Date and Baptism Date pickers using IonDatetime modals. */
export const DateFieldsEdit: React.FC = () => {
  const { birth_date, baptism_date, setBirthDate, setBaptismDate } =
    usePublisherEditStore();

  return (
    <>
      <Item>
        <SectionHeading>Dates</SectionHeading>
      </Item>

      <IonItem>
        <IonLabel>Birth</IonLabel>

        <IonDatetimeButton datetime="birth-date-picker" />
        <IonModal keepContentsMounted>
          <IonDatetime
            id="birth-date-picker"
            presentation="date"
            showDefaultButtons
            value={birth_date || undefined}
            onIonChange={(e) => setBirthDate(String(e.detail.value ?? ""))}
          />
        </IonModal>
      </IonItem>

      <IonItem>
        <IonLabel>Baptism</IonLabel>
        <IonDatetimeButton datetime="baptism-date-picker" />
        <IonModal keepContentsMounted>
          <IonDatetime
            id="baptism-date-picker"
            presentation="date"
            showDefaultButtons
            value={baptism_date || undefined}
            onIonChange={(e) => setBaptismDate(String(e.detail.value ?? ""))}
          />
        </IonModal>
      </IonItem>
    </>
  );
};
