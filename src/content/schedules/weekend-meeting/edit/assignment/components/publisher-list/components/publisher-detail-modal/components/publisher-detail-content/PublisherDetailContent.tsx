import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { usePublisherAssignmentHistory } from "../../../../../../hooks/usePublisherAssignmentHistory";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { differenceInWeeks, parseISO } from "date-fns";
import { formatAssignmentLabel } from "@/content/schedules/weekend-meeting/edit/assignment/components/publisher-list/components/publisher-detail-modal/components/publisher-detail-content/formatAssignmentLabel";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { useParams } from "react-router-dom";

type Props = {
  publisher: Publisher;
};

export const PublisherDetailContent: React.FC<Props> = ({ publisher }) => {
  const { week_id, assignment_id } = useParams<{
    week_id: string;
    assignment_id: WeekendAssignmentID;
  }>();

  const history = usePublisherAssignmentHistory(
    publisher.id,
    week_id,
    assignment_id,
  );

  const selectedWeekDate = parseISO(week_id);

  const getWeeksDiff = (assignmentWeekId: string): number => {
    return differenceInWeeks(parseISO(assignmentWeekId), selectedWeekDate);
  };

  return (
    <List>
      <Item>
        <IonLabel>
          <strong>Weeks since same assignment:</strong>{" "}
        </IonLabel>
        <Text>{history.weeksSinceSameAssignment ?? "Never"}</Text>
      </Item>
      <Item>
        <IonLabel>
          <strong>Weeks since any assignment:</strong>{" "}
        </IonLabel>
        <Text>{history.weeksSinceAnyAssignment ?? "Never"}</Text>
      </Item>
      <Item>
        <IonLabel>
          <strong>Weeks until same assignment:</strong>{" "}
        </IonLabel>
        <Text>{history.weeksUntilSameAssignment ?? "None scheduled"}</Text>
      </Item>
      <Item>
        <IonLabel>
          <strong>Weeks until any assignment:</strong>{" "}
        </IonLabel>
        <Text>{history.weeksUntilAnyAssignment ?? "None scheduled"}</Text>
      </Item>
      <Item>
        <IonLabel>
          <strong>Avg weeks between same assignment:</strong>{" "}
        </IonLabel>
        <Text>{history.avgWeeksBetweenSameAssignment ?? "N/A"}</Text>
      </Item>
      <Item>
        <IonLabel>
          <strong>Avg weeks between any assignment:</strong>{" "}
        </IonLabel>
        <Text>{history.avgWeeksBetweenAnyAssignment ?? "N/A"}</Text>
      </Item>

      {
        <>
          <Item>
            <IonLabel>
              <Text>
                <strong>Current week assignments:</strong>
              </Text>
            </IonLabel>
          </Item>

          {history.currentWeekAssignments.length === 0 && <Item>None</Item>}

          {history.currentWeekAssignments.map((a, i) => (
            <Item key={`current-${i}`}>
              <IonLabel className="ion-padding-start">
                <Text>{formatAssignmentLabel(a)}</Text>
              </IonLabel>
            </Item>
          ))}
        </>
      }

      {
        <>
          <Item>
            <IonLabel>
              <Text>
                <strong>Future assignments:</strong>
              </Text>
            </IonLabel>
          </Item>

          {history.futureAssignments.length === 0 && <Item>None</Item>}

          {history.futureAssignments.map((a, i) => (
            <Item key={`future-${i}`}>
              <IonLabel className="ion-padding-start">
                <Text>
                  {getTheocraticWeekLabel(a.week_id)} ({getWeeksDiff(a.week_id)}{" "}
                  weeks) - {formatAssignmentLabel(a)}
                </Text>
              </IonLabel>
            </Item>
          ))}
        </>
      }

      {
        <>
          <Item>
            <IonLabel>
              <Text>
                <strong>Past 5 assignments:</strong>
              </Text>
            </IonLabel>
          </Item>

          {history.pastAssignments.length === 0 && <Item>None</Item>}

          {history.pastAssignments.map((a, i) => (
            <Item key={`past-${i}`}>
              <IonLabel className="ion-padding-start">
                <Text>
                  {getTheocraticWeekLabel(a.week_id)} ({getWeeksDiff(a.week_id)}{" "}
                  weeks) - {formatAssignmentLabel(a)}
                </Text>
              </IonLabel>
            </Item>
          ))}
        </>
      }
    </List>
  );
};
