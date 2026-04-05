import { IonItem, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useCalendarItems, getMonthLabel } from "./hooks/useCalendarItems";
import { usePublicTalk } from "./hooks/usePublicTalk";
import { CalendarItemRow } from "./components/calendar-item-row/CalendarItemRow";
import { CalendarMonthHeader } from "./components/calendar-month-header/CalendarMonthHeader";
import { PublicTalkRow } from "./components/public-talk-row/PublicTalkRow";
import { Fragment } from "react";

/**
 * Displays the first upcoming public talk above a month-grouped
 * list of upcoming events for the user's congregation.
 */
export function CalendarContent() {
  const { publicTalk, isLoading: talkLoading } = usePublicTalk();
  const { items, isLoading: eventsLoading } = useCalendarItems();

  if (talkLoading || eventsLoading) return null;

  if (!publicTalk && items.length === 0) {
    return (
      <Item className="ion-margin-bottom">
        <IonLabel>
          <Text size="sm" color="medium">
            No upcoming events
          </Text>
        </IonLabel>
      </Item>
    );
  }

  return (
    <IonItem lines="inset" className="ion-padding-bottom ion-margin-bottom">
      <IonLabel>
        {publicTalk && <PublicTalkRow talk={publicTalk} />}
        {items.slice(0, 3).map((item, index) => {
          const showHeader =
            index === 0 || item.monthId !== items[index - 1].monthId;
          return (
            <Fragment key={item.key}>
              {showHeader && (
                <CalendarMonthHeader label={getMonthLabel(item.monthId)} />
              )}
              <CalendarItemRow item={item} />
            </Fragment>
          );
        })}
      </IonLabel>
    </IonItem>
  );
}
