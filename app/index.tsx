import { useAuthContext } from "@/context/auth";
import LoginScreen from "@/modules/auth/sign-in";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Login() {
  // const { loading, token } = useAuthContext();

  // if (loading) {
  //   return null
  // }

  // if(!token || token == ''){ 
  //   console.log(token);
       
  //   return <Redirect href="/(auth)/sign-in"/>
  // }

  return (
    <Redirect href="/(root)" />
  );
}
