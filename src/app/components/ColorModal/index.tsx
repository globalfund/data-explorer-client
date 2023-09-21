import React, { Component } from "react";
import { RichUtils } from "draft-js";
import Picker from "app/components/ColorModal/Picker";
import ModalStyles from "app/components/ColorModal/modalStyles.module.css";

export default function ColorModal(props: any) {
  const setColor = (color: string) => {
    const editorState = props.getEditorState();
    const currentStyle = editorState.getCurrentInlineStyle();
    if (!currentStyle.has(color)) {
      const safeName = color.replace("#", "");
      props.setEditorState(
        RichUtils.toggleInlineStyle(editorState, `color-${safeName}`)
      );
      props.closeModal();
    }
  };

  const { theme } = props;

  return (
    <div style={{ width: "260px" }} className={ModalStyles.modalWrapper}>
      <Picker.Picker
        onSelected={setColor}
        closeModal={props.closeModal}
        theme={theme}
      />
    </div>
  );
}
