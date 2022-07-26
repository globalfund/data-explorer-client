import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export function DataThemesAlertDialog() {
  return (
    <Dialog
      open={!("indexedDB" in window)}
      css={`
        @media (prefers-color-scheme: dark) {
          .MuiDialog-paper {
            background: #495057;

            * {
              color: #fff;
            }
          }
        }
      `}
    >
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This browser doesn't support IndexedDB.
          <br />
          Please use a different browser that supports IndexedDB.
          <br />
          <br />
          <a target="_blank" href="https://caniuse.com/indexeddb">
            Check browsers IndexedDB support
          </a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" component={Link} to="/">
          Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}
