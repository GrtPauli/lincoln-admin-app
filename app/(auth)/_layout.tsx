import { APP_COLORS } from "@/constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from 'react'

export default function AuthLayout() {

  return (
    <>
      <StatusBar backgroundColor={APP_COLORS.primary}/>
      <Stack>
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
