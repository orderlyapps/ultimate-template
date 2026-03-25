import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { usePublisherAssignmentHistory } from "../../../../../../hooks/usePublisherAssignmentHistory";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
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

  return (
    <List>
      <Item>
        <IonLabel>
          <Text>
            <strong>Weeks since same assignment:</strong>{" "}
            {history.weeksSinceSameAssignment ?? "Never"}
          </Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text>
            <strong>Weeks since any assignment:</strong>{" "}
            {history.weeksSinceAnyAssignment ?? "Never"}
          </Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text>
            <strong>Weeks until same assignment:</strong>{" "}
            {history.weeksUntilSameAssignment ?? "None scheduled"}
          </Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text>
            <strong>Weeks until any assignment:</strong>{" "}
            {history.weeksUntilAnyAssignment ?? "None scheduled"}
          </Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text>
            <strong>Avg weeks between same assignment:</strong>{" "}
            {history.avgWeeksBetweenSameAssignment ?? "N/A"}
          </Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text>
            <strong>Avg weeks between any assignment:</strong>{" "}
            {history.avgWeeksBetweenAnyAssignment ?? "N/A"}
          </Text>
        </IonLabel>
      </Item>

      {history.currentWeekAssignments.length > 0 && (
        <>
          <Item>
            <IonLabel>
              <Text>
                <strong>Current week assignments:</strong>
              </Text>
            </IonLabel>
          </Item>
          {history.currentWeekAssignments.map((a, i) => (
            <Item key={`current-${i}`}>
              <IonLabel className="ion-padding-start">
                <Text>{formatAssignmentLabel(a)}</Text>
              </IonLabel>
            </Item>
          ))}
        </>
      )}

      {history.futureAssignments.length > 0 && (
        <>
          <Item>
            <IonLabel>
              <Text>
                <strong>Future assignments:</strong>
              </Text>
            </IonLabel>
          </Item>
          {history.futureAssignments.map((a, i) => (
            <Item key={`future-${i}`}>
              <IonLabel className="ion-padding-start">
                <Text>
                  {getTheocraticWeekLabel(a.week_id)} - {formatAssignmentLabel(a)}
                </Text>
              </IonLabel>
            </Item>
          ))}
        </>
      )}

      {history.pastAssignments.length > 0 && (
        <>
          <Item>
            <IonLabel>
              <Text>
                <strong>Past 5 assignments:</strong>
              </Text>
            </IonLabel>
          </Item>
          {history.pastAssignments.map((a, i) => (
            <Item key={`past-${i}`}>
              <IonLabel className="ion-padding-start">
                <Text>
                  {getTheocraticWeekLabel(a.week_id)} - {formatAssignmentLabel(a)}
                </Text>
              </IonLabel>
            </Item>
          ))}
        </>
      )}
    </List>
  );
};
