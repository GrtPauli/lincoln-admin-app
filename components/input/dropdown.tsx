import AntDesign from "@expo/vector-icons/AntDesign";
import { useField } from "formik";
import React, { useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { AppText } from "../typography";

interface IProps {
  label?: string;
  name: string;
  selected?: string;
  disabled?: boolean;
  isMultiple?: boolean;
  ignoreFormik?: boolean;
  containerClassname?: string | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  dropwdownStyle?: StyleProp<ViewStyle>;
  items: Array<{ value: string; label: string }>;
  placeHolder?: string;
  onChange?: (value: any) => void;
}

export const AppDropdownInput: React.FC<IProps> = ({
  name,
  items,
  label,
  ignoreFormik,
  placeHolder,
  onChange,
  isMultiple,
  dropwdownStyle,
  containerClassname,
}) => {
  const [value, setValue] = useState<any>(isMultiple ? [] : null);
  const [field, meta, helpers] = ignoreFormik
    ? [null, null, null]
    : useField(name);

  const handleChange = (selectedValue: any) => {
    setValue(selectedValue);

    if (!ignoreFormik) {
      helpers?.setValue(selectedValue);
    }

    if (onChange) {
      onChange(selectedValue);
    }
  };

  if (isMultiple) {
    return (
      <View className={containerClassname}>
        {label && (
          <AppText size="base" font="semibold" className="text-base mb-2">
            {label}
          </AppText>
        )}
        <MultiSelect
          style={[styles.dropdown, dropwdownStyle]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={items}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeHolder || "Select"}
          searchPlaceholder="Search..."
          value={field ? field.value : value}
          onChange={(selectedItems: any) => {
            const mappedItems = selectedItems.map((val: string) =>
              items.find((item) => item.value === val)
            );
            handleChange(mappedItems);
          }}
        />
      </View>
    );
  }

  return (
    <View className={containerClassname}>
      {label && (
        <AppText size="base" font="semibold" className="text-base mb-2">
          {label}
        </AppText>
      )}
      <Dropdown
        style={[styles.dropdown, dropwdownStyle]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeHolder || "Select"}
        searchPlaceholder="Search..."
        value={field ? field.value : value}
        onChange={(selectedItem: any) => handleChange(selectedItem)}
        renderItem={(item) => (
          <View style={styles.item}>
            <AppText style={styles.textItem}>{item.label}</AppText>
            {item.value === value && (
              <AntDesign
                style={styles.icon}
                name="check"
                size={20}
                color="black"
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "#ddd",
    borderWidth: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Jakarta-Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Jakarta-Regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    padding: 12,
    fontFamily: "Jakarta-Light",
  },
});
