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
  prayer_1: "Midweek Opening Prayer",
  treasures: "Treasures",
  gems: "Gems",
  school_1_bible_reading: "Bible Reading",
  school_1_apply_1: "Apply Yourself 1",
  school_1_assistant_1: "Assistant 1",
  school_1_apply_2: "Apply Yourself 2",
  school_1_assistant_2: "Assistant 2",
  school_1_apply_3: "Apply Yourself 3",
  school_1_assistant_3: "Assistant 3",
  school_1_apply_4: "Apply Yourself 4",
  school_1_assistant_4: "Assistant 4",
  chairman_2: "Counselor (Second School)",
  school_2_bible_reading: "Bible Reading (Second School)",
  school_2_apply_1: "Apply Yourself 1 (Second School)",
  school_2_assistant_1: "Assistant 1 (Second School)",
  school_2_apply_2: "Apply Yourself 2 (Second School)",
  school_2_assistant_2: "Assistant 2 (Second School)",
  school_2_apply_3: "Apply Yourself 3 (Second School)",
  school_2_assistant_3: "Assistant 3 (Second School)",
  school_2_apply_4: "Apply Yourself 4 (Second School)",
  school_2_assistant_4: "Assistant 4 (Second School)",
  chairman_3: "Chairman (Third School)",
  school_3_bible_reading: "Bible Reading (Third School)",
  school_3_apply_1: "Apply Yourself 1 (Third School)",
  school_3_assistant_1: "Assistant 1 (Third School)",
  school_3_apply_2: "Apply Yourself 2 (Third School)",
  school_3_assistant_2: "Assistant 2 (Third School)",
  school_3_apply_3: "Apply Yourself 3 (Third School)",
  school_3_assistant_3: "Assistant 3 (Third School)",
  school_3_apply_4: "Apply Yourself 4 (Third School)",
  school_3_assistant_4: "Assistant 4 (Third School)",
  living_1: "Living as Christians",
  living_2: "Living as Christians",
  cbs_conductor: "CBS Conductor",
  cbs_reader: "CBS Reader",
  prayer_2: "Midweek Closing Prayer",

  // Weekend assignments
  chairman: "Chairman",
  reader: "Watchtower Reader",
  speaker: "Public Talk",

  // AV assignments - Midweek
  video_midweek: "Video Operator (Midweek)",
  audio_midweek: "Audio Operator (Midweek)",
  platform_midweek: "Platform (Midweek)",
  microphone_1_midweek: "Microphone (Midweek)",
  microphone_2_midweek: "Microphone (Midweek)",
  entrance_midweek: "Entrance Attendant (Midweek)",
  auditorium_midweek: "Auditorium Attendant (Midweek)",
  zoom_midweek: "Zoom Attendant (Midweek)",

  // AV assignments - Weekend
  video_weekend: "Video Operator (Weekend)",
  audio_weekend: "Audio Operator (Weekend)",
  platform_weekend: "Platform (Weekend)",
  microphone_1_weekend: "Microphone (Weekend)",
  microphone_2_weekend: "Microphone (Weekend)",
  entrance_weekend: "Entrance Attendant (Weekend)",
  auditorium_weekend: "Auditorium Attendant (Weekend)",
  zoom_weekend: "Zoom Attendant (Weekend)",
};
