import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import { rxdb } from "@state/rxdb/database";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const publisherLocalCollection = createCollection(
  rxdbCollectionOptions<PublisherLocal>({
    rxCollection: rxdb.publisher,
    startSync: true,
  }),
);
