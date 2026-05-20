import { differenceInWeeks, parseISO } from "date-fns";
import { WeekNavigation } from "@ui/components/custom/navigation/week-navigation/WeekNavigation";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { getThisWeekID } from "@util/date/getThisWeekID";
import { useClamAssignmentFormsData } from "./hooks/useClamAssignmentFormsData";
import { StudentPartsList } from "./components/student-parts-list/StudentPartsList";
import { IonLabel } from "@ionic/react";

/**
 * Returns a human-readable label describing how many weeks from the current
 * week the given week_id is, e.g. "This week", "1 week away", "4 weeks away".
 */
function getWeeksFromNowLabel(week_id: string): string {
  const diff = differenceInWeeks(parseISO(week_id), parseISO(getThisWeekID()));
  if (diff === 0) return "This week";
  if (diff === 1) return "1 week away";
  if (diff === -1) return "1 week ago";
  if (diff > 0) return `${diff} weeks away`;
  return `${Math.abs(diff)} weeks ago`;
}

type Props = {
  /** ISO date string (YYYY-MM-DD) for the Monday of the target week */
  week_id: string;
};

/**
 * ClamAssignmentFormsContent - Displays the WeekNavigation, a weeks-from-now
 * label, and student parts (bible reading + AYF) for the selected week.
 */
export function ClamAssignmentFormsContent({ week_id }: Props) {
  const { meeting, participant, hasSecondSchool } =
    useClamAssignmentFormsData(week_id);

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <Item lines="none" className="ion-text-center">
        <IonLabel>
          <Text color="medium" size="sm">
            {getWeeksFromNowLabel(week_id)}
          </Text>
        </IonLabel>
      </Item>
      {meeting && (
        <StudentPartsList
          meeting={meeting}
          participant={participant}
          hasSecondSchool={hasSecondSchool}
        />
      )}
    </>
  );
}
