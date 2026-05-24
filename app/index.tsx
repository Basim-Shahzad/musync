import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/ui/home/Header";
import { SegmentedTabs } from "../components/ui/home/SegmentedTabs";

const Index = () => {
   const [activeTab, setActiveTab] = useState("playlists");

   return (
      <View style={styles.container}>
         <Stack.Screen options={{ headerShown: false }} />

         <Header title="My Music" songCount={10} />

         <SegmentedTabs activeTab={activeTab} onTabChange={setActiveTab} />

         {/* Content based on tab would go here */}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#000000",
   },
});

export default Index;
