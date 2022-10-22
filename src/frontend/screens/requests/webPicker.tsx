import React from "react";
import { createElement } from "react-native";

type WebPickerProps = {
  style: React.CSSProperties;
  currentValue: string;
  onChange: (event: any) => void;
};

const WebPicker = ({ style, currentValue, onChange }: WebPickerProps) =>
  createElement("input", {
    value: currentValue,
    style,
    onChange: (event: any) => onChange(event.target.value),
    type: "date",
  });

export default WebPicker;
