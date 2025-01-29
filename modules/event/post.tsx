import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Formik, FormikProps } from "formik";
import { AppTextInput } from "@/components/input/text";
import { AppButton } from "@/components/button";
import * as Yup from "yup";
import AppImagePicker from "@/components/image/picker";
import { ApiService } from "@/services/api";
import { FileUtility } from "@/utils/file";
import { router } from "expo-router";

const FormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function PostNews({ event }: any) {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const create = async (values: any) => {
    if (image) {
      setLoading(true);
      const blob: any = await FileUtility.uriToBlob(image.uri);
      console.log(blob?._data);
      const file: any = {
        uri: image?.uri,
        name: blob?._data?.name,
        type: blob?._data?.type,
        size: blob?._data?.size,
        lastModified: new Date().getTime(),
      };

      const formData = new FormData();
      formData.append("post_title", values?.title);
      formData.append("post_content", values?.description);
      formData.append("post_type", "Event");
      formData.append("imageFile", file);
      formData.append("post_slug", values?.title?.replace(" ", "-"));
      formData.append("post_author_code", "at001");
      formData.append("post_status", "Published");
      formData.append("comment_status", "Open");
      formData.append("approve_comment", "closed");

      ApiService.post("/news/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res?.data);
          router.back();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.request);
          setLoading(false);
        });
    }
  };

  const update = async (values: any) => {
    const formData = new FormData();
    setLoading(true);

    if (image) {
      const blob: any = await FileUtility.uriToBlob(image.uri);
      console.log(blob?._data);
      const file: any = {
        uri: image?.uri,
        name: blob?._data?.name,
        type: blob?._data?.type,
        size: blob?._data?.size,
        lastModified: new Date().getTime(),
      };

      formData.append("imageFile", file);
    }

    formData.append("post_title", values?.title);
    formData.append("post_content", values?.description);
    formData.append("post_slug", values?.title?.replace(" ", "-"));
    formData.append("post_type", "Event");
    formData.append("post_author_code", "at001");
    formData.append("post_status", "Published");
    formData.append("comment_status", "Open");
    formData.append("approve_comment", "closed");

    ApiService.post(`/news/update/${event?.code}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res?.data);
      router.back();
      setLoading(false);
    })
    .catch((err) => {
      console.log(err.request);
      setLoading(false);
    });
  };

  const handleSubmit = (values: any) => {
    if (event) {
      update(values);
    } else {
      create(values);
    }
  };

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          title: event ? event?.post_title : "",
          description: event ? event?.post_content : "",
        }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <KeyboardAvoidingView className="flex-1">
            {/* <ScrollView contentContainerClassName="flex-1"> */}
            <View className="flex-1 justify-between">
              <ScrollView>
                <View className="flex-1 p-5">
                  <AppTextInput
                    value={event?.post_title || ""}
                    placeholder="Enter event title"
                    label="Title"
                    name="title"
                    autoCapitalize="none"
                  />

                  <AppTextInput
                    value={event?.post_content || ""}
                    name="description"
                    textarea
                    label="Content"
                    containerClassName="my-4"
                    placeholder="Enter event content"
                  />

                  <AppImagePicker setImage={setImage} image={image} />
                </View>
              </ScrollView>

              <View className="bg-white border-t border-gray-100 p-5">
                <AppButton loading={loading} title="Post" onPress={() => props?.handleSubmit()} />
              </View>
            </View>
            {/* </ScrollView> */}
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}
