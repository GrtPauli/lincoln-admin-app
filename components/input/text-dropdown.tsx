import React from "react";
import { View } from "react-native";
import { AppTextInput } from "./text";
import { AppDropdownInput } from "./dropdown";

interface IProps {
  inputLabel: string;
  inputName: string;
  dropdownName: string;
  dropdownOptions: any[];
}

export default function AppTextDropdownInput({
  dropdownOptions,
  dropdownName,
  inputLabel,
  inputName,
}: IProps) {
  return (
    <View className="flex-row justify-between items-end">
      <AppTextInput containerClassName="w-[63%]" name={inputName} label={inputLabel} />
      <AppDropdownInput
      containerClassname="w-[33%]"
        items={dropdownOptions}
        name={dropdownName}
      />
    </View>
  );
}
