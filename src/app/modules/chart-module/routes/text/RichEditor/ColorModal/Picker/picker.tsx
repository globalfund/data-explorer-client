import React, { Component } from "react";
import { colors } from "app/modules/chart-module/routes/text/RichEditor/ColorModal/Picker/colors";
import ColorPickerStyles from "app/modules/chart-module/routes/text/RichEditor/ColorModal/Picker/colorPickerStyles.module.css";
export default function Picker(props: any) {
  const handleColorChange = (color: string) => {
    props.onSelected(color);
  };

  return (
    <div className={ColorPickerStyles.wrapper}>
      <div className={ColorPickerStyles.picker}>
        {colors.map((c, i) => {
          return (
            <span
              style={{ backgroundColor: c, borderColor: c }}
              className={ColorPickerStyles.color}
              key={i}
              onClick={() => handleColorChange(c)}
            />
          );
        })}
      </div>
    </div>
  );
}
