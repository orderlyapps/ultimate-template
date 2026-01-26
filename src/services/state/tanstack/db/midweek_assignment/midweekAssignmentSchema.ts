import { z } from "zod";

export const midweekAssignmentIDs = [
  "chairman_1",
  "prayer_1",
  "treasures",
  "gems",
  "school_1_bible_reading",
  "school_1_apply_1",
  "school_1_assistant_1",
  "school_1_apply_2",
  "school_1_assistant_2",
  "school_1_apply_3",
  "school_1_assistant_3",
  "school_1_apply_4",
  "school_1_assistant_4",
  "chairman_2",
  "school_2_bible_reading",
  "school_2_apply_1",
  "school_2_assistant_1",
  "school_2_apply_2",
  "school_2_assistant_2",
  "school_2_apply_3",
  "school_2_assistant_3",
  "school_2_apply_4",
  "school_2_assistant_4",
  "chairman_3",
  "school_3_bible_reading",
  "school_3_apply_1",
  "school_3_assistant_1",
  "school_3_apply_2",
  "school_3_assistant_2",
  "school_3_apply_3",
  "school_3_assistant_3",
  "school_3_apply_4",
  "school_3_assistant_4",
  "living_1",
  "living_2",
  "cbs_conductor",
  "cbs_reader",
  "prayer_2",
] as const;

export const midweekAssignmentIDSchema = z.union(
  midweekAssignmentIDs.map((id) => z.literal(id)),
);

export const midweekAssignmentSchema = z.object({
  participant_id: z.uuid(),
  assignment_id: midweekAssignmentIDSchema,
  congregation_id: z.uuid(),
  week_id: z.string(),
});

export type MidweekAssignmentID = z.infer<typeof midweekAssignmentIDSchema>;

export type MidweekAssignment = z.infer<typeof midweekAssignmentSchema>;
