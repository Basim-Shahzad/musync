import { DBError } from "../../types";

const DB_NAME = "MusyncDB";
const DB_VERSION = 1;

// ============================================================================
// Error Handling
// ============================================================================

class DatabaseError implements DBError {
   name = "DatabaseError";
   code: string;
   originalError?: Error;

   constructor(message: string, code: string, originalError?: Error) {
      this.message = message;
      this.code = code;
      this.originalError = originalError;
   }
   message: string;
   stack?: string | undefined;
   cause?: unknown;

   toString(): string {
      return `[${this.code}] ${this.message}`;
   }
}

export function handleDBError(error: unknown, operation: string): DatabaseError {
   const message = error instanceof Error ? error.message : "Unknown database error";
   console.error(`Database ${operation} failed:`, error);
   return new DatabaseError(message, `DB_${operation.toUpperCase()}`, error);
}

// ============================================================================
// Database Connection
// ============================================================================

let cachedDB: IDBDatabase | null = null;

/**
 * Opens or returns cached IndexedDB connection
 * Initializes object stores on first run
 */
export async function openDB(): Promise<IDBDatabase> {
   // Return cached connection if available
   if (cachedDB && !cachedDB.closed) {
      return cachedDB;
   }

   return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
         reject(handleDBError(request.error, "open"));
      };

      request.onsuccess = () => {
         cachedDB = request.result;
         resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
         const db = (event.target as IDBOpenDBRequest).result;

         // Create tracks object store
         if (!db.objectStoreNames.contains("tracks")) {
            db.createObjectStore("tracks", { keyPath: "id" });
         }

         // Create playlists object store
         if (!db.objectStoreNames.contains("playlists")) {
            db.createObjectStore("playlists", { keyPath: "id" });
         }
      };

      request.onblocked = () => {
         console.warn("Database blocked: close other tabs/windows running this app");
      };
   });
}

/**
 * Closes database connection and clears cache
 */
export function closeDB(): void {
   if (cachedDB) {
      cachedDB.close();
      cachedDB = null;
   }
}
