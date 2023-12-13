import { Snackbar, withStyles } from "@material-ui/core";

export interface ISnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

export const CssSnackbar = withStyles({
  root: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
    },
  },
})(Snackbar);
