import { eq, useLiveQuery } from "@tanstack/react-db";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";

/**
 * Hook to fetch all outlines assigned to a specific publisher (speaker).
 * Joins speaker_outline with outline to return full Outline objects.
 *
 * @param publisher_id - The UUID of the publisher whose outlines to fetch
 * @returns outlines - Array of Outline objects assigned to the publisher, sorted by theme
 */
export const usePublisherOutlines = (publisher_id: string | null | undefined) => {
  const { data } = useLiveQuery((q) =>
    q
      .from({ so: speakerOutlineCollection })
      .join({ o: outlineCollection }, ({ so, o }) => eq(so.outline_id, o.id))
      .where(({ so }) => eq(so.speaker_id, publisher_id ?? ""))
      .select(({ o }) => ({
        id: o.id,
        theme: o.theme,
      }))
      .orderBy(({ o }) => o.theme),
  );

  return { outlines: data ?? [] };
};
