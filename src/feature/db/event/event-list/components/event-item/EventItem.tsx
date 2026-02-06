import type { FC } from "react";
import type { Event } from "@tanstack-db/event/eventSchema";
import { CircuitAssemblyItem } from "./components/circuit-assembly-item/CircuitAssemblyItem";
import { ConventionItem } from "./components/convention-item/ConventionItem";
import { MemorialItem } from "./components/memorial-item/MemorialItem";
import { CircuitVisitItem } from "./components/circuit-visit-item/CircuitVisitItem";
import { SpecialMeetingItem } from "./components/special-meeting-item/SpecialMeetingItem";
import { SpecialTalkItem } from "./components/special-talk-item/SpecialTalkItem";
import { CampaignItem } from "./components/campaign-item/CampaignItem";
import { OtherEventItem } from "./components/other-event-item/OtherEventItem";

type Props = {
  event: Event;
};

export const EventItem: FC<Props> = ({ event }) => {
  switch (event.type) {
    case "circuit_assembly":
      return <CircuitAssemblyItem event={event} />;
    case "convention":
      return <ConventionItem event={event} />;
    case "memorial":
      return <MemorialItem event={event} />;
    case "circuit_visit":
      return <CircuitVisitItem event={event} />;
    case "special_meeting":
      return <SpecialMeetingItem event={event} />;
    case "special_talk":
      return <SpecialTalkItem event={event} />;
    case "campaign":
      return <CampaignItem event={event} />;
    case "other":
      return <OtherEventItem event={event} />;
  }
};
