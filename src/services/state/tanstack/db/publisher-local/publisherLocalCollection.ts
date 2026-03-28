import { rxdb } from "@state/rxdb/database";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const publisherLocalCollection = createCollection(
  rxdbCollectionOptions({
    rxCollection: rxdb.publisher,
    startSync: true,
  }),
);
