import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Popover,
  Switch,
} from "@material-ui/core";
import { LinkIcon } from "app/assets/icons/Link";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { styles } from "./style";
import ShareIcon from "@material-ui/icons/Share";

import EditIcon from "@material-ui/icons/Edit";

interface SubheaderProps {
  previewMode: boolean;
}
export default function Subheader(props: SubheaderProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCopy(text: string, result: boolean) {
    setOpenSnackbar(result);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div css={styles.container}>
        <div css={styles.innercontainer}>
          <div
            css={styles.firstrow}
            style={
              props.previewMode
                ? {
                    pointerEvents: "none",
                  }
                : {}
            }
          >
            <div>
              <div>
                <input
                  type="text"
                  value={"Untitled report"}
                  css={styles.titleInput}
                  onChange={(e) => console.log(e.target.value)}
                  style={
                    props.previewMode
                      ? {
                          width: "fit-content",
                        }
                      : {}
                  }
                />
              </div>
            </div>

            {props.previewMode && (
              <div css={styles.iconbtns}>
                <IconButton onClick={handleClick}>
                  <ShareIcon htmlColor="#262c34" />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  css={`
                    .MuiPaper-root {
                      border-radius: 10px;
                      background: #495057;
                    }
                  `}
                >
                  <div css={styles.sharePopup}>
                    <CopyToClipboard
                      text={window.location.href}
                      onCopy={handleCopy}
                    >
                      <Button startIcon={<LinkIcon />}>Copy link</Button>
                    </CopyToClipboard>
                  </div>
                </Popover>
                <IconButton>
                  <svg width="20" height="19" viewBox="0 0 20 19">
                    <rect width="20" height="19" rx="3" fill="#262C34" />
                    <path
                      fill="#EFEFEF"
                      d="M14 9L6.5 13.3301L6.5 4.66987L14 9Z"
                    />
                  </svg>
                </IconButton>
                <IconButton>
                  <EditIcon htmlColor="#262c34" />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
