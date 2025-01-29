import AppHeader from "@/components/header";
import { AppIcon } from "@/components/icon";
import MainLayout from "@/components/layout/main";
import { APP_COLORS } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostNews from "../news/post";
import PostEvent from "../event/post";
import PostVideo from "../video/post";
import PostBanner from "../banner/post";
import PostNotice from "../home/notice/post";

enum Entity {
  NEWS = "NEWS",
  EVENT = "EVENT",
  VIDEO = "VIDEO",
  BANNER = "BANNER",
  NOTICE = "NOTICE"
}

export default function CreateEntityScreen() {
  const params: any = useLocalSearchParams()
  
  return (
    <>
      <StatusBar backgroundColor={APP_COLORS.primary} />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex items-center flex-row px-5">
          <TouchableOpacity onPress={() => router.back()} className="bg-primary rounded-full w-[40px] h-[40px] justify-center items-center">
            <AppIcon
            type="AntDesign"
              name="arrowleft"
              color="#fff"
            />
          </TouchableOpacity>
          <AppHeader title={params?.title} subTitle={params?.subTitle} />
        </View>

        <View className="bg-gray-100 flex-1">
          {params?.type == Entity.NEWS && (
            <PostNews news={params?.data ? JSON.parse(params?.data) : null}/>
          )}

          {params?.type == Entity.EVENT && (
            <PostEvent event={params?.data ? JSON.parse(params?.data) : null}/>
          )}
          
          {params?.type == Entity.VIDEO && (
            <PostVideo/>
          )}

          {params?.type == Entity.BANNER && (
            <PostBanner/>
          )}

          {params?.type == Entity.NOTICE && (
            <PostNotice notice={params?.data ? JSON.parse(params?.data) : null}/>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
