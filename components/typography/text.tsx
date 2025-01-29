import React from "react";
import { StyleProp } from "react-native";
import { StyleSheet, Text, TextStyle } from "react-native";
interface IProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
    color?: string;
    className?: string | undefined;
    numberOfLines?: number;
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
    font?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"; //;
    onPress?: () => void;
}

export const AppText: React.FC<IProps> = ({
    children,
    style,
    color,
    textAlign,
    numberOfLines,
    className,
    size = "base",
    font = "normal",
    onPress,
}) => {
    return (
        <Text
            onPress={onPress}
            numberOfLines={numberOfLines}
            style={[
                styles.text,
                styles[`size_${size}`],
                styles[`font_${font}`],
                { color },
                { textAlign },
                style,
            ]}
            className={className}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Jakarta-Medium",
    },
    size_xs: {
        fontSize: 12,
        lineHeight: 16,
    },
    size_sm: {
        fontSize: 14,
        lineHeight: 20,
    },
    size_base: {
        fontSize: 16,
        lineHeight: 24,
    },
    size_lg: {
        fontSize: 18,
        lineHeight: 28,
    },
    size_xl: {
        fontSize: 20,
        lineHeight: 28,
    },
    size_2xl: {
        fontSize: 24,
        lineHeight: 32,
    },
    size_3xl: {
        fontSize: 30,
        lineHeight: 36,
    },
    font_thin: {
        fontWeight: "100",
        fontFamily: "Jakarta-ExtraLight",
    },
    font_light: {
        fontWeight: "300",
        fontFamily: "Jakarta-Light",
    },
    font_normal: {
        fontWeight: "400",
        fontFamily: "Jakarta-Regular",
    },
    font_medium: {
        fontWeight: "500",
        fontFamily: "Jakarta-Medium",
    },
    font_semibold: {
        fontWeight: "600",
        fontFamily: "Jakarta-SemiBold",
    },
    font_bold: {
        // fontWeight: "700",
        fontFamily: "Jakarta-Bold",
    },

    font_extrabold: {
        // fontWeight: "800",
        fontFamily: "Jakarta-ExtraBold",
    },
});

// font-normal	font-weight: 400;
// font-medium	font-weight: 500;
// font-semibold	font-weight: 600;
// font-bold	font-weight: 700;
// font-extrabold	font-weight: 800;
// font-black	font-weight: 900;
