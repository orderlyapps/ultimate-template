import { Fragment } from "react";
import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useCalendarItems, getMonthLabel } from "./hooks/useCalendarItems";
import { usePublicTalk } from "./hooks/usePublicTalk";
import { CalendarItemRow } from "./components/calendar-item-row/CalendarItemRow";
import { CalendarMonthHeader } from "./components/calendar-month-header/CalendarMonthHeader";
import { PublicTalkRow } from "./components/public-talk-row/PublicTalkRow";

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
      <Item lines="none">
        <IonLabel>
          <Text size="sm" color="medium">
            No upcoming events
          </Text>
        </IonLabel>
      </Item>
    );
  }

  return (
    <>
      {publicTalk && <PublicTalkRow talk={publicTalk} />}
      {items.map((item, index) => {
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
    </>
  );
}
