import React from "react";
import Box from "@mui/material/Box";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { extensions } from "app/components/rich-text-editor/extensions";

import { Editor, useEditor, EditorContent } from "@tiptap/react";
import { useClickOutsideEditor } from "app/hooks/useClickOutsideEditorComponent";

export const RichEditor: React.FC<{
  itemId: string;
  visualSettings: any;
  initialContent?: string;
  setValue: (value: string) => void;
  setClicked: (clicked: boolean) => void;
  setEditor: (editor: Editor | null) => void;
}> = ({
  setEditor,
  setClicked,
  initialContent,
  setValue,
  // visualSettings,
  itemId,
}) => {
  const setSelectedController = useStoreActions(
    (actions) => actions.RBReportItemsControllerState.setItem,
  );
  const items = useStoreState((state) => state.RBReportItemsState.items);
  const selectedItem = items.find((i) => i.id === itemId);

  const editItem = useStoreActions(
    (actions) => actions.RBReportItemsState.editItem,
  );
  const clearSelectedItem = useStoreActions(
    (actions) => actions.RBReportItemsControllerState.clearItem,
  );

  const editor = useEditor({
    extensions,
    autofocus: true,
    onUpdate: () => {
      setValue(editor.getText());
      const item = items.find((item) => item.type === "text" && item.extra);
      if (item) {
        editItem({ id: item.id, type: item.type, settings: item.settings });
      }
    },
    onMount: ({ editor }) => {
      if (initialContent && editor && editor.isEmpty) {
        setTimeout(() => {
          editor.commands.setContent(initialContent);
        }, 1);
      }
    },
  });

  useClickOutsideEditor({
    editorId: "rte-editor",
    toolbarId: "rte-toolbar",
    onOutsideClick: () => {
      setEditor(null);
      clearSelectedItem();

      if (editor.isEmpty) {
        setClicked(false);
      }
    },
  });
  const setEditorStateAndController = () => {
    setEditor(editor);
    setSelectedController({ type: "text", open: true, id: itemId });
  };

  return (
    <Box
      id="rte-editor"
      sx={{
        ...selectedItem?.settings,
        "*": { margin: "0 !important" },
        blockquote: { margin: "0 40px !important" },
      }}
      onClick={() => setEditorStateAndController()}
      onFocus={() => setEditorStateAndController()}
    >
      <EditorContent editor={editor} width="100%" />
    </Box>
  );
};
