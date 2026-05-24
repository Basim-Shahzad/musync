import React, { useCallback } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from 'lucide-react-native';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { usePlayer } from '../../../hooks/usePlayer';
import { formatTime } from '../../../lib/utils';

const SCREEN_W = Dimensions.get('window').width;
const ARTWORK_SIZE = SCREEN_W - 64;

export function FullPlayer() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    position,
    duration,
    shuffle,
    repeat,
    togglePlay,
    skipNext,
    skipPrev,
    seek,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const progress = duration > 0 ? position / duration : 0;

  const handleSeekBar = useCallback(
    (e: GestureResponderEvent) => {
      const { locationX, pageX } = e.nativeEvent;
      const barWidth = SCREEN_W - 64;
      const ratio = Math.max(0, Math.min(1, locationX / barWidth));
      seek(ratio * duration);
    },
    [duration, seek]
  );

  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      {/* Artwork */}
      <View style={styles.artwork}>
        <Text style={styles.artworkIcon}>♪</Text>
      </View>

      {/* Track Info */}
      <View style={styles.infoSection}>
        <Text style={styles.title} numberOfLines={2}>{currentTrack.title}</Text>
        {currentTrack.artist && (
          <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
        )}
      </View>

      {/* Seek Bar */}
      <View style={styles.seekSection}>
        <Pressable style={styles.seekBarOuter} onPress={handleSeekBar}>
          <View style={styles.seekBarBg}>
            <View style={[styles.seekBarFill, { width: `${progress * 100}%` }]}>
              <View style={styles.seekThumb} />
            </View>
          </View>
        </Pressable>
        <View style={styles.seekTimes}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* Shuffle */}
        <Pressable style={styles.sideBtn} onPress={toggleShuffle}>
          <Shuffle
            size={22}
            color={shuffle ? Colors.accent : Colors.textSecondary}
            strokeWidth={2}
          />
          {shuffle && <View style={styles.activeIndicator} />}
        </Pressable>

        {/* Prev */}
        <Pressable
          style={({ pressed }) => [styles.skipBtn, { opacity: pressed ? 0.6 : 1 }]}
          onPress={skipPrev}
        >
          <SkipBack size={28} color={Colors.text} strokeWidth={2} fill={Colors.text} />
        </Pressable>

        {/* Play/Pause */}
        <Pressable
          style={({ pressed }) => [styles.playBtn, { opacity: pressed ? 0.85 : 1 }]}
          onPress={togglePlay}
        >
          {isLoading ? (
            <Text style={styles.loadingDot}>···</Text>
          ) : isPlaying ? (
            <Pause size={30} color={Colors.bg} strokeWidth={2.5} fill={Colors.bg} />
          ) : (
            <Play size={30} color={Colors.bg} strokeWidth={2.5} fill={Colors.bg} />
          )}
        </Pressable>

        {/* Next */}
        <Pressable
          style={({ pressed }) => [styles.skipBtn, { opacity: pressed ? 0.6 : 1 }]}
          onPress={skipNext}
        >
          <SkipForward size={28} color={Colors.text} strokeWidth={2} fill={Colors.text} />
        </Pressable>

        {/* Repeat */}
        <Pressable style={styles.sideBtn} onPress={toggleRepeat}>
          {repeat === 'one' ? (
            <Repeat1 size={22} color={Colors.accent} strokeWidth={2} />
          ) : (
            <Repeat
              size={22}
              color={repeat === 'all' ? Colors.accent : Colors.textSecondary}
              strokeWidth={2}
            />
          )}
          {repeat !== 'none' && <View style={styles.activeIndicator} />}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    borderRadius: Radius.xl,
    backgroundColor: Colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 20,
    marginBottom: Spacing.xl,
  },
  artworkIcon: { fontSize: 80, opacity: 0.4 },
  infoSection: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  artist: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  seekSection: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  seekBarOuter: {
    paddingVertical: 10,
  },
  seekBarBg: {
    height: 3,
    backgroundColor: Colors.bgElevated,
    borderRadius: 2,
    overflow: 'visible',
  },
  seekBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'visible',
  },
  seekThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.accent,
    position: 'absolute',
    right: -7,
    top: -5.5,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  seekTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sideBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
    position: 'absolute',
    bottom: 4,
  },
  skipBtn: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  loadingDot: {
    fontSize: 20,
    color: Colors.bg,
    fontWeight: '700',
  },
});
