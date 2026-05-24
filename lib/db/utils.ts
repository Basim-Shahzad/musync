import { Playlist, Track } from "@/types";
import { getStorageSize } from "./blobs";
import { handleDBError } from "./db";
import { clearDatabase, getAllPlaylists, savePlaylist } from "./playlists";
import { getAllTracks, saveTrack } from "./tracks";

// ============================================================================
// Database Utilities
// ============================================================================

export interface DBStats {
   trackCount: number;
   playlistCount: number;
   totalStorageSize: number;
   timestamp: number;
}

/**
 * Gets comprehensive database statistics
 */
export async function getDatabaseStats(): Promise<DBStats> {
   try {
      const [tracks, playlists, storageSize] = await Promise.all([getAllTracks(), getAllPlaylists(), getStorageSize()]);

      return {
         trackCount: tracks.length,
         playlistCount: playlists.length,
         totalStorageSize: storageSize,
         timestamp: Date.now(),
      };
   } catch (error) {
      throw handleDBError(error, "getDatabaseStats");
   }
}

/**
 * Exports database as JSON (for backup/debugging)
 */
export async function exportDatabase(): Promise<{
   tracks: Track[];
   playlists: Playlist[];
   exportedAt: number;
}> {
   try {
      const [tracks, playlists] = await Promise.all([getAllTracks(), getAllPlaylists()]);

      // Note: Blob objects are not serializable to JSON
      // Consider storing blob URLs or removing blob data before export
      const sanitizedTracks = tracks.map(({ blob, ...rest }) => rest);

      return {
         tracks: sanitizedTracks,
         playlists,
         exportedAt: Date.now(),
      };
   } catch (error) {
      throw handleDBError(error, "exportDatabase");
   }
}

/**
 * Imports database from exported JSON
 * WARNING: This will overwrite existing data
 */
export async function importDatabase(data: { tracks: Omit<Track, "blob">[]; playlists: Playlist[] }): Promise<void> {
   try {
      // Clear existing data
      await clearDatabase();

      // Import playlists
      for (const playlist of data.playlists) {
         await savePlaylist(playlist);
      }

      // Import tracks
      for (const track of data.tracks) {
         await saveTrack(track as Track);
      }
   } catch (error) {
      throw handleDBError(error, "importDatabase");
   }
}
