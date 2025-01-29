import { AppButton } from "@/components/button";
import AppFloatingActionButton from "@/components/button/fab";
import AppCard from "@/components/container/card";
import { AppIcon } from "@/components/icon";
import MainLayout from "@/components/layout/main";
import { AppText } from "@/components/typography";
import { APP_COLORS } from "@/constants";
import { ApiService, BACKEND_BASE_URL } from "@/services/api";
import { useFocusEffect, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";

export default function NewsScreen() {
  const router = useRouter();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    news: "",
  });
  const [delLoading, setDelLoading] = useState(false);

  const fetchNews = () => {
    ApiService.get("/news/display/batch/News/0/4")
      .then((res) => {
        console.log(res?.data?.data);
        setNews(res?.data?.data);
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
      fetchNews();
    }, [])
  );

  const handleDelete = () => {
    setDelLoading(true);
    ApiService.get(`/news/delete/${deleteModal?.news}`)
      .then((res) => {
        console.log(res?.data);
        setDelLoading(false);
        setDeleteModal({ news: "", show: false });
        fetchNews();
      })
      .catch((err) => {
        console.log(err);
        setDelLoading(false);
      });
  };

  return (
    <MainLayout title="News" subTitle="Latest news at your fingertips">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={APP_COLORS.primary} size={40} />
        </View>
      ) : (
        <>
          <ScrollView contentContainerClassName="gap-5">
            {news?.map((item) => (
              <AppCard
                imageUri={`${BACKEND_BASE_URL}/images/news/${item?.post_image_url}`}
                onReadMore={() =>
                  router.push({
                    pathname: `/newsDetail`,
                    params: {
                      news: JSON.stringify(item),
                    },
                  })
                }
                onDelete={() =>
                  setDeleteModal({ news: item?.code, show: true })
                }
                onEdit={() => {
                  router.push({
                    pathname: "/create",
                    params: {
                      type: "NEWS",
                      title: "Edit News",
                      subTitle: "Edit this news content",
                      data: JSON.stringify(item)
                    },
                  });
                }}
                item={item}
                key={item?.id}
              />
            ))}
          </ScrollView>

          <AppFloatingActionButton
            onPress={() => {
              router.push({
                pathname: "/create",
                params: {
                  type: "NEWS",
                  title: "Post News",
                  subTitle: "Upload latest news content",
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
          setDeleteModal({ news: "", show: false });
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
                !delLoading && setDeleteModal({ news: "", show: false });
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
