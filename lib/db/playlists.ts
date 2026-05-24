import { Playlist } from "@/types";
import { handleDBError, openDB } from "./db";
import { deleteTracksByPlaylist } from "./tracks";

// ============================================================================
// Playlist Operations
// ============================================================================

/**
 * Saves or updates a playlist
 */
export async function savePlaylist(playlist: Playlist): Promise<void> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("playlists", "readwrite");
         const request = transaction.objectStore("playlists").put(playlist);

         transaction.oncomplete = () => {
            resolve();
         };

         transaction.onerror = () => {
            reject(handleDBError(transaction.error, "savePlaylist"));
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "savePlaylist"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "savePlaylist");
   }
}

/**
 * Retrieves a single playlist by ID
 */
export async function getPlaylist(id: string): Promise<Playlist | undefined> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("playlists", "readonly");
         const request = transaction.objectStore("playlists").get(id);

         request.onsuccess = () => {
            resolve(request.result as Playlist | undefined);
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "getPlaylist"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "getPlaylist");
   }
}

/**
 * Retrieves all playlists from the database
 */
export async function getAllPlaylists(): Promise<Playlist[]> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("playlists", "readonly");
         const request = transaction.objectStore("playlists").getAll();

         request.onsuccess = () => {
            resolve((request.result as Playlist[]) || []);
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "getAllPlaylists"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "getAllPlaylists");
   }
}

/**
 * Deletes a playlist and all associated tracks
 */
export async function deletePlaylist(id: string): Promise<void> {
   try {
      // Delete all tracks associated with this playlist first
      await deleteTracksByPlaylist(id);

      const db = await openDB();

      return new Promise((resolve, reject) => {
         const transaction = db.transaction("playlists", "readwrite");
         const request = transaction.objectStore("playlists").delete(id);

         transaction.oncomplete = () => {
            resolve();
         };

         transaction.onerror = () => {
            reject(handleDBError(transaction.error, "deletePlaylist"));
         };

         request.onerror = () => {
            reject(handleDBError(request.error, "deletePlaylist"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "deletePlaylist");
   }
}

/**
 * Clears all playlists and tracks from the database
 */
export async function clearDatabase(): Promise<void> {
   try {
      const db = await openDB();

      return new Promise((resolve, reject) => {
         const trackTransaction = db.transaction("tracks", "readwrite");
         const playlistTransaction = db.transaction("playlists", "readwrite");

         const trackClear = trackTransaction.objectStore("tracks").clear();
         const playlistClear = playlistTransaction.objectStore("playlists").clear();

         let completed = 0;

         const checkComplete = () => {
            completed++;
            if (completed === 2) {
               resolve();
            }
         };

         trackTransaction.oncomplete = checkComplete;
         playlistTransaction.oncomplete = checkComplete;

         trackTransaction.onerror = () => {
            reject(handleDBError(trackTransaction.error, "clearDatabase"));
         };

         playlistTransaction.onerror = () => {
            reject(handleDBError(playlistTransaction.error, "clearDatabase"));
         };

         trackClear.onerror = () => {
            reject(handleDBError(trackClear.error, "clearDatabase"));
         };

         playlistClear.onerror = () => {
            reject(handleDBError(playlistClear.error, "clearDatabase"));
         };
      });
   } catch (error) {
      throw handleDBError(error, "clearDatabase");
   }
}
