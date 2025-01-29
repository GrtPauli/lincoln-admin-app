import { APP_COLORS, images } from "@/constants";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { AppText } from "../typography";
import { AppIcon } from "../icon";
import { BACKEND_BASE_URL } from "@/services/api";

export default function AppCard({ onEdit, item, onDelete, onReadMore, imageUri }: any) {

  return (
    <View className="bg-white rounded-xl relative">
      <View className="absolute top-3 z-10 right-3 flex-row gap-3">
        <TouchableOpacity onPress={onEdit} className="bg-white rounded-lg w-[30px] h-[30px] items-center justify-center">
          <AppIcon
            name="edit-3"
            type="Feather"
            size={18}
            color={APP_COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} className="bg-white rounded-lg w-[30px] h-[30px] items-center justify-center">
          <AppIcon
            name="trash-2"
            type="Feather"
            size={18}
            color={APP_COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: imageUri,
        }}
        className="h-[200px] text-gray-400 w-full overflow-hidden rounded-t-xl"
        resizeMode="cover"
      />

      <View className="p-5">
        <AppText font="semibold">{item?.post_title}</AppText>

        <View className="flex-row items-center gap-2 mt-2">
          <AppIcon
            color="#9ca3af"
            size={18}
            type="FontAwesome5"
            name="calendar-day"
          />
          
          <AppText size="sm" color="#9ca3af" font="medium">
            Date Posted : {item?.post_date}
          </AppText>
        </View>

        <View className="mt-2 flex-row justify-end">
          <TouchableOpacity onPress={onReadMore} className="flex-row items-center">
            <AppText size="sm" color={APP_COLORS.primary}>
              Read More
            </AppText>

            <AppIcon
              name="chevron-small-right"
              type="Entypo"
              className="mt-[3px]"
              color={APP_COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
