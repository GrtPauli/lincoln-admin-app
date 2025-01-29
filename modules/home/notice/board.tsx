import { AppButton } from "@/components/button";
import { AppIcon } from "@/components/icon";
import { AppText } from "@/components/typography";
import { APP_COLORS } from "@/constants";
import { ApiService } from "@/services/api";
import { Link, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import Popover from "react-native-popover-view";

export default function NoticeBoard({ notices, refetch }: any) {
  const router = useRouter()
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    notice: "",
  });
  const [delLoading, setDelLoading] = useState(false);
  console.log(notices);
  
  const handleDelete = () => {
    setDelLoading(true);
     ApiService.post(`/shortnotice/delete`, {
      id: deleteModal?.notice
     })
    .then((res) => {
        console.log(res?.data);
        setDelLoading(false);
        setDeleteModal({ notice: "", show: false });
        refetch();
    })
    .catch((err) => {
        console.log(err);
        setDelLoading(false);
    });
  };

  return (
    <>
      <View className="bg-gray-800 p-5 rounded-xl min-h-[300px]">
        <View className="flex-row justify-between">
          <View>
            <AppText color="#fff" size="2xl" font="bold">
              Notice Board
            </AppText>
            <View className="w-[60%] bg-white h-[8px] rounded-full mt-3"></View>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/create",
                params: {
                  type: "NOTICE",
                  title: "Post Notice",
                  subTitle: "Upload latest notice content",
                },
              });
            }}
            className="bg-primary w-[40px] h-[40px] items-center justify-center rounded-full"
          >
            <AppIcon name="plus" type="Feather" color="#fff" />
          </TouchableOpacity>
        </View>

        {/* <ScrollView> */}
          <View className="mt-5">
            {notices?.map((item: any, i: any) => (
              <NoticeItem
                key={item?.id}
                onDelete={() =>
                  setDeleteModal({ notice: item?.id, show: true })
                }
                onEdit={() => {
                  router.push({
                    pathname: "/create",
                    params: {
                      type: "NOTICE",
                      title: "Edit Notice",
                      subTitle: "Edit this notice content",
                      data: JSON.stringify(item)
                    },
                  });
                }}
                item={item}
                i={i}
              />
            ))}
          </View>
        {/* </ScrollView> */}
      </View>

      <ReactNativeModal
        isVisible={deleteModal.show}
        onModalHide={() => {
          setDeleteModal({ notice: "", show: false });
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
                !delLoading && setDeleteModal({ notice: "", show: false });
              }}
              title="No"
              className="w-[48%]"
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}

const NoticeItem = ({ item, i, onDelete, onEdit }: any) => {
  const [visible, setVisible] = useState(false);
  const touchableRef = useRef(null);

  return (
    <View className="mb-3 flex-row justify-between">
      <View>
        <AppText color="#fff">
          {i + 1}. {item?.notice}
        </AppText>

        <Link
          className="text-white mt-1"
          style={{ fontFamily: "Jakarta-Medium" }}
          href={item?.link}
        >
          {item?.link}
        </Link>
      </View>

      <TouchableOpacity
        ref={touchableRef}
        onPress={() => setVisible(true)}
        className="mt-1"
      >
        <AppIcon
          name="more-vert"
          type="MaterialIcons"
          size={25}
          color={"#fff"}
        />
      </TouchableOpacity>

      <Popover
        isVisible={visible}
        from={touchableRef}
        onRequestClose={() => setVisible(false)}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              onDelete();
            }}
            className="flex-row items-center gap-2 mb-1 px-5 py-2"
          >
            <AppIcon
              name="trash-2"
              type="Feather"
              size={18}
              color={"#000"}
              className="mt-0.5"
            />
            <AppText>Delete</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              onEdit();
            }}
            className="flex-row items-center gap-2 border-t px-5 py-2 border-gray-400"
          >
            <AppIcon
              name="edit-3"
              type="Feather"
              size={18}
              color={"#000"}
              className="mt-0.5"
            />
            <AppText>Edit</AppText>
          </TouchableOpacity>
        </View>
      </Popover>
    </View>
  );
};
