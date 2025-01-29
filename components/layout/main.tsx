import React, { ReactNode } from "react";
import AppHeader from "../header";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { APP_COLORS, images } from "@/constants";
import { AppIcon } from "../icon";
import { useAuthContext } from "@/context/auth";

interface IProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
}

export default function MainLayout({ children, title, subTitle }: IProps) {

  return (
    <>
      <StatusBar backgroundColor={APP_COLORS.primary} />

      {/* {loading ? (
       <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#16a34a" size={50} />
        </View>
      ) : ( */}
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1">
            <View className="flex items-center justify-between flex-row pr-5">
              <AppHeader title={title} subTitle={subTitle} />
              <Image
                source={images.appIcon}
                className="w-[50px] h-[50px] rounded-lg"
              />

              {/* <TouchableOpacity onPress={signOut} className="items-center justify-center bg-primary w-[40px] h-[40px] mt-5 mr-3 rounded-full">
                <AppIcon
                  name="logout"
                  type="AntDesign"
                  color="#fff"
                  size={20}
                />
              </TouchableOpacity> */}
            </View>

            <View className="bg-gray-100 p-5 flex-1">
              {children}
            </View>
          </View>
        </SafeAreaView>
      {/* )} */}
    </>
  );
}
