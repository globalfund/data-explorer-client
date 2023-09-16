import React, { ReactElement, useMemo, useRef } from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkPlugin, { AnchorPlugin } from "@draft-js-plugins/anchor";
import createToolbarPlugin, {
  Separator,
  StaticToolBarPlugin,
} from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

/* stylesheets */
import "@draft-js-plugins/anchor/lib/plugin.css";
import editorStyles from "./editorStyles.module.css";
import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";
import buttonInvertedStyles from "./buttonInvertedStyles.module.css";
import toolbarInvertedStyles from "./toolbarInvertedStyles.module.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

// const HeadlinessPicker =()=>{
//   React.useE
//   return(
//     <></>
//   )
// }

export const RichEditor = (props: {
  editMode: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  invertColors?: boolean;
  textContent: EditorState;
  setTextContent: (value: EditorState) => void;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused?: boolean;
  plugins?: (AnchorPlugin | StaticToolBarPlugin)[];
}): ReactElement => {
  const editor = useRef<Editor | null>(null);

  const focus = (): void => {
    editor.current?.focus();
  };

  return (
    <div
      className={
        props.editMode ? editorStyles.editor : editorStyles.editorPreview
      }
      onClick={focus}
      css={`
        ${!props.fullWidth && "max-width: 800px !important;"}

        h1,
        h2 {
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          * {
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          }
        }

        blockquote {
          padding-left: 11px;
          margin-inline-start: 0px;
          border-left: 4px solid #262c34;
        }

        .public-DraftEditorPlaceholder-hasFocus {
          .public-DraftEditorPlaceholder-inner {
            opacity: 0.5;
          }
        }

        .public-DraftEditorPlaceholder-inner {
          position: absolute;
        }

        #bold-button {
          > svg {
            transform: scale(1.2);
          }
        }

        #italic-button {
          > svg {
            transform: scale(1.2);
          }
        }

        #headline-one-button {
          font-size: 22px;
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
        }

        #headline-two-button {
          font-size: 14px;
          margin-bottom: -5px;
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
        }

        #quotes-button {
          > svg {
            margin-bottom: -10px;
            transform: rotate(180deg) scale(1.5);
          }
        }
      `}
    >
      <Editor
        plugins={props.plugins}
        editorKey="RichEditor"
        readOnly={!props.editMode}
        editorState={props.textContent}
        onChange={props.setTextContent}
        onBlur={() => props.setIsFocused?.(false)}
        onFocus={() => props.setIsFocused?.(true)}
        placeholder={props.placeholder ?? "Add your story..."}
        ref={(element) => {
          editor.current = element;
        }}
        // customStyleMap={{
        //   BOLD: {
        //     fontFamily: "'GothamNarrow-Bold', 'Helvetica Neue', sans-serif",
        //   },
        //   ITALIC: {
        //     fontStyle: "italic",
        //   },
        //   UNDERLINE: {
        //     textDecoration: "underline",
        //   },
        // }}
      />

      {/* <InlineToolbar>
        {(externalProps) => (
          <React.Fragment>
            <BoldButton
              {...externalProps}
              buttonProps={{
                id: "bold-button",
              }}
            />
            <ItalicButton
              {...externalProps}
              buttonProps={{
                id: "italic-button",
              }}
            />
            <UnderlineButton {...externalProps} />
            <linkPlugin.LinkButton {...externalProps} />
            <Separator />
            <HeadlineOneButton
              {...externalProps}
              buttonProps={{
                id: "headline-one-button",
              }}
            />
            <HeadlineTwoButton
              {...externalProps}
              buttonProps={{
                id: "headline-two-button",
              }}
            />
            <BlockquoteButton
              {...externalProps}
              buttonProps={{
                id: "quotes-button",
              }}
            />
          </React.Fragment>
        )}
      </InlineToolbar> */}
    </div>
  );
};
