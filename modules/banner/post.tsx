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
});

export default function PostBanner() {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    if (image) {
      setLoading(true)
      const blob: any = await FileUtility.uriToBlob(image.uri);
      const file: any = {
        uri: image?.uri,
        name: blob?._data?.name,
        type: blob?._data?.type,
        size: blob?._data?.size,
        lastModified: new Date().getTime(),
      };

      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("link", values?.link);
      formData.append("imageFile", file);

      ApiService.post("/slider/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res?.data);
        router.back()
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.request);
        setLoading(false);
      });
    }
  };

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          title: "",
          link: "",
        }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <KeyboardAvoidingView className="flex-1">
            <View className="flex-1 justify-between">
              <ScrollView>
                <View className="flex-1 p-5 gap-5">
                  <AppTextInput placeholder="Enter banner title" label="Title" name="title" autoCapitalize="none" />
                  <AppTextInput placeholder="Enter banner link" label="Link" name="link" autoCapitalize="none" />

                  <AppImagePicker setImage={setImage} image={image} />
                </View>
              </ScrollView>

              <View className="bg-white border-t border-gray-100 p-5">
                <AppButton loading={loading} title="Post" onPress={() => props?.handleSubmit()} />
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}
