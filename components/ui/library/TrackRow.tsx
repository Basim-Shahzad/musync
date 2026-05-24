import { Music } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { formatTime } from '../../../lib/utils';
import { Track } from '../../../types';

interface Props {
  track: Track;
  index: number;
  isActive?: boolean;
  isPlaying?: boolean;
  onPress: () => void;
}

export function TrackRow({ track, index, isActive, isPlaying, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        isActive && styles.activeRow,
        { opacity: pressed ? 0.75 : 1 },
      ]}
      onPress={onPress}
    >
      {/* Number / Playing indicator */}
      <View style={styles.indexContainer}>
        {isActive && isPlaying ? (
          <View style={styles.playingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        ) : (
          <Text style={[styles.index, isActive && styles.activeIndex]}>{index + 1}</Text>
        )}
      </View>

      {/* Icon */}
      <View style={[styles.icon, isActive && styles.activeIcon]}>
        <Music size={16} color={isActive ? Colors.accent : Colors.textMuted} strokeWidth={1.5} />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.title, isActive && styles.activeTitle]} numberOfLines={1}>
          {track.title}
        </Text>
        {track.artist && (
          <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
        )}
      </View>

      {/* Duration */}
      {track.duration && (
        <Text style={styles.duration}>{formatTime(track.duration)}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    borderRadius: Radius.sm,
    marginHorizontal: Spacing.md,
    marginVertical: 1,
  },
  activeRow: {
    backgroundColor: Colors.accentGlow,
  },
  indexContainer: {
    width: 24,
    alignItems: 'center',
  },
  index: {
    fontSize: 13,
    color: Colors.textMuted,
    fontVariant: ['tabular-nums'],
    fontWeight: '500',
  },
  activeIndex: {
    color: Colors.accent,
  },
  playingDots: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'flex-end',
    height: 14,
  },
  dot: {
    width: 3,
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
  dot1: { height: 8 },
  dot2: { height: 14 },
  dot3: { height: 10 },
  icon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeIcon: {
    backgroundColor: Colors.accentGlow,
    borderColor: 'rgba(200,169,110,0.25)',
  },
  info: { flex: 1 },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  activeTitle: {
    color: Colors.accent,
    fontWeight: '600',
  },
  artist: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    color: Colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
});
