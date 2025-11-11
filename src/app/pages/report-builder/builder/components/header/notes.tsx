import React from "react";
import NotesIcon from "app/assets/vectors/Notes.svg?react";
import { ReportBuilderPageNotes } from "app/pages/report-builder/builder/components/notes";
import Button from "@mui/material/Button";

export default function Notes() {
  const [anchorElNotes, setAnchorElNotes] = React.useState<null | HTMLElement>(
    null,
  );
  const [notesClicked, setNotesClicked] = React.useState(false);

  const handleNotesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotes(event.currentTarget);
    setNotesClicked(true);
  };

  const handleNotesClose = () => {
    setAnchorElNotes(null);
    setNotesClicked(false);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<NotesIcon />}
        onClick={handleNotesClick}
        sx={{
          ...(anchorElNotes && {
            bgcolor: "#f1f3f5",
            borderColor: "#000000",
          }),
        }}
      >
        Notes
      </Button>

      <ReportBuilderPageNotes
        clicked={notesClicked}
        anchorEl={anchorElNotes}
        setClicked={handleNotesClose}
      />
    </React.Fragment>
  );
}
