import { AppButton } from "@/components/button";
import AppFloatingActionButton from "@/components/button/fab";
import AppCard from "@/components/container/card";
import { AppIcon } from "@/components/icon";
import MainLayout from "@/components/layout/main";
import { AppText } from "@/components/typography";
import { APP_COLORS } from "@/constants";
import { ApiService, BACKEND_BASE_URL } from "@/services/api";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";

export default function EventScreen() {
  const router = useRouter();
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    banner: "",
  });
  const [delLoading, setDelLoading] = useState(false);

  const fetchBanners = () => {
    ApiService.get("/sliders/display/all")
      .then((res) => {
        console.log(res?.data?.data);
        setBanners(res?.data?.data);
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
      fetchBanners();
    }, [])
  );

  const handleDelete = () => {
    setDelLoading(true);
    ApiService.get(`/slider/delete/${deleteModal?.banner}`)
      .then((res) => {
        console.log(res?.data);
        setDelLoading(false);
        setDeleteModal({ banner: "", show: false });
        fetchBanners();
      })
      .catch((err) => {
        console.log(err);
        setDelLoading(false);
      });
  };

  return (
    <MainLayout title="Banners" subTitle="View and manage all banners">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={APP_COLORS.primary} size={40} />
        </View>
      ) : (
        <>
          <ScrollView contentContainerClassName="gap-5">
            {banners?.map((item) => (
              <View className="mb-5 bg-blac rounded-2xl overflow-hidden" key={item?.id}>
                <Image
                  source={{
                    uri: `${BACKEND_BASE_URL}/images/sliders/${item?.image_url}`
                  }}
                  className="h-[200px]"
                />
                <View className="bg-white p-5">
                  <View className="flex-row justify-between items-center">
                    <AppText className="w-[80%]">{item?.title}</AppText>

                    <TouchableOpacity
                      onPress={() => {
                        setDeleteModal({ banner: item?.code, show: true });
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

                  {(item?.link && item?.link !== "") && (
                    <Link style={{fontFamily: 'Jakarta-Medium', color: APP_COLORS.primary, marginTop: 10}} href={item?.link}>
                      {item?.link}
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          <AppFloatingActionButton
            onPress={() => {
              router.push({
                pathname: "/create",
                params: {
                  type: "BANNER",
                  title: "Post Banner",
                  subTitle: "Upload latest banner content",
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
          setDeleteModal({ banner: "", show: false });
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
                !delLoading && setDeleteModal({ banner: "", show: false });
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
