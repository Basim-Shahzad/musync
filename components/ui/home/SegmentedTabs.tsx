import { ListMusic, Music } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const SegmentedTabs = ({
   activeTab,
   onTabChange,
}: {
   activeTab: string;
   onTabChange: (tab: string) => void;
}) => {
   return (
      <View style={styles.container}>
         <View style={styles.tabContainerOuter}>
            <TabItem
               label="Playlists"
               icon={<ListMusic size={18} strokeWidth={2.5} color={activeTab === "playlists" ? "#FFF" : "#8E8E93"} />}
               isActive={activeTab === "playlists"}
               onPress={() => onTabChange("playlists")}
            />
            <TabItem
               label="All Tracks"
               icon={<Music size={18} strokeWidth={2.5} color={activeTab === "allTracks" ? "#FFF" : "#8E8E93"} />}
               isActive={activeTab === "allTracks"}
               onPress={() => onTabChange("allTracks")}
            />
         </View>
      </View>
   );
};

const TabItem = ({
   label,
   icon,
   isActive,
   onPress,
}: {
   label: string;
   icon: React.ReactNode;
   isActive: boolean;
   onPress: () => void;
}) => (
   <Pressable style={[styles.tabButton, isActive && styles.activeTabButton]} onPress={onPress}>
      {icon}
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{label}</Text>
   </Pressable>
);

const styles = StyleSheet.create({
   container: { paddingHorizontal: 20, paddingBottom: 16 },
   tabContainerOuter: { flexDirection: "row", backgroundColor: "#1C1C1E", borderRadius: 999, padding: 4 },
   tabButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      borderRadius: 999,
      gap: 8,
   },
   activeTabButton: { backgroundColor: "#000", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.08)" },
   tabText: { fontSize: 15, color: "#8E8E93", fontWeight: "600" },
   activeTabText: { color: "#FFFFFF" },
});
