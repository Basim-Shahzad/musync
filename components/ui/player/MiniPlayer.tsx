import { router } from 'expo-router';
import { Pause, Play, SkipForward } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../lib/utils';

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, skipNext, position, duration } = usePlayer();

  if (!currentTrack) return null;

  const progress = duration > 0 ? position / duration : 0;

  return (
    <Pressable style={styles.container} onPress={() => router.push(`/album/${currentTrack.albumId}`)}>
      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.inner}>
        {/* Track info */}
        <View style={styles.thumbnail}>
          <Text style={styles.thumbnailText}>♪</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
          <Text style={styles.meta}>{formatTime(position)} · {formatTime(duration)}</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.6 : 1 }]}
            onPress={(e) => { e.stopPropagation(); togglePlay(); }}
          >
            {isPlaying
              ? <Pause size={20} color={Colors.text} strokeWidth={2.5} fill={Colors.text} />
              : <Play size={20} color={Colors.text} strokeWidth={2.5} fill={Colors.text} />
            }
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.6 : 1 }]}
            onPress={(e) => { e.stopPropagation(); skipNext(); }}
          >
            <SkipForward size={20} color={Colors.textSecondary} strokeWidth={2.5} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  progressBg: {
    height: 2,
    backgroundColor: Colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thumbnailText: { fontSize: 18 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.text, letterSpacing: -0.2 },
  meta: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  controls: { flexDirection: 'row', gap: 4 },
  btn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
