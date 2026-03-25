import { useEffect } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { and, eq } from "@tanstack/react-db";
import { PublicTalkSelect } from "./components/public-talk-select/PublicTalkSelect";
import { useWeekendMeetingEditStore } from "./store/useWeekendMeetingEditStore";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { formatPublisherName } from "@format/formatPublisherName";
import { WeekEvents } from "@feature/db/shared/week-events/WeekEvents";
import { WeekendAssignmentsList } from "./components/weekend-assignments-list/WeekendAssignmentsList";

type WeekendMeetingEditFormProps = {
  weekId: string;
};

export const WeekendMeetingEditForm: React.FC<WeekendMeetingEditFormProps> = ({
  weekId,
}) => {
  const setWeekId = useWeekendMeetingEditStore((s) => s.setWeekId);
  const setCongregationId = useWeekendMeetingEditStore(
    (s) => s.setCongregationId,
  );
  const setHasCurrentAssignment = useWeekendMeetingEditStore(
    (s) => s.setHasCurrentAssignment,
  );
  const congregation = getUserCongregation();

  const congregationId = congregation ? congregation.id : null;

  useEffect(() => {
    setWeekId(weekId);
    setCongregationId(congregationId);
  }, [weekId, congregationId, setWeekId, setCongregationId]);

  const { data: currentAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ sa, p }) =>
          eq(sa.speaker_id, p!.id),
        )
        .leftJoin({ o: outlineCollection }, ({ sa, o }) =>
          eq(sa.outline_id, o!.id),
        )
        .leftJoin({ c: congregationCollection }, ({ p, c }) =>
          eq(p?.congregation_id, c!.id),
        )
        .where(({ sa }) =>
          and(
            eq(sa.week_id, weekId),
            eq(sa.congregation_id, congregationId ?? ""),
          ),
        )
        .select(({ sa, p, o, c }) => ({
          speakerId: sa.speaker_id,
          outlineId: sa.outline_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
          speakerCongregationId: p?.congregation_id,
          congregationName: c?.name,
          outlineTheme: o?.theme,
        })),
    [weekId, congregationId],
  );

  const currentAssignment = currentAssignments?.[0];

  useEffect(() => {
    setHasCurrentAssignment(!!currentAssignment);
  }, [currentAssignment, setHasCurrentAssignment]);

  const speakerName = formatPublisherName(
    currentAssignment?.first_name && currentAssignment?.last_name
      ? {
          first_name: currentAssignment.first_name,
          last_name: currentAssignment.last_name,
          display_name: currentAssignment.display_name,
        }
      : undefined,
    "display last",
  );

  return (
    <>
      <WeekEvents weekId={weekId} meetingType="weekend" />
      <WeekendAssignmentsList weekId={weekId} />
      <PublicTalkSelect
        speakerId={currentAssignment?.speakerId}
        outlineId={currentAssignment?.outlineId}
        speakerName={speakerName}
        outlineTheme={currentAssignment?.outlineTheme}
        congregationName={currentAssignment?.congregationName}
        isLocalSpeaker={
          currentAssignment?.speakerCongregationId === congregationId
        }
      />
    </>
  );
};
