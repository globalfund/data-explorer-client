import React, { ReactElement, useMemo, useRef } from "react";
import { EditorState } from "draft-js";
import Editor, { EditorPlugin } from "@draft-js-plugins/editor";
import createLinkPlugin, { AnchorPlugin } from "@draft-js-plugins/anchor";
import createEmojiPlugin, { EmojiPlugin } from "@draft-js-plugins/emoji";

import createToolbarPlugin, {
  StaticToolBarPlugin,
} from "@draft-js-plugins/static-toolbar";
import createUndoPlugin, { UndoRedoButtonProps } from "@draft-js-plugins/undo";
import createTextAlignmentPlugin, {
  TextAlignmentPlugin,
} from "@draft-js-plugins/text-alignment";

/* stylesheets */
import "@draft-js-plugins/anchor/lib/plugin.css";
import editorStyles from "./editorStyles.module.css";
import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";
import alignmentStyles from "./alignmentStyles.module.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";

export const RichEditor = (props: {
  editMode: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  invertColors?: boolean;
  textContent: EditorState;
  setTextContent: (value: EditorState) => void;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused?: boolean;
  setPlugins?: React.Dispatch<
    React.SetStateAction<
      (
        | StaticToolBarPlugin
        | AnchorPlugin
        | (EditorPlugin & {
            UndoButton: React.ComponentType<UndoRedoButtonProps>;
            RedoButton: React.ComponentType<UndoRedoButtonProps>;
          })
        | TextAlignmentPlugin
        | EmojiPlugin
      )[]
    >
  >;
}): ReactElement => {
  const editor = useRef<Editor | null>(null);

  const focus = (): void => {
    editor.current?.focus();
  };
  const [localFocus, setLocalFocus] = React.useState(false);

  const emojiPlugin = createEmojiPlugin({
    // selectButtonContent: (
    //   <svg
    //     width="24"
    //     height="24"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M11.991 3.00001C10.2114 3.00179 8.47218 3.53114 6.99333 4.52116C5.51447 5.51117 4.36232 6.9174 3.68251 8.56209C3.0027 10.2068 2.82575 12.0161 3.17404 13.7613C3.52232 15.5066 4.38019 17.1094 5.63922 18.3671C6.89825 19.6249 8.50192 20.4812 10.2475 20.8277C11.9931 21.1743 13.8022 20.9955 15.4462 20.3141C17.0902 19.6326 18.4953 18.4791 19.4839 16.9992C20.4724 15.5194 21 13.7797 21 12C21.0006 10.8172 20.7679 9.64587 20.3152 8.55309C19.8626 7.46031 19.1989 6.46752 18.3621 5.63156C17.5253 4.7956 16.5318 4.13288 15.4386 3.68132C14.3454 3.22976 13.1738 2.99824 11.991 3.00001ZM12 19C10.6155 19 9.26216 18.5895 8.11101 17.8203C6.95987 17.0511 6.06266 15.9579 5.53285 14.6788C5.00303 13.3997 4.86441 11.9922 5.13451 10.6344C5.4046 9.27651 6.07129 8.02923 7.05026 7.05026C8.02922 6.07129 9.2765 5.40461 10.6344 5.13451C11.9922 4.86442 13.3997 5.00304 14.6788 5.53285C15.9579 6.06267 17.0511 6.95987 17.8203 8.11102C18.5895 9.26216 19 10.6155 19 12C19.0003 12.9193 18.8194 13.8297 18.4677 14.6791C18.116 15.5285 17.6004 16.3003 16.9503 16.9503C16.3003 17.6004 15.5285 18.116 14.6791 18.4677C13.8297 18.8194 12.9193 19.0003 12 19ZM15.105 13.8H16.608C16.2464 14.728 15.6131 15.5252 14.7909 16.0873C13.9687 16.6493 12.996 16.95 12 16.95C11.0041 16.95 10.0313 16.6493 9.20912 16.0873C8.38692 15.5252 7.75358 14.728 7.392 13.8H8.895C9.20819 14.3469 9.66027 14.8014 10.2055 15.1175C10.7507 15.4335 11.3698 15.6 12 15.6C12.6302 15.6 13.2493 15.4335 13.7945 15.1175C14.3397 14.8014 14.7918 14.3469 15.105 13.8ZM7.5 9.75001C7.5 9.48301 7.57918 9.222 7.72752 8.99999C7.87586 8.77798 8.0867 8.60495 8.33338 8.50277C8.58006 8.40059 8.8515 8.37386 9.11338 8.42595C9.37525 8.47804 9.6158 8.60661 9.8046 8.79542C9.9934 8.98422 10.122 9.22476 10.1741 9.48664C10.2262 9.74851 10.1994 10.02 10.0972 10.2666C9.99506 10.5133 9.82203 10.7242 9.60002 10.8725C9.37802 11.0208 9.11701 11.1 8.85 11.1C8.49196 11.1 8.14858 10.9578 7.89541 10.7046C7.64224 10.4514 7.5 10.1081 7.5 9.75001ZM13.8 9.75001C13.8 9.48301 13.8792 9.222 14.0275 8.99999C14.1759 8.77798 14.3867 8.60495 14.6334 8.50277C14.8801 8.40059 15.1515 8.37386 15.4134 8.42595C15.6753 8.47804 15.9158 8.60661 16.1046 8.79542C16.2934 8.98422 16.422 9.22476 16.4741 9.48664C16.5262 9.74851 16.4994 10.02 16.3972 10.2666C16.2951 10.5133 16.122 10.7242 15.9 10.8725C15.678 11.0208 15.417 11.1 15.15 11.1C14.792 11.1 14.4486 10.9578 14.1954 10.7046C13.9422 10.4514 13.8 10.1081 13.8 9.75001Z"
    //       fill="black"
    //     />
    //   </svg>
    // ),
  });
  const textAlignmentPlugin = createTextAlignmentPlugin({
    theme: {
      alignmentStyles: {
        ...alignmentStyles,
        draftCenter: alignmentStyles.draftCenter,
        draftLeft: alignmentStyles.draftLeft,
        draftRight: alignmentStyles.draftRight,
      },
    },
  });
  const linkPlugin = createLinkPlugin();
  const undoPlugin = createUndoPlugin({
    undoContent: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.25">
          <path
            d="M10.4 9.4C8.7 9.7 7.2 10.3 5.8 11.4L3 8.5V15.5H10L7.3 12.8C11 10.2 16.1 11 18.8 14.7C19 15 19.2 15.2 19.3 15.5L21.1 14.6C18.9 10.8 14.7 8.7 10.4 9.4Z"
            fill="black"
          />
        </g>
      </svg>
    ),
    redoContent: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.25">
          <path
            d="M13.6 9.4C15.3 9.7 16.8 10.3 18.2 11.4L21 8.5V15.5H14L16.7 12.8C13 10.1 7.9 11 5.3 14.7C5.1 15 4.9 15.2 4.8 15.5L3 14.6C5.1 10.8 9.3 8.7 13.6 9.4Z"
            fill="black"
          />
        </g>
      </svg>
    ),
    // theme: { undo: undoButtonStyle, redo: undoButtonStyle },
  });

  const plugins = useMemo(() => {
    const toolbarPlugin = createToolbarPlugin({
      theme: { buttonStyles, toolbarStyles },
    });

    return [
      toolbarPlugin,
      linkPlugin,
      undoPlugin,
      textAlignmentPlugin,
      emojiPlugin,
    ];
  }, []);

  React.useEffect(() => {
    if (localFocus) {
      props.setPlugins?.(plugins);
    }
  }, [localFocus]);

  return (
    <div
      className={
        props.editMode ? editorStyles.editor : editorStyles.editorPreview
      }
      onClick={focus}
    >
      <Editor
        plugins={plugins}
        editorKey="RichEditor"
        readOnly={!props.editMode}
        editorState={props.textContent}
        onChange={props.setTextContent}
        onBlur={() => {
          setLocalFocus(true);
          props.setIsFocused?.(true);
        }}
        onFocus={() => {
          setLocalFocus(true);
          props.setIsFocused?.(true);
        }}
        placeholder={props.placeholder ?? "Add your story..."}
        ref={(element) => {
          editor.current = element;
        }}
      />
    </div>
  );
};
