import { handleDBError } from "./db";
import { getAllTracks, getTrack } from "./tracks";

// ============================================================================
// Blob Operations
// ============================================================================

/**
 * Creates a playable blob URL for a track
 * WARNING: Remember to revoke URLs when done with URL.revokeObjectURL()
 */
export async function getTrackBlobURL(trackId: string): Promise<string | null> {
   try {
      const track = await getTrack(trackId);

      if (track?.blob) {
         return URL.createObjectURL(track.blob);
      }

      return track?.url || null;
   } catch (error) {
      throw handleDBError(error, "getTrackBlobURL");
   }
}

/**
 * Releases a blob URL from memory
 */
export function revokeTrackBlobURL(url: string): void {
   try {
      URL.revokeObjectURL(url);
   } catch (error) {
      console.warn("Failed to revoke blob URL:", error);
   }
}

/**
 * Gets the total size of all blobs in storage (in bytes)
 */
export async function getStorageSize(): Promise<number> {
   try {
      const allTracks = await getAllTracks();
      let totalSize = 0;

      allTracks.forEach((track) => {
         if (track.blob) {
            totalSize += track.blob.size;
         }
      });

      return totalSize;
   } catch (error) {
      throw handleDBError(error, "getStorageSize");
   }
}

/**
 * Checks if storage is available and has space
 */
export async function checkStorageAvailability(): Promise<{
   available: boolean;
   estimatedQuota?: number;
   estimatedUsage?: number;
}> {
   try {
      if (!navigator.storage || !navigator.storage.estimate) {
         return { available: false };
      }

      const estimate = await navigator.storage.estimate();

      return {
         available: true,
         estimatedQuota: estimate.quota,
         estimatedUsage: estimate.usage,
      };
   } catch (error) {
      console.warn("Failed to check storage availability:", error);
      return { available: false };
   }
}

/**
 * Requests persistent storage permission
 */
export async function requestPersistentStorage(): Promise<boolean> {
   try {
      if (!navigator.storage || !navigator.storage.persist) {
         return false;
      }

      return await navigator.storage.persist();
   } catch (error) {
      console.warn("Failed to request persistent storage:", error);
      return false;
   }
}
