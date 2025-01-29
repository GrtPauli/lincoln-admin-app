import { AppButton } from "@/components/button";
import { AppIcon } from "@/components/icon";
import { AppText } from "@/components/typography";
import { BACKEND_BASE_URL } from "@/services/api";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventDetailScreen() {
  const params = useLocalSearchParams();
  const event = JSON.parse(params?.event as any);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white justify-end">
        <ImageBackground
          className="z-0 w-full h-[250px] absolute top-0"
          source={{
            uri: `${BACKEND_BASE_URL}/images/news/${event?.post_image_url}`,
          }}
          resizeMode="cover"
        >
          <View style={styles.overlay} className="p-5">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white rounded-full w-[40px] h-[40px] justify-center items-center"
            >
              <AppIcon type="AntDesign" name="arrowleft" color="#ef4444" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        
        <View className="h-[75%]">
          <View className="bg-white flex-1 rounded-tl-[50px] pl-8 pr-5 pt-8">
            <ScrollView contentContainerClassName="pr-5" persistentScrollbar className="flex-1">
              <AppText size="xl" font="bold">
                {event?.post_title}
              </AppText>
              <AppText
                color="#9ca3af"
                size="base"
                font="semibold"
                className="mb-5 mt-2 text-gray-400"
              >
                {event?.post_date}
              </AppText>

              <AppText size="base">{event?.post_content}</AppText>
            </ScrollView>
          </View>

          <View className="flex-row w-full mt-5 justify-between p-5 border-t border-gray-200">
              <AppButton
                title="Edit"
                className="w-full"
                onPress={() => {
                  router.push({
                    pathname: "/create",
                    params: {
                      type: "EVENT",
                      title: "Edit Event",
                      subTitle: "Edit this event content",
                      data: JSON.stringify(event)
                    },
                  });
                }}
              />
              
              {/* <AppButton
                title="Delete"
                className="w-[48%]"
              /> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});