import React from "react";
import { DraggablePopper } from "app/components/draggable-popper";

export const ReportBuilderPageNotes: React.FC<{
  clicked: boolean;
  anchorEl: null | HTMLElement;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ anchorEl, clicked, setClicked }) => {
  const [note, setNote] = React.useState("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
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
        value={note}
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
