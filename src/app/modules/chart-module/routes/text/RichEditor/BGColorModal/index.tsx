import React, { useRef } from "react";
import { EditorState, RichUtils } from "draft-js";
import Picker from "app/modules/chart-module/routes/text/RichEditor/BGColorModal/Picker";
import { Popper } from "@material-ui/core";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  getEditorState: () => EditorState;
  setEditorState: (value: EditorState) => void;
  theme: any;
  id: "bg-popover" | undefined;
  open: boolean;
  anchorEl: HTMLDivElement | null;
  handleClose: () => void;
}
export default function BgColorModal(props: Props) {
  const setColor = (color: string) => {
    const editorState = props.getEditorState();
    const currentStyle = editorState.getCurrentInlineStyle();
    if (!currentStyle.has(color)) {
      const safeName = color.replace("#", "");
      props.setEditorState(
        RichUtils.toggleInlineStyle(editorState, `bg-${safeName}`)
      );
      props.handleClose();
    }
  };
  const ref = useRef(null);

  useOnClickOutside(ref, () => props.handleClose());

  return (
    <Popper
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      placement="bottom"
      ref={ref}
    >
      <Picker.Picker onSelected={setColor} closeModal={props.handleClose} />
    </Popper>
  );
}
