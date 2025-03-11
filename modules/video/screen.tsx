import { AppButton } from "@/components/button";
import AppFloatingActionButton from "@/components/button/fab";
import { AppIcon } from "@/components/icon";
import MainLayout from "@/components/layout/main";
import { AppText } from "@/components/typography";
import { APP_COLORS } from "@/constants";
import { ApiService } from "@/services/api";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
// import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoScreen() {
  const router = useRouter()
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    video: "",
  });
  const [delLoading, setDelLoading] = useState(false);

  const fetchVideos = () => {
    ApiService.get("/videos/display/all")
      .then((res) => {
        console.log(res?.data?.data);
        setVideos(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchVideos();
    }, [])
  );

  const handleDelete = () => {
    setDelLoading(true);
    ApiService.get(`/video/delete/${deleteModal?.video}`)
      .then((res) => {
        console.log(res?.data);
        setDelLoading(false);
        setDeleteModal({ video: "", show: false });
        fetchVideos();
      })
      .catch((err) => {
        console.log(err);
        setDelLoading(false);
      });
  };

  const parseLink = (url: any) => {
    try {
      // Match video ID from YouTube URL
      const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null; // Return the video ID or null if no match
    } catch (error) {
      console.error("Invalid URL:", url);
      return null;
    }
  }

  return (
    <MainLayout title="Video" subTitle="Manage all videos">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={APP_COLORS.primary} size={40} />
        </View>
      ) : (
        <>
          <ScrollView>
            {videos?.map((item) => {
              console.log("Extracted Video ID:", parseLink(item?.youtube_link));

              return (
                <View
                className="mb-5 bg-blac rounded-2xl overflow-hidden"
                key={item?.id}
              >
                <YoutubePlayer
                  height={180}
                  play={false}
                  videoId={parseLink(item?.youtube_link)}
                />

                {/* <WebView
                  style={{ flex: 1, borderRadius: 20 }}
                  source={{
                    uri: `https://www.youtube.com/embed/${parseLink(item?.youtube_link)}`,
                  }}
                  originWhitelist={["*"]}
                  javaScriptEnabled
                  domStorageEnabled
                  allowsFullscreenVideo
                /> */}

                <View className="bg-white p-5 flex-row justify-between items-center">
                  <AppText className="w-[80%]">{item?.title}</AppText>

                  <TouchableOpacity
                    onPress={() => {
                      setDeleteModal({ video: item?.code, show: true });
                    }}
                    className="bg-primary rounded-lg w-[30px] h-[30px] items-center justify-center"
                  >
                    <AppIcon
                      name="trash-2"
                      type="Feather"
                      size={18}
                      color={"#fff"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              )
            })}
          </ScrollView>

          <AppFloatingActionButton
            onPress={() => {
              router.push({
                pathname: "/create",
                params: {
                  type: "VIDEO",
                  title: "Post Video",
                  subTitle: "Upload latest video content",
                },
              });
            }}
            icon={<AppIcon name="plus" type="Feather" color="#fff" />}
          />
        </>
      )}

      <ReactNativeModal
        isVisible={deleteModal.show}
        onModalHide={() => {
          setDeleteModal({ video: "", show: false });
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[200px] justify-between">
          <>
            <View className="flex-row items-center gap-3 mb-2">
              <AppIcon
                name="warning"
                type="Entypo"
                color={APP_COLORS.primary}
              />

              <AppText font="bold" size="2xl">
                Confirm Delete
              </AppText>
            </View>

            <AppText>Are you sure you want to delete ?</AppText>
          </>

          <View className="flex-row w-full mt-5 justify-between">
            <AppButton
              loading={delLoading}
              onPress={handleDelete}
              title="Yes"
              className="w-[48%]"
            />

            <AppButton
              disabled={delLoading}
              onPress={() => {
                !delLoading && setDeleteModal({ video: "", show: false });
              }}
              title="No"
              className="w-[48%]"
            />
          </View>
        </View>
      </ReactNativeModal>
    </MainLayout>
  );
}
