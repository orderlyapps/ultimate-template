import { z } from "zod";

export const avParticipationIDOptions = [
  "video",
  "audio",
  "platform",
  "microphone",
  "entrance",
  "auditorium",
  "zoom",
] as const;

export const avParticipationIDSchema = z.union(
  avParticipationIDOptions.map((option) => z.literal(option)),
);

export type AVParticipationID = z.infer<typeof avParticipationIDSchema>;

export const avParticipationSchema = z.object({
  participation_id: avParticipationIDSchema,
  participant_id: z.uuid(),
});

export type AVParticipation = z.infer<typeof avParticipationSchema>;
