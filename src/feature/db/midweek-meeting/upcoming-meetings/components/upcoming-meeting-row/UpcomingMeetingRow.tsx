import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { MeetingAgendaItems } from "./components/meeting-agenda-items/MeetingAgendaItems";
import { MidweekAVAssignments } from "./components/midweek-av-assignments/MidweekAVAssignments";
import { MidweekAttendantAssignments } from "./components/midweek-attendant-assignments/MidweekAttendantAssignments";
import { WeekEvents } from "@feature/db/shared/week-events/WeekEvents";
import { useBlockingEvents } from "@feature/db/shared/week-events/useBlockingEvents";
import { Space } from "@layout/space/Space";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

type Props = {
  weekId: string;
};

export const UpcomingMeetingRow: FC<Props> = ({ weekId }) => {
  const hasBlockingEvent = useBlockingEvents(weekId, "midweek");

  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: midweekMeetingDataCollection,
      })
      .where(({ m }) => eq(m.week_id, weekId)),
  );

  const meeting = data?.[0];

  return (
    <List lines="none">
      <WeekEvents weekId={weekId} meetingType="midweek" />
      {!hasBlockingEvent && meeting && (
        <IonGrid className="ion-no-padding ion-padding-start">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <MeetingAgendaItems meeting={meeting} weekId={weekId} />
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <MidweekAVAssignments weekId={weekId} />
              <MidweekAttendantAssignments weekId={weekId} />
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
      <Space />
    </List>
  );
};
