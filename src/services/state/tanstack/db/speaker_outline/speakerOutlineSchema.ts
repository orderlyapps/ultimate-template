import { z } from "zod";

export const speakerOutlineSchema = z.object({
  speaker_id: z.string().uuid(),
  outline_id: z.string().default(""),
});

export type SpeakerOutline = z.infer<typeof speakerOutlineSchema>;
