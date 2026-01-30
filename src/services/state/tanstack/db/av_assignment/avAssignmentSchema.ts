import { z } from "zod";

export const midweekAVAssignmentIDs = [
  "video_midweek",
  "audio_midweek",
  "platform_midweek",
  "microphone_1_midweek",
  "microphone_2_midweek",
  "entrance_midweek",
  "auditorium_midweek",
  "zoom_midweek",
] as const;

export const weekendAVAssignmentIDs = [
  "video_weekend",
  "audio_weekend",
  "platform_weekend",
  "microphone_1_weekend",
  "microphone_2_weekend",
  "entrance_weekend",
  "auditorium_weekend",
  "zoom_weekend",
] as const;

export const avAssignmentIDs = [
  ...midweekAVAssignmentIDs,
  ...weekendAVAssignmentIDs,
] as const;

export const avAssignmentIDSchema = z.union(
  avAssignmentIDs.map((option) => z.literal(option)),
);

export type AVAssignmentID = z.infer<typeof avAssignmentIDSchema>;

export const avAssignmentSchema = z.object({
  assignment_id: avAssignmentIDSchema,
  week_id: z.string(),
  congregation_id: z.uuid(),
  participant_id: z.uuid(),
});

export type AVAssignment = z.infer<typeof avAssignmentSchema>;
