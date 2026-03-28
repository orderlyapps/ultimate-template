import { rxdb } from "@state/rxdb/database";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";

export async function exportPublisherLocalData(): Promise<Blob> {
  const docs = await rxdb.publisher.find().exec();
  const data = docs.map((doc) => doc.toJSON());
  const json = JSON.stringify(data, null, 2);
  return new Blob([json], { type: "application/json" });
}

export async function importPublisherLocalData(file: File): Promise<void> {
  const text = await file.text();
  const data: PublisherLocal[] = JSON.parse(text);

  if (!Array.isArray(data)) {
    throw new Error("Invalid file format: expected an array of publishers");
  }

  await rxdb.publisher.find().remove();

  await rxdb.publisher.bulkInsert(data);
}

export function generateExportFilename(): string {
  const date = new Date().toISOString().split("T")[0];
  return `publisher-local-${date}.json`;
}
