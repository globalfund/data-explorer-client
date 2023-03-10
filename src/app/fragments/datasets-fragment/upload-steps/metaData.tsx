import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import { PageHeader } from "app/components/PageHeader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import React from "react";
import { metaDatacss } from "../style";

interface Props {
  handleNext: () => void;
}
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#231D2C",
    },

    "& .MuiOutlinedInput-input": {
      padding: "2px 14px",
      height: "48px",
    },
    "& .MuiFormHelperText-root": {
      color: "#231D2C",
      fontSize: "12px",
      fontWeight: 400,
      marginLeft: "0px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#231D2C",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#231D2C",
        borderRadius: "10px",
        paddingBottom: "4px",
        fontSize: "16px",
      },
      "&:hover fieldset": {
        borderColor: "#231D2C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#231D2C",
      },
    },
  },
})(TextField);
export default function MetaData(props: Props) {
  return (
    <div css={metaDatacss}>
      <h1>Describe your dataset</h1>
      <div
        css={`
          width: 100%;
        `}
      >
        <form css={``}>
          <Grid lg={12} xs={12} md={12}>
            <CssTextField
              id="outlined-basic"
              label="Title of your dataset *"
              variant="outlined"
              helperText="Title must be between 6 and 50 characters in lenght."
              fullWidth
            />
          </Grid>
          <Box height={50} />
          <Grid lg={12} xs={12} md={12}>
            <CssTextField
              id="outlined-basic"
              label="Brief Description"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 18rem;
              gap: 1rem;
            `}
          >
            <button>
              <p
                css={`
                  color: #fff;
                  text-transform: uppercase;
                `}
              >
                previous
              </p>
            </button>
            <button
              onClick={props.handleNext}
              css={`
                color: #231d2c;
                text-transform: uppercase;
                :hover {
                  background: #231d2c;
                  color: #fff;
                }
              `}
            >
              next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
