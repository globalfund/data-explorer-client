import React, {
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import createLinkPlugin from "@draft-js-plugins/anchor";
import "@draft-js-plugins/anchor/lib/plugin.css";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
} from '@draft-js-plugins/buttons';
import { useStoreActions, useStoreState } from "app/state/store/hooks";

/* Project */
import editorStyles from './editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';

export const RichEditor = (props: {editMode: boolean, tabIndex: number, vizIndex: number}): ReactElement => {
  const linkPlugin = createLinkPlugin();
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin(
      {theme: {buttonStyles, toolbarStyles}}
    );
    return [[inlineToolbarPlugin, linkPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  const textContent = useStoreState(
    (state) => state.dataThemes.textContent.value
  );
  const setTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.setValue
  );

  const editor = useRef<Editor | null>(null);

  const onChange = (value: EditorState): void => {
    setTextContent({tab: props.tabIndex, viz: props.vizIndex, value: value});
  };

  const focus = (): void => {
    editor.current?.focus();
  };

  return (
    <div className={editorStyles.editor} onClick={focus}>
      <Editor
        readOnly={!props.editMode}
        placeholder="Type here please!"
        editorKey="RichEditor"
        editorState={textContent[props.tabIndex][props.vizIndex]}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => {
          editor.current = element;
        }}
      />
      <InlineToolbar>
        {(externalProps) => (
          <React.Fragment>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <linkPlugin.LinkButton {...externalProps} />
            <Separator />
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
          </React.Fragment>
        )}
      </InlineToolbar>
    </div>
  );
}