import React from "react";
import * as VectorIcon from "@expo/vector-icons";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";
interface IProps {
  name: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  className?: string | undefined;
  color?: string;
  onPress?: () => void;
  type?:
  | "MaterialIcons"
  | "FontAwesome"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "Octicons"
  | "Feather"
  | "AntDesign"
  | "Entypo"
  | "Foundation"
  | "EvilIcons"
  | "FontAwesome5"
  | "SimpleLineIcons"
  | "FontAwesome6"
}

export const AppIcon: React.FC<IProps> = ({
  name,
  style,
  color = "#6b7280",
  onPress,
  size = 24,
  className,
  type = "MaterialIcons",
}) => {
  const Icon = VectorIcon[type];

  if (onPress)
    return (
      <TouchableOpacity
        onPress={() => {
          if (onPress) onPress();
        }}
        style={style}
      >
        <Icon
          name={name as any}
          size={size}
          color={color}
          minimumFontScale={0.01}
          className={className}
        />
      </TouchableOpacity>
    );

  return (
    <Icon
      name={name as any}
      size={size}
      color={color}
      allowFontScaling
      className={className}
      // adjustsFontSizeToFit
      style={[{ fontWeight: "100" }, style]}
    />
  );
};
