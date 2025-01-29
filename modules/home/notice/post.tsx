import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Formik, FormikProps } from "formik";
import { AppTextInput } from "@/components/input/text";
import { AppButton } from "@/components/button";
import * as Yup from "yup";
import { ApiService } from "@/services/api";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { AppText } from "@/components/typography";
import { APP_COLORS } from "@/constants";

const FormSchema = Yup.object().shape({
  notice: Yup.string().required("Notice is required"),
  link: Yup.string().required("Link is required"),
});

export default function PostNotice({ notice }: any) {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState<any>(null);
  console.log(notice);
  

  const create = (values: any) => {
    setLoading(true);

    ApiService.post("/shortnotice/add", {
      ...values,
      status: isActive ? "active" : "unactive"
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
  
  const update = (values: any) => {
    setLoading(true);

    ApiService.post("/shortnotice/update", {
      id: notice.id,
      ...values,
      status: isActive ? "active" : "unactive"
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

  const handleSubmit = async (values: any) => {
    if(notice){
      update(values)
    } else {
      create(values)
    }
  };

  useEffect(() => {
    if(notice){
      setIsActive(notice?.status == "unactive" ? false : true)
    } else {
      setIsActive(true)
    }
  }, [notice])

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          notice: notice ? notice?.notice :  "",
          link: notice ? notice.link : "",
        }}
        enableReinitialize
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <KeyboardAvoidingView className="flex-1">
            <View className="flex-1 justify-between">
              <ScrollView>
                <View className="flex-1 p-5 gap-5">
                  <AppTextInput
                    placeholder="Enter notice title"
                    label="Notice"
                    name="notice"
                    autoCapitalize="none"
                    value={notice?.notice || ""}
                  />

                  <AppTextInput
                    placeholder="Enter notice link"
                    label="Link"
                    name="link"
                    autoCapitalize="none"
                    value={notice?.link || ""}
                  />

                  <View className="flex-row items-center gap-2 mt-2">
                    <Checkbox
                      style={{borderRadius: 5, height: 18, width: 18}}
                      color={APP_COLORS.primary}
                      value={isActive}
                      onValueChange={setIsActive}
                    />

                    <AppText font="medium" size="base">Active</AppText>
                  </View>
                </View>
              </ScrollView>

              <View className="bg-white border-t border-gray-100 p-5">
                <AppButton
                  loading={loading}
                  title="Post"
                  onPress={() => props?.handleSubmit()}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}
