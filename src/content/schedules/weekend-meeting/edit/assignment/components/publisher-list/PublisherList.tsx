import { useState } from "react";
import { IonLabel, IonNote } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { usePublisherAssignmentStats } from "../../hooks/usePublisherAssignmentStats";
import { PublisherDetailModal } from "./components/publisher-detail-modal/PublisherDetailModal";
import { StatsDisplay } from "./components/stats-display/StatsDisplay";
import { useParams } from "react-router-dom";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { usePublishers } from "@/content/schedules/weekend-meeting/edit/assignment/hooks/usePublishers";

export const PublisherList: React.FC = () => {
  const { week_id, assignment_id } = useParams<{
    week_id: string;
    assignment_id: WeekendAssignmentID;
  }>();
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(
    null,
  );

  const { publishers } = usePublishers();

  const { statsMap } = usePublisherAssignmentStats(week_id, assignment_id);

  const handlePublisherTap = (publisher: Publisher) => {
    setSelectedPublisher(publisher);
  };

  if (publishers.length === 0) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No publishers found.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <>
      <List>
        {publishers.map((publisher) => {
          const stats = statsMap.get(publisher.id);
          const hasNoAssignment = !stats?.hasCurrentWeekAssignment;

          return (
            <Item
              key={publisher.id}
              button
              onClick={() => handlePublisherTap(publisher)}
            >
              <IonLabel>
                <Text
                  style={hasNoAssignment ? { fontWeight: "bold" } : undefined}
                >
                  {formatPublisherName(publisher)}
                </Text>
              </IonLabel>
              <IonNote slot="end">
                <StatsDisplay stats={stats} />
              </IonNote>
            </Item>
          );
        })}
      </List>
      <PublisherDetailModal
        publisher={selectedPublisher}
        isOpen={!!selectedPublisher}
        onDismiss={() => setSelectedPublisher(null)}
      />
    </>
  );
};
