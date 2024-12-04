import React, { ReactNode } from "react";
import { TouchableOpacity, type TouchableOpacityProps, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";


export type themeButtonProps = TouchableOpacityProps & {
  bgColor?: string;
  txtColor?: string;
  mx?: number;
  my?: number;
  txt: string;
  icon?: ReactNode;
};

export const ThemeButton = ({
  bgColor,
  txtColor,
  mx = 0,
  my = 0,
  txt = "Button",
  icon,
  style,
  ...rest
}: themeButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        bgColor && { backgroundColor: bgColor },
        mx ? { marginHorizontal: mx } : undefined,
        my ? { marginVertical: my } : undefined,
        style,
      ]}
      {...rest}
    >
      {icon && icon}
      <ThemedText style={{ color: txtColor ? txtColor : '#fff' }}>{txt}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#388E3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
})