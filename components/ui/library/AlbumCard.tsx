import { router } from 'expo-router';
import { Music } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../../constants/theme';
import { Album } from '../../../types';

const CARD_W = (Dimensions.get('window').width - 48 - 12) / 2;

interface Props {
  album: Album;
}

export function AlbumCard({ album }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
      onPress={() => router.push(`/album/${album.id}`)}
    >
      <View style={styles.artwork}>
        <Music size={36} color={Colors.accentDim} strokeWidth={1.5} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{album.title}</Text>
        <Text style={styles.count}>{album.trackCount} tracks</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  artwork: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  info: {
    padding: Spacing.sm + 2,
    gap: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  count: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
