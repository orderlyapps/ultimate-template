import { z } from "zod";

export const speakerAssignmentSchema = z.object({
  week_id: z.string(), // date string
  speaker_id: z.string().uuid(),
  congregation_id: z.string().uuid(),
  outline_id: z.string().nullable(),
});

export type SpeakerAssignment = z.infer<typeof speakerAssignmentSchema>;
