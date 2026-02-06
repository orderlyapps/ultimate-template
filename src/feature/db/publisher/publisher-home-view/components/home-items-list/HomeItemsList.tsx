import { useState } from "react";
import { IonButton } from "@ionic/react";
import type { AVAssignment } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";
import type { MidweekAssignment } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { SpeakerAssignment } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";
import type { WeekendAssignment } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { useHomeItems, type MonthGroup, type WeekGroup } from "./useHomeItems";
import { MonthGroupCard } from "./components/month-group-card/MonthGroupCard";

type DisplayMode = "initial" | "more" | "all";

type Props = {
  weekendAssignments: WeekendAssignment[] | undefined;
  speakerAssignments: SpeakerAssignment[] | undefined;
  midweekAssignments: MidweekAssignment[] | undefined;
  events: Event[] | undefined;
  avAssignments: AVAssignment[] | undefined;
};

export const HomeItemsList: React.FC<Props> = ({
  weekendAssignments,
  speakerAssignments,
  midweekAssignments,
  events,
  avAssignments,
}) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("initial");

  const { items } = useHomeItems({
    weekendAssignments,
    speakerAssignments,
    midweekAssignments,
    avAssignments,
    events,
  });

  const countItemsInWeek = (week: WeekGroup) =>
    week.midweekAssignments.length + week.weekendAssignments.length + week.events.length;

  const countItemsInMonth = (month: MonthGroup) =>
    month.weeks.reduce((sum, week) => sum + countItemsInWeek(week), 0);

  const totalItems = items.reduce((sum, month) => sum + countItemsInMonth(month), 0);

  const getVisibleItems = (): MonthGroup[] => {
    if (displayMode === "all") return items;
    const limit = displayMode === "initial" ? 6 : 12;

    let count = 0;
    const result: MonthGroup[] = [];

    for (const month of items) {
      if (count >= limit) break;

      const filteredWeeks: WeekGroup[] = [];
      for (const week of month.weeks) {
        if (count >= limit) break;

        const weekItemCount = countItemsInWeek(week);
        if (count + weekItemCount <= limit) {
          filteredWeeks.push(week);
          count += weekItemCount;
        } else {
          filteredWeeks.push(week);
          count += weekItemCount;
        }
      }

      if (filteredWeeks.length > 0) {
        result.push({ ...month, weeks: filteredWeeks });
      }
    }

    return result;
  };

  const visibleItems = getVisibleItems();

  const handleToggle = () => {
    if (displayMode === "initial") {
      setDisplayMode("more");
    } else if (displayMode === "more") {
      setDisplayMode("all");
    } else {
      setDisplayMode("initial");
    }
  };

  const getButtonLabel = () => {
    if (displayMode === "initial") return "Show More";
    if (displayMode === "more") return "Show All";
    return "Show Less";
  };

  const showButton = totalItems > 6 || displayMode !== "initial";

  return (
    <>
      {visibleItems.map((item) => (
        <div key={item.monthId}>
          <MonthGroupCard monthGroup={item} />
        </div>
      ))}
      {showButton && (
        <IonButton expand="block" fill="clear" onClick={handleToggle}>
          {getButtonLabel()}
        </IonButton>
      )}
    </>
  );
};
