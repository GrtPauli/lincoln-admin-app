import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Formik, FormikProps } from "formik";
import { AppTextInput } from "@/components/input/text";
import { AppButton } from "@/components/button";
import * as Yup from "yup";
import { ApiService } from "@/services/api";
import { router } from "expo-router";

const FormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  youtube_link: Yup.string().required("Youtube link is required"),
});

export default function PostVideo() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
      setLoading(true)

      ApiService.post("/video/add", values)
      .then((res) => {
        console.log(res?.data);
        router.back()
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.request);
        setLoading(false);
      });
  };

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          title: "",
          youtube_link: "",
        }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <KeyboardAvoidingView className="flex-1">
            <View className="flex-1 justify-between">
              <ScrollView>
                <View className="flex-1 p-5 gap-5">
                  <AppTextInput placeholder="Enter video title" label="Title" name="title" autoCapitalize="none" />
                  <AppTextInput placeholder="Enter video youtube link" label="Youtube Link" name="youtube_link" autoCapitalize="none" />
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
