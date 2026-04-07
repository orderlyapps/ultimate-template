import { useRef, useCallback } from "react";
import { createTransaction } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";

interface UseCongregationChangeTransactionResult {
  /** Execute the delete and insert as a single transaction */
  executeChange: (params: {
    weekId: string;
    speakerId: string;
    currentCongregationId: string | null;
    newCongregation: Congregation;
    outlineId: string | null;
  }) => Promise<void>;
}

/**
 * Hook to create a transaction for changing a speaker's target congregation.
 * Batches the delete of the old assignment and insert of the new one.
 */
export const useCongregationChangeTransaction = (): UseCongregationChangeTransactionResult => {
  const txRef = useRef<ReturnType<typeof createTransaction> | null>(null);

  const getTransaction = useCallback(() => {
    if (!txRef.current) {
      txRef.current = createTransaction({
        autoCommit: false,
        mutationFn: async ({ transaction }) => {
          const deleteMutation = transaction.mutations.find(
            (m) => m.type === "delete",
          );
          const insertMutation = transaction.mutations.find(
            (m) => m.type === "insert",
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

          if (insertMutation?.changes) {
            await supabase
              .from("speaker_assignment")
              .insert(insertMutation.changes);
          }
        },
      });
    }
    return txRef.current;
  }, []);

  const executeChange = useCallback(
    async ({
      weekId,
      speakerId,
      currentCongregationId,
      newCongregation,
      outlineId,
    }: {
      weekId: string;
      speakerId: string;
      currentCongregationId: string | null;
      newCongregation: Congregation;
      outlineId: string | null;
    }) => {
      const tx = getTransaction();

      tx.mutate(() => {
        if (currentCongregationId) {
          const oldKey = weekId + currentCongregationId;
          speakerAssignmentCollection.delete(oldKey);
        }
        speakerAssignmentCollection.insert({
          week_id: weekId,
          speaker_id: speakerId,
          congregation_id: newCongregation.id,
          outline_id: outlineId,
        });
      });

      await tx.commit();
      txRef.current = null;
    },
    [getTransaction],
  );

  return { executeChange };
};
