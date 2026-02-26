import type { Event } from "@tanstack-db/event/eventSchema";
import { getWeekIdFromDate } from "@date/getWeekIdFromDate";
import { CircuitAssemblyCard } from "./CircuitAssemblyCard";
import { ConventionCard } from "./ConventionCard";
import { MemorialCard } from "./MemorialCard";
import { CircuitVisitCard } from "./CircuitVisitCard";
import { SpecialMeetingCard } from "./SpecialMeetingCard";
import { CampaignCard } from "./CampaignCard";
import { SpecialTalkCard } from "./SpecialTalkCard";
import { OtherEventCard } from "./OtherEventCard";

type Props = {
  event: Event;
};

export const EventCard: React.FC<Props> = ({ event }) => {
  switch (event.type) {
    case "circuit_assembly":
      return <CircuitAssemblyCard event={event} />;
    case "convention":
      return <ConventionCard event={event} />;
    case "memorial":
      return <MemorialCard event={event} />;
    case "circuit_visit":
      return <CircuitVisitCard week_id={getWeekIdFromDate(event.start_date)} />;
    case "special_meeting":
      return <SpecialMeetingCard event={event} />;
    case "campaign":
      return <CampaignCard event={event} />;
    case "special_talk":
      return <SpecialTalkCard event={event} />;
    case "other":
      return <OtherEventCard event={event} />;
    default:
      return <OtherEventCard event={event} />;
  }
};
