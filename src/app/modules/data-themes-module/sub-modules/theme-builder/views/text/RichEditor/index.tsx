import React, { ReactElement, useMemo, useRef, useState } from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import Editor from "@draft-js-plugins/editor";
import createLinkPlugin from "@draft-js-plugins/anchor";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import createInlineToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/inline-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
} from "@draft-js-plugins/buttons";

/* stylesheets */
import "@draft-js-plugins/anchor/lib/plugin.css";
import editorStyles from "./editorStyles.module.css";
import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";

export const RichEditor = (props: {
  editMode: boolean;
  tabIndex: number;
  vizIndex: number;
}): ReactElement => {
  const linkPlugin = createLinkPlugin();
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      theme: { buttonStyles, toolbarStyles },
    });
    return [
      [inlineToolbarPlugin, linkPlugin],
      inlineToolbarPlugin.InlineToolbar,
    ];
  }, []);

  const textContent = useStoreState(
    (state) => state.dataThemes.textContent.value
  );
  const setTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.setValue
  );

  const editor = useRef<Editor | null>(null);

  const [localTextContent, setLocalTextContent] = useState(
    textContent[props.tabIndex][props.vizIndex]
  );

  const focus = (): void => {
    editor.current?.focus();
  };

  useUpdateEffect(() => {
    if (
      !isEqual(
        localTextContent.getCurrentContent(),
        textContent[props.tabIndex][props.vizIndex].getCurrentContent()
      )
    ) {
      setTextContent({
        tab: props.tabIndex,
        viz: props.vizIndex,
        value: localTextContent,
      });
    }
  }, [localTextContent]);

  useUpdateEffectOnce(() => {
    setTextContent({
      tab: props.tabIndex,
      viz: props.vizIndex,
      value: textContent[props.tabIndex][props.vizIndex],
    });
  }, [textContent]);

  if (
    get(textContent, `[${props.tabIndex}][${props.vizIndex}]`, undefined) ===
    undefined
  ) {
    return <React.Fragment />;
  }

  return (
    <div
      className={
        props.editMode ? editorStyles.editor : editorStyles.editorPreview
      }
      onClick={focus}
      css={`
        max-width: 800px !important;

        h1,
        h2 {
          font-family: "Inter", "Helvetica Neue", sans-serif;
          * {
            font-family: "Inter", "Helvetica Neue", sans-serif;
          }
        }

        blockquote {
          padding-left: 11px;
          margin-inline-start: 0px;
          border-left: 4px solid #262c34;
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
          font-family: "Inter", "Helvetica Neue", sans-serif;
        }

        #headline-two-button {
          font-size: 14px;
          margin-bottom: -5px;
          font-family: "Inter", "Helvetica Neue", sans-serif;
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
        plugins={plugins}
        editorKey="RichEditor"
        readOnly={!props.editMode}
        editorState={localTextContent}
        onChange={setLocalTextContent}
        placeholder="Add your story..."
        ref={(element) => {
          editor.current = element;
        }}
        customStyleMap={{
          BOLD: {
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          },
          ITALIC: {
            fontStyle: "italic",
          },
          UNDERLINE: {
            textDecoration: "underline",
          },
        }}
      />
      <InlineToolbar>
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
      </InlineToolbar>
    </div>
  );
};
