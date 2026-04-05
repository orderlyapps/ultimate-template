import type { MidweekAssignmentID } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import type { AVAssignmentID } from "@tanstack-db/av_assignment/avAssignmentSchema";

type AssignmentTitle =
  | MidweekAssignmentID
  | WeekendAssignmentID
  | AVAssignmentID
  | "speaker";

export const assignmentLabels: Record<AssignmentTitle, string> = {
  // Midweek assignments
  chairman_1: "Chairman",
  prayer_1: "Opening Prayer",
  treasures: "Treasures",
  gems: "Gems",
  school_1_bible_reading: "Bible Reading",
  school_1_apply_1: "Apply Yourself (No. 4)",
  school_1_assistant_1: "Apply Assistant",
  school_1_apply_2: "Apply Yourself (No.5)",
  school_1_assistant_2: "Apply Assistant",
  school_1_apply_3: "Apply Yourself (No. 6)",
  school_1_assistant_3: "Apply Assistant",
  school_1_apply_4: "Apply Yourself (No. 7)",
  school_1_assistant_4: "Apply Assistant",
  chairman_2: "Counselor (Second School)",
  school_2_bible_reading: "Bible Reading (Second School)",
  school_2_apply_1: "Apply Yourself (No. 4) (Second School)",
  school_2_assistant_1: "Apply Assistant (Second School)",
  school_2_apply_2: "Apply Yourself (No.5) (Second School)",
  school_2_assistant_2: "Apply Assistant (Second School)",
  school_2_apply_3: "Apply Yourself (No. 6) (Second School)",
  school_2_assistant_3: "Apply Assistant (Second School)",
  school_2_apply_4: "Apply Yourself (No. 7) (Second School)",
  school_2_assistant_4: "Apply Assistant (Second School)",
  chairman_3: "Chairman (Third School)",
  school_3_bible_reading: "Bible Reading (Third School)",
  school_3_apply_1: "Apply Yourself (No. 4) (Third School)",
  school_3_assistant_1: "Apply Assistant (Third School)",
  school_3_apply_2: "Apply Yourself (No.5) (Third School)",
  school_3_assistant_2: "Apply Assistant (Third School)",
  school_3_apply_3: "Apply Yourself (No. 6) (Third School)",
  school_3_assistant_3: "Apply Assistant (Third School)",
  school_3_apply_4: "Apply Yourself (No. 7) (Third School)",
  school_3_assistant_4: "Apply Assistant (Third School)",
  living_1: "Living as Christians",
  living_2: "Living as Christians",
  cbs_conductor: "CBS Conductor",
  cbs_reader: "CBS Reader",
  prayer_2: "Closing Prayer",

  // Weekend assignments
  chairman: "Chairman",
  reader: "Watchtower Reader",
  speaker: "Public Talk",

  // AV assignments - Midweek
  video_midweek: "Video Operator",
  audio_midweek: "Audio Operator",
  platform_midweek: "Platform",
  microphone_1_midweek: "Microphone",
  microphone_2_midweek: "Microphone",
  entrance_midweek: "Entrance Attendant",
  auditorium_midweek: "Auditorium Attendant",
  zoom_midweek: "Zoom Attendant",

  // AV assignments - Weekend
  video_weekend: "Video Operator",
  audio_weekend: "Audio Operator",
  platform_weekend: "Platform",
  microphone_1_weekend: "Microphone",
  microphone_2_weekend: "Microphone",
  entrance_weekend: "Entrance Attendant",
  auditorium_weekend: "Auditorium Attendant",
  zoom_weekend: "Zoom Attendant",
};
