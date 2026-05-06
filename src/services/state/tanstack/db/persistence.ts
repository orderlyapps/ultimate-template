import {
  BrowserCollectionCoordinator,
  createBrowserWASQLitePersistence,
  openBrowserWASQLiteOPFSDatabase,
} from "@tanstack/browser-db-sqlite-persistence";

const DB_NAME = "tanstack-db";

// Shared OPFS-backed SQLite database used by all persisted TanStack DB
// collections in this app. Top-level await is supported by Vite + ESM.
//
// OPFS may be unavailable (older browsers, sandboxed iframes, some
// private-browsing modes). We surface the error to the console so the failure
// is visible during bootstrap and rethrow so callers fail fast rather than
// silently running without persistence.
let database: Awaited<ReturnType<typeof openBrowserWASQLiteOPFSDatabase>>;
try {
  database = await openBrowserWASQLiteOPFSDatabase({
    databaseName: `${DB_NAME}.sqlite`,
  });
} catch (error) {
  console.error(
    "Failed to open OPFS-backed SQLite database for TanStack DB persistence. " +
      "The current browser/context likely does not support OPFS.",
    error
  );
  throw error;
}

// Multi-tab safe coordinator: uses BroadcastChannel + Web Locks so only one
// tab/process owns the SQLite writer. Without this, concurrent tabs would
// corrupt the shared OPFS database.
const coordinator = new BrowserCollectionCoordinator({ dbName: DB_NAME });

// Shared persistence instance reused across every collection that opts into
// persistence.
export const persistence = createBrowserWASQLitePersistence({
  database,
  coordinator,
});

// Dispose coordinator + close database on Vite HMR teardown to avoid leaking
// BroadcastChannel subscriptions, Web Lock handles, and the OPFS worker.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    coordinator.dispose?.();
    void database.close?.();
  });
}
