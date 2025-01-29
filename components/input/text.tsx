import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { AppIcon } from "../icon";
import { AppText } from "../typography";

interface IProps extends TextInputProps {
  label?: React.ReactNode;
  labelStyle?: TextStyle;
  name: string;
  placeholder?: string;
  value?: string;
  suffix?: React.ReactNode;
  containerStyle?: StyleProp<TextStyle>;
  containerClassName?: string | undefined;
  inputStyle?: StyleProp<TextStyle>;
  ignoreFormik?: boolean;
  noKeyboard?: boolean;
  inputClassName?: string;
  editable?: boolean;
  onChange?: (val: any) => void;
  textarea?: boolean
}

export const AppTextInput: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    label,
    suffix,
    placeholder,
    inputStyle,
    editable,
    noKeyboard,
    ignoreFormik,
    inputClassName,
    containerStyle,
    containerClassName,
    textarea
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props?.value || "");
  const fieldHelper = ignoreFormik ? null : useField(name);
  const inputRef: any = useRef(null);

  useEffect(() => {
    setValue(props?.value || "");
  }, [props.value]);

  const handleFocus = () => {
    if (noKeyboard) {
      inputRef.current.blur();
    }
  };

  return (
    // <KeyboardAvoidingView>
      <View style={containerStyle} className={`${containerClassName}`}>
        {label && <AppText size="base" font="semibold" className="text-base mb-2">{label}</AppText>}

        <View
          style={
            suffix
              ? {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }
              : {}
          }
          className={`flex flex-col`}
        >
          <TextInput
            {...props}
            className={`border font-light border-divider outline-none w-full ${!textarea ? 'h-[50px] px-5' : 'h-[200px] p-5'} rounded-lg ${inputClassName}`}
            placeholder={placeholder}
            onChangeText={(e: string) => {
              setValue(e);
              if (!ignoreFormik) {
                fieldHelper?.[2].setValue(e);
              }
            }}
            onChange={(e) => {
              props?.onChange && props.onChange(e.nativeEvent.text);
            }}
            value={value}
            style={inputStyle}
            ref={inputRef}
            onFocus={handleFocus}
            secureTextEntry={props.secureTextEntry ? !showPassword : false}
            editable={editable}
            textAlignVertical={textarea ? 'top' : 'center'}
            multiline={textarea ? true : false}
            numberOfLines={10}
          />
          {props.secureTextEntry && (
            <>
              <AppIcon
                name={showPassword ? "eye" : "eye-off"}
                type="Feather"
                size={16}
                className="absolute top-0 right-0 -mt-[35px] mr-5 z-10"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </>
          )}
          {suffix}
        </View>

        <>
          {!ignoreFormik &&
            fieldHelper?.[1]?.touched &&
            fieldHelper?.[1].error && (
              <AppText className="text-red-500">{fieldHelper?.[1].error}</AppText>
            )}
        </>
      </View>
    // </KeyboardAvoidingView>
  );
};
