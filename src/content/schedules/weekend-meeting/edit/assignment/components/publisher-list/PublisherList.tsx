import { useState, useEffect } from "react";
import { IonLabel, IonNote } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { usePublisherAssignmentStats } from "../../hooks/usePublisherAssignmentStats";
import { useSortedFilteredPublishers } from "../../hooks/useSortedFilteredPublishers";
import { useWeekendParticipantIds } from "../../hooks/useWeekendParticipantIds";
import { usePublisherSortFilterStore } from "../../store/usePublisherSortFilterStore";
import { DEFAULT_PRESETS } from "../../store/publisher-sort-filter.types";
import { PublisherDetailModal } from "./components/publisher-detail-modal/PublisherDetailModal";
import { StatsDisplay } from "./components/stats-display/StatsDisplay";
import { DeleteAssignmentButton } from "./components/delete-assignment-button/DeleteAssignmentButton";
import { useParams } from "react-router-dom";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { usePublishers } from "@/content/schedules/weekend-meeting/edit/assignment/hooks/usePublishers";
import { Space } from "@layout/space/Space";

export const PublisherList: React.FC = () => {
  const { week_id, assignment_id } = useParams<{
    week_id: string;
    assignment_id: WeekendAssignmentID;
  }>();
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(
    null,
  );

  const setCurrentAssignmentId = usePublisherSortFilterStore(
    (s) => s.setCurrentAssignmentId,
  );

  useEffect(() => {
    if (assignment_id) {
      setCurrentAssignmentId(assignment_id);
    }
  }, [assignment_id, setCurrentAssignmentId]);

  const { publishers } = usePublishers();

  const { statsMap } = usePublisherAssignmentStats(week_id, assignment_id);
  const participantIds = useWeekendParticipantIds(assignment_id);
  const sortedPublishers = useSortedFilteredPublishers(
    publishers,
    statsMap,
    participantIds,
  );

  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const customPresets = usePublisherSortFilterStore((s) => s.customPresets);
  const allPresets = [...DEFAULT_PRESETS, ...customPresets];
  const activePresetId = assignment_id
    ? (configByAssignment[assignment_id]?.presetId ?? DEFAULT_PRESETS[0].id)
    : DEFAULT_PRESETS[0].id;
  const activePreset = allPresets.find((p) => p.id === activePresetId);

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
        {activePreset && (
          <Item lines="none">
            <IonLabel>
              <Text
                style={{ fontWeight: "bold", color: "var(--ion-color-medium)" }}
              >
                {activePreset.name}
              </Text>
            </IonLabel>
          </Item>
        )}
        {sortedPublishers.map((publisher) => {
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
      {week_id && assignment_id && (
        <>
          <Space />
          <DeleteAssignmentButton
            weekId={week_id}
            assignmentId={assignment_id}
          />
        </>
      )}
      <Space />
    </>
  );
};
