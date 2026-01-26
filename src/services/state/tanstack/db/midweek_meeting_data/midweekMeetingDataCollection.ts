import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { midweekMeetingDataSchema } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataSchema";

export const midweekMeetingDataCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["midweek_meeting_data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("midweek_meeting_data")
        .select("*");

      if (error) {
        throw new Error(
          `Failed to fetch midweek meeting data: ${error.message}`,
        );
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.week_id,
    schema: midweekMeetingDataSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("midweek_meeting_data").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("midweek_meeting_data")
        .update(changes)
        .eq("week_id", original.week_id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("midweek_meeting_data")
        .delete()
        .eq("week_id", original.week_id);
    },
  }),
);
