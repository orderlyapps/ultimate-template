import { IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { WeekAssignmentItem } from "./components/week-assignment-item/WeekAssignmentItem";
import { useWeeks } from "./hooks/use-weeks";
import { useCleanAssignments } from "./hooks/use-clean-assignments";

/**
 * Content component for managing clean table assignments.
 * Displays a list of weeks (up to 4 months) with select inputs for major and minor cleaning assignments.
 * Users with edit:clean permission can assign groups and delete assignments.
 */
export const CleanTablesContent: React.FC = () => {
  const weeks = useWeeks();
  const {
    majorAssignments,
    minorAssignments,
    canEdit,
    setMajorAssignment,
    setMinorAssignment,
    deleteMajorAssignment,
    deleteMinorAssignment,
  } = useCleanAssignments();

  const { data: groups } = useLiveQuery((q) => q.from({ g: groupCollection }));

  // Get user's congregation groups for the select dropdowns
  const userGroups = groups ?? [];

  // Find assignment for a specific week
  const getMajorGroupId = (weekId: string): string | null => {
    const assignment = majorAssignments.find((a) => a.week_id === weekId);
    return assignment?.group_id ?? null;
  };

  const getMinorGroupId = (weekId: string): string | null => {
    const assignment = minorAssignments.find((a) => a.week_id === weekId);
    return assignment?.group_id ?? null;
  };

  return (
    <List>
      <IonList>
        {weeks.map((week) => (
          <WeekAssignmentItem
            key={week.id}
            week={week}
            majorGroupId={getMajorGroupId(week.id)}
            minorGroupId={getMinorGroupId(week.id)}
            userGroups={userGroups}
            canEdit={canEdit}
            onMajorChange={setMajorAssignment}
            onMinorChange={setMinorAssignment}
            onDeleteMajor={deleteMajorAssignment}
            onDeleteMinor={deleteMinorAssignment}
          />
        ))}
      </IonList>

      {weeks.length === 0 && (
        <Text color="medium" className="ion-text-center">
          No weeks available
        </Text>
      )}
    </List>
  );
};
