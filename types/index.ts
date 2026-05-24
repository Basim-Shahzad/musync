export interface Track {
   id: string;
   title: string;
   artist?: string;
   album?: string;
   duration?: number;
   uri: string;
   albumId: string;
   playlistId?: string;
   artworkUri?: string;
   filename: string;
   createdAt: number;
   blob?: Blob;
   url?: string;
}

export interface Playlist {
   id: string;
   title: string;
}

export interface Album {
   id: string;
   title: string;
   artist?: string;
   trackCount: number;
   artworkUri?: string;
   addedAt: number;
}

export interface PlayerState {
   currentTrack: Track | null;
   currentAlbumTracks: Track[];
   isPlaying: boolean;
   position: number;
   duration: number;
   shuffle: boolean;
   repeat: "none" | "one" | "all";
   queue: Track[];
   queueIndex: number;
}
