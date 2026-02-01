import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItemDivider,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import backIcon from "@icons/chevronBackJW.svg";
import forwardIcon from "@icons/chevronForwardJW.svg";

type WeekNavigationProps = {
  week_id: string;
};

export const WeekNavigation = ({ week_id }: WeekNavigationProps) => {
  const router = useIonRouter();
  const weekLabel = getTheocraticWeekLabel(week_id);

  return (
    <IonItemDivider sticky style={{ zIndex: 1000 }}>
      <IonGrid>
        <IonRow>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              onClick={() => {
                const currentDate = parseISO(week_id);
                const previousWeek = new Date(currentDate);
                previousWeek.setDate(previousWeek.getDate() - 7);
                const previousWeekId = format(previousWeek, "yyyy-MM-dd");
                router.push(`${previousWeekId}`, "back", "replace");
              }}
            >
              <IonIcon src={backIcon} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
          <IonCol>
            <div className="ion-text-center full centered">
              <IonText>
                <strong>{weekLabel}</strong>
              </IonText>
            </div>
          </IonCol>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              onClick={() => {
                const currentDate = parseISO(week_id);
                const nextWeek = new Date(currentDate);
                nextWeek.setDate(nextWeek.getDate() + 7);
                const nextWeekId = format(nextWeek, "yyyy-MM-dd");
                router.push(`${nextWeekId}`, "forward", "replace");
              }}
            >
              <IonIcon src={forwardIcon} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItemDivider>
  );
};
