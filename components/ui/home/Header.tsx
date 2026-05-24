import { ChevronDown, Plus, Shuffle } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const BUTTON_HEIGHT = 44;

export const Header = ({ title, songCount }: { title: string; songCount: number }) => {
   return (
      <View style={styles.header}>
         <View style={styles.titleContainer}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.subtitle}>1 playlist • {songCount} songs</Text>
         </View>

         <View style={styles.buttonsContainer}>
            {/* Shuffle Button */}
            <Pressable
               style={({ pressed }) => [
                  styles.glassButton,
                  { opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.92 : 1 }] },
               ]}
            >
               <Shuffle color="#FFFFFF" size={18} strokeWidth={2.5} />
            </Pressable>

            {/* Add Button */}
            <Pressable
               style={({ pressed }) => [
                  styles.primaryButtonOuter,
                  { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] },
               ]}
            >
               <View style={styles.primaryButtonInner}>
                  <Plus color="#FFFFFF" size={18} strokeWidth={2.5} />
                  <Text style={styles.addText}>Add</Text>
                  <ChevronDown color="#FFFFFF" size={16} strokeWidth={2.5} />
               </View>
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: 20,
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingBottom: 20,
   },
   titleContainer: { flex: 1, gap: 4 },
   heading: { fontSize: 34, color: "#FFFFFF", fontWeight: "800", letterSpacing: -0.5 },
   subtitle: { fontSize: 15, color: "#8E8E93", fontWeight: "500" },
   buttonsContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
   glassButton: {
      height: BUTTON_HEIGHT,
      width: BUTTON_HEIGHT,
      borderRadius: 999,
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
   },
   primaryButtonOuter: {
      height: BUTTON_HEIGHT,
      borderRadius: 999,
      backgroundColor: "#8B5CF6",
      shadowColor: "#8B5CF6",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.45,
      shadowRadius: 12,
      elevation: 10,
   },
   primaryButtonInner: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      height: "100%",
   },
   addText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginHorizontal: 6 },
});
