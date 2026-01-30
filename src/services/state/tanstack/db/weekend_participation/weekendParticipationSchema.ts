import { z } from "zod";

export const weekendParticipationIDOptions = ["chairman", "reader"] as const;

export const weekendParticipationIDSchema = z.union(
  weekendParticipationIDOptions.map((option) => z.literal(option))
);

export type WeekendParticipationID = z.infer<
  typeof weekendParticipationIDSchema
>;



export const weekendParticipationSchema = z.object({
  participant_id: z.uuid(),
  participation_id: weekendParticipationIDSchema,
});

export type WeekendParticipation = z.infer<typeof weekendParticipationSchema>;
