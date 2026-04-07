import { useRef } from "react";
import { createTransaction } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";

interface UseSaveOutgoingSpeakerResult {
  /** Execute the save transaction to persist the new assignment */
  executeSave: (params: {
    weekId: string;
    speakerId: string;
    congregationId: string;
    outlineId: string | null;
  }) => Promise<void>;
}

/**
 * Hook to create a transaction for saving a new outgoing speaker assignment.
 */
export const useSaveOutgoingSpeaker =
  (): UseSaveOutgoingSpeakerResult => {
    const txRef = useRef<ReturnType<typeof createTransaction> | null>(null);

    const getTransaction = () => {
      if (!txRef.current) {
        txRef.current = createTransaction({
          autoCommit: false,
          mutationFn: async ({ transaction }) => {
            const insertMutation = transaction.mutations.find(
              (m) => m.type === "insert",
            );

            if (insertMutation?.changes) {
              await supabase
                .from("speaker_assignment")
                .insert(insertMutation.changes);
            }

            // Sync server state back to local cache so live queries update
            await speakerAssignmentCollection.utils.refetch();
          },
        });
      }
      return txRef.current;
    };

    const executeSave = async ({
      weekId,
      speakerId,
      congregationId,
      outlineId,
    }: {
      weekId: string;
      speakerId: string;
      congregationId: string;
      outlineId: string | null;
    }) => {
      const tx = getTransaction();

      tx.mutate(() => {
        speakerAssignmentCollection.insert({
          week_id: weekId,
          speaker_id: speakerId,
          congregation_id: congregationId,
          outline_id: outlineId,
        });
      });

      await tx.commit();
      txRef.current = null;
    };

    return { executeSave };
  };
