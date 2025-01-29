import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { AppText } from "../typography";

interface IProps {
  title?: string | React.ReactNode;
  btnType?: "primary" | "outline" | "danger";
  loading?: boolean;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  color?: "text-white" | string;
  children?: React.ReactNode;
  onPress?: () => void;
  icon?: any;
}

export const AppButton: React.FC<IProps> = ({
  title,
  className,
  loading,
  onPress,
  color,
  disabled,
  btnType = "primary",
  textClassName,
  children,
  icon,
}) => {
  const btnClassName = () => {
    switch (btnType) {
      case "outline":
        return `bg-white border border-primary text-primary `;
      case "danger":
        return `bg-red-500 text-white`;
      default:
        return `bg-primary text-white`;
    }
  };

  const txtClassName = () => {
    switch (btnType) {
      case "outline":
        return `!text-primary`;
      case "danger":
        return `text-white`;
      default:
        return `text-white`;
    }
  };

  return (
    <TouchableOpacity
      className={`${
        loading && "cursor-not-allowed"
      } flex flex-row items-center justify-center h-[50px] rounded-full ${btnClassName()} ${color} ${
        disabled && "cursor-not-allowed"
      } ${
        disabled && btnType !== "outline" && "!bg-gray-400"
      } px-8 ${className} `}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={
            btnType == "primary" ? '#fff' : '#16a34a'
          }
          size={20}
        />
      ) : (
        children ? children :
          <AppText
            color="#fff"
            size="base"
            font="semibold"
            className={`${txtClassName()} ${textClassName}`}
          >
            {title}
          </AppText>
      )}
    </TouchableOpacity>
  );
};
