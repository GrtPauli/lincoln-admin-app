import React, { ReactNode, useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import NoticeBoard from "./notice/board";
import MainLayout from "@/components/layout/main";
import { useFocusEffect } from "expo-router";
import { ApiService } from "@/services/api";
import { AppText } from "@/components/typography";
import { AppIcon } from "@/components/icon";
import { APP_COLORS } from "@/constants";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<any[]>([]);
  const [totalNews, setTotalNews] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalBanners, setTotalBanners] = useState(0);

  const fetchHomeData = () => {
    setLoading(true);
    Promise.all([
      ApiService.get("/shortnotice/all"),
      ApiService.get("/news/display/News/all"),
      ApiService.get("/news/display/Event/all"),
      ApiService.get("/videos/display/all"),
      ApiService.get("/sliders/display/all"),
    ])
      .then(
        async ([
          noticeResponse,
          newsResponse,
          eventResponse,
          videoResponse,
          bannerResponse,
        ]) => {
          setNotices(noticeResponse?.data?.data);
          setTotalNews(newsResponse?.data?.data?.length);
          setTotalEvents(eventResponse?.data?.data?.length);
          setTotalVideos(videoResponse?.data?.data?.length);
          setTotalBanners(bannerResponse?.data?.data?.length);
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchHomeData();
    }, [])
  );

  return (
    <MainLayout title="Home" subTitle="Welcome to lincoln's admin">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={APP_COLORS.primary} size={40} />
        </View>
      ) : (
        <>
          <ScrollView>
            <NoticeBoard refetch={fetchHomeData} notices={notices} />

            <View className="mt-5 gap-5">
              <SummaryCard
                icon={
                  <AppIcon
                    name="newsletter"
                    type="Entypo"
                    size={60}
                    color={APP_COLORS.primary}
                    className="mt-2"
                  />
                }
                title="News"
                value={totalNews}
              />

              <SummaryCard
                icon={
                  <AppIcon
                    name="calendar"
                    type="Ionicons"
                    size={60}
                    color={APP_COLORS.primary}
                    className="mt-2"
                  />
                }
                title="Events"
                value={totalEvents}
              />

              <SummaryCard
                icon={
                  <AppIcon
                    name="folder-video"
                    type="Entypo"
                    size={60}
                    color={APP_COLORS.primary}
                    className="mt-2"
                  />
                }
                title="Videos"
                value={totalVideos}
              />

              <SummaryCard
                icon={
                  <AppIcon
                    name="folder-images"
                    type="Entypo"
                    size={60}
                    color={APP_COLORS.primary}
                    className="mt-2"
                  />
                }
                title="Banners"
                value={totalBanners}
              />
            </View>
          </ScrollView>
        </>
      )}
    </MainLayout>
  );
}

interface ISummaryCard {
  icon: ReactNode;
  title: string;
  value: string | number;
}

const SummaryCard = ({ icon, title, value }: ISummaryCard) => {
  return (
    <View className="flex-row items-center gap-5 bg-white rounded-xl p-5">
      {icon}
      <View>
        <AppText size="xl" font="light" className=" mb-2">
          {title}
        </AppText>
        <AppText size="2xl" font="bold">
          {value}
        </AppText>
      </View>
    </View>
  );
};
