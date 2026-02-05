import { useState } from "react";
import { IonButton } from "@ionic/react";
import type { AVAssignment } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";
import type { MidweekAssignment } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { SpeakerAssignment } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";
import type { WeekendAssignment } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { useHomeItems } from "./useHomeItems";
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

  const getVisibleItems = () => {
    if (displayMode === "all") return items;
    const limit = displayMode === "initial" ? 2 : 4;
    return items.slice(0, limit);
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

  const showButton = items.length > 2 || displayMode !== "initial";

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
