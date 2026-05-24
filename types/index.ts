export interface Track {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  duration?: number; // seconds
  uri: string; // local file URI
  albumId: string; // folder/album it belongs to
  artworkUri?: string;
  filename: string;
  createdAt: number;
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
  position: number; // seconds
  duration: number; // seconds
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  queue: Track[];
  queueIndex: number;
}
