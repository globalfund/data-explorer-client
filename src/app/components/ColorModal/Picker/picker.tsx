import React, { Component } from "react";
import { colors } from "app/components/ColorModal/Picker/colors";

export default function Picker(props: any) {
  const handleColorChange = (color: string) => {
    props.onSelected(color);
  };

  const { theme } = props;
  return (
    <div className={theme.colorPickerStyles.wrapper}>
      <div
        className={theme.colorPickerStyles.closeWrapper}
        onClick={props.closeModal}
      >
        <svg
          className={theme.colorPickerStyles.close}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" fillRule="evenodd">
            <path d="M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z" />
            <path d="M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z" />
          </g>
        </svg>
      </div>

      <div className={theme.colorPickerStyles.picker}>
        {colors.map((c, i) => {
          return (
            <span
              style={{ backgroundColor: c, borderColor: c }}
              className={theme.colorPickerStyles.color}
              key={i}
              onClick={() => handleColorChange(c)}
            />
          );
        })}
      </div>
    </div>
  );
}
