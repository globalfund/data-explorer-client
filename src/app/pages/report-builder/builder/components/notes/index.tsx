import React from "react";
import { DraggablePopper } from "app/components/draggable-popper";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export const ReportBuilderPageNotes: React.FC<{
  clicked: boolean;
  anchorEl: null | HTMLElement;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ anchorEl, clicked, setClicked }) => {
  const value = useStoreState((state) => state.RBReportNotesState.value);
  const setValue = useStoreActions(
    (actions) => actions.RBReportNotesState.setValue,
  );

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <DraggablePopper
      id="report-builder-notes"
      resizable
      width={500}
      title="Notes"
      open={clicked}
      anchorEl={anchorEl}
      setOpen={setClicked}
    >
      <textarea
        autoFocus
        value={value}
        onChange={handleNoteChange}
        placeholder="Add notes and comments for this report. These are for internal use and won't appear in the final report."
        style={{
          width: "100%",
          border: "none",
          resize: "none",
          height: "500px",
          outline: "none",
          fontSize: "14px",
        }}
      />
    </DraggablePopper>
  );
};
