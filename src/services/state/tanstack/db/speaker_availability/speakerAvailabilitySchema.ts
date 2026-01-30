import { z } from "zod";

export const speakerAvailabilitySchema = z.object({
  speaker_id: z.string().uuid(),
  availability: z.number().int(), // smallint
});

export type SpeakerAvailability = z.infer<typeof speakerAvailabilitySchema>;
