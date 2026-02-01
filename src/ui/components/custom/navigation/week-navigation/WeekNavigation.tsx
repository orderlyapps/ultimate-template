import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonPopover,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { addWeeks } from "date-fns/addWeeks";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import backIcon from "@icons/chevronBackJW.svg";
import forwardIcon from "@icons/chevronForwardJW.svg";
import { Text } from "@ionic-display/text/Text";

type WeekNavigationProps = {
  week_id: string;
};

export const WeekNavigation = ({ week_id }: WeekNavigationProps) => {
  const router = useIonRouter();
  const weekLabel = getTheocraticWeekLabel(week_id);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const currentDate = parseISO(week_id);
  const weekOptions = Array.from({ length: 14 }, (_, i) => {
    const offset = i - 4;
    const weekDate = addWeeks(currentDate, offset);
    return {
      weekId: format(weekDate, "yyyy-MM-dd"),
      label: getTheocraticWeekLabel(format(weekDate, "yyyy-MM-dd")),
      isCurrent: offset === 0,
    };
  });

  return (
    <IonItemDivider sticky style={{ zIndex: 1000 }}>
      <IonGrid>
        <IonRow>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              onClick={() => {
                const previousWeekId = format(addWeeks(currentDate, -1), "yyyy-MM-dd");
                router.push(`${previousWeekId}`, "back", "replace");
              }}
            >
              <IonIcon src={backIcon} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
          <IonCol
            id="week-popover-trigger"
            className="ion-text-center ion-align-self-center"
            onClick={() => setPopoverOpen(true)}
          >
            <Text color="primary" size="sm" bold>
              {weekLabel}
            </Text>
          </IonCol>
          <IonPopover
            id="week-nav"
            trigger="week-popover-trigger"
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
          >
            <IonList>
              {weekOptions.map((option) => (
                <IonItem
                  key={option.weekId}
                  onClick={() => {
                    setPopoverOpen(false);
                    if (!option.isCurrent) {
                      router.push(`${option.weekId}`, "none", "replace");
                    }
                  }}
                  lines="none"
                >
                  <Text
                    size={option.isCurrent ? "md" : "sm"}
                    color={option.isCurrent ? "primary" : undefined}
                    bold={option.isCurrent}
                  >
                    {option.label}
                  </Text>
                </IonItem>
              ))}
            </IonList>
          </IonPopover>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              onClick={() => {
                const nextWeekId = format(addWeeks(currentDate, 1), "yyyy-MM-dd");
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
