import { Tabs } from "expo-router";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { AppIcon } from "@/components/icon";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { APP_COLORS } from "@/constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => null,
        tabBarActiveTintColor: APP_COLORS.primary,
        // tabBarBackground:
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "Jakarta-Medium",
          },
          tabBarIcon: ({ color }) => {
            const isFocused = useIsFocused();
            return (
              <AppIcon
                name="home"
                type="Ionicons"
                size={28}
                color={isFocused ? APP_COLORS.primary : color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="news"
        options={{
          headerShown: false,
          tabBarLabel: "News",
          tabBarLabelStyle: {
            fontFamily: "Jakarta-Medium",
          },
          tabBarIcon: ({ color }) => {
            const isFocused = useIsFocused();
            return (
              <AppIcon
                name="newsletter"
                type="Entypo"
                size={28}
                color={isFocused ? APP_COLORS.primary : color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="event"
        options={{
          headerShown: false,
          tabBarLabel: "Event",
          tabBarLabelStyle: {
            fontFamily: "Jakarta-Medium",
          },
          tabBarIcon: ({ color }) => {
            const isFocused = useIsFocused();
            return (
              <AppIcon
                name="calendar"
                type="Ionicons"
                size={28}
                color={isFocused ? APP_COLORS.primary : color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="video"
        options={{
          headerShown: false,
          tabBarLabel: "Video",
          tabBarLabelStyle: {
            fontFamily: "Jakarta-Medium",
          },
          tabBarIcon: ({ color }) => {
            const isFocused = useIsFocused();
            return (
              <AppIcon
                name="folder-video"
                type="Entypo"
                size={26}
                color={isFocused ? APP_COLORS.primary : color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="banner"
        options={{
          headerShown: false,
          tabBarLabel: "Banner",
          tabBarLabelStyle: {
            fontFamily: "Jakarta-Medium",
          },
          tabBarIcon: ({ color }) => {
            const isFocused = useIsFocused();
            return (
              <AppIcon
                name="folder-images"
                type="Entypo"
                size={26}
                color={isFocused ? APP_COLORS.primary : color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
