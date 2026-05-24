import { Track } from "@/types";
import { handleDBError, openDB } from "./db";

// ============================================================================
// Track Operations
// ============================================================================

/**
 * Saves or updates a track in the database
 */
export async function saveTrack(track: Track): Promise<void> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("tracks", "readwrite");
         const request = transaction.objectStore("tracks").put(track);

         transaction.oncomplete = () => {
            resolve();
         };

         transaction.onerror = () => {
            reject(handleDBError(transaction.error, "saveTrack"));
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "saveTrack"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "saveTrack");
   }
}

/**
 * Retrieves a single track by ID
 */
export async function getTrack(id: string): Promise<Track | undefined> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("tracks", "readonly");
         const request = transaction.objectStore("tracks").get(id);

         request.onsuccess = () => {
            resolve(request.result as Track | undefined);
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "getTrack"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "getTrack");
   }
}

/**
 * Retrieves all tracks from the database
 */
export async function getAllTracks(): Promise<Track[]> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("tracks", "readonly");
         const request = transaction.objectStore("tracks").getAll();

         request.onsuccess = () => {
            resolve((request.result as Track[]) || []);
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "getAllTracks"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "getAllTracks");
   }
}

/**
 * Retrieves all tracks for a specific playlist
 */
export async function getPlaylistTracks(playlistId: string): Promise<Track[]> {
   try {
      const allTracks = await getAllTracks();
      return allTracks.filter((track) => track.playlistId === playlistId);
   } catch (error) {
      throw handleDBError(error, "getPlaylistTracks");
   }
}

/**
 * Deletes a single track by ID
 */
export async function deleteTrack(id: string): Promise<void> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("tracks", "readwrite");
         const request = transaction.objectStore("tracks").delete(id);

         transaction.oncomplete = () => {
            resolve();
         };

         transaction.onerror = () => {
            reject(handleDBError(transaction.error, "deleteTrack"));
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "deleteTrack"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "deleteTrack");
   }
}

/**
 * Deletes all tracks associated with a playlist
 */
export async function deleteTracksByPlaylist(playlistId: string): Promise<void> {
   try {
      const db = await openDB();
      const tracksToDelete = await getPlaylistTracks(playlistId);

      if (tracksToDelete.length === 0) {
         return;
      }

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("tracks", "readwrite");
         const store = transaction.objectStore("tracks");

         tracksToDelete.forEach((track) => {
            store.delete(track.id);
         });

         transaction.oncomplete = () => {
            resolve();
         };

         transaction.onerror = () => {
            reject(handleDBError(transaction.error, "deleteTracksByPlaylist"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "deleteTracksByPlaylist");
   }
}

/**
 * Clears all tracks from the database
 */
export async function clearAllTracks(): Promise<void> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("tracks", "readwrite");
         const request = transaction.objectStore("tracks").clear();

         transaction.oncomplete = () => {
            resolve();
         };

         transaction.onerror = () => {
            reject(handleDBError(transaction.error, "clearAllTracks"));
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "clearAllTracks"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "clearAllTracks");
   }
}
