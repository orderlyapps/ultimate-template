import { useRef } from "react";
import { createTransaction } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";

interface UseDeleteOutgoingSpeakerAssignmentResult {
  /** Execute the delete transaction to remove the assignment */
  executeDelete: (params: {
    weekId: string;
    congregationId: string;
  }) => Promise<void>;
}

/**
 * Hook to create a transaction for deleting an outgoing speaker assignment.
 * Used by the sliding delete option on OutgoingSpeakerItem.
 */
export const useDeleteOutgoingSpeakerAssignment =
  (): UseDeleteOutgoingSpeakerAssignmentResult => {
    const txRef = useRef<ReturnType<typeof createTransaction> | null>(null);

    const getTransaction = () => {
      if (!txRef.current) {
        txRef.current = createTransaction({
          autoCommit: false,
          mutationFn: async ({ transaction }) => {
            const deleteMutation = transaction.mutations.find(
              (m) => m.type === "delete",
            );

            if (deleteMutation?.original) {
              const original = deleteMutation.original as {
                week_id: string;
                congregation_id: string;
              };
              await supabase
                .from("speaker_assignment")
                .delete()
                .eq("week_id", original.week_id)
                .eq("congregation_id", original.congregation_id);
            }

            // Sync server state back to local cache so live queries update
            await speakerAssignmentCollection.utils.refetch();
          },
        });
      }
      return txRef.current;
    };

    const executeDelete = async ({
      weekId,
      congregationId,
    }: {
      weekId: string;
      congregationId: string;
    }) => {
      const tx = getTransaction();

      tx.mutate(() => {
        const key = weekId + congregationId;
        speakerAssignmentCollection.delete(key);
      });

      await tx.commit();
      txRef.current = null;
    };

    return { executeDelete };
  };
