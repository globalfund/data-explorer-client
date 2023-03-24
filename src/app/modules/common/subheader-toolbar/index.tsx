import React from "react";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import { LinkIcon } from "app/assets/icons/Link";
import ShareIcon from "@material-ui/icons/Share";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import CopyToClipboard from "react-copy-to-clipboard";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { styles } from "app/modules/common/subheader-toolbar/styles";
import { SubheaderToolbarProps } from "app/modules/common/subheader-toolbar/data";

export function SubheaderToolbar(props: SubheaderToolbarProps) {
  const { page } = useParams<{ page: string }>();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isPublicTheme, setIsPublicTheme] = React.useState(false);
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (text: string, result: boolean) => {
    setOpenSnackbar(result);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSave = () => {};

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div css={styles.container}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard"
      />
      <Container maxWidth="lg">
        <div css={styles.innercontainer}>
          <input
            value={props.name}
            placeholder="Title"
            css={styles.nameInput}
            onChange={onNameChange}
          />
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
                <FormControlLabel
                  value="public-theme"
                  label="Public theme"
                  labelPlacement="start"
                  control={
                    <Switch
                      color="primary"
                      checked={isPublicTheme}
                      onChange={() => setIsPublicTheme(!isPublicTheme)}
                    />
                  }
                />
                <Divider />
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={handleCopy}
                >
                  <Button startIcon={<LinkIcon />}>Copy link</Button>
                </CopyToClipboard>
              </div>
            </Popover>
            <IconButton
              component={Link}
              to={`/data-themes/${page}/preview`}
              disabled={!isPreviewEnabled}
              css={`
                opacity: ${isPreviewEnabled ? 1 : 0.5};
              `}
            >
              <svg width="20" height="19" viewBox="0 0 20 19">
                <rect width="20" height="19" rx="3" fill="#262C34" />
                <path fill="#EFEFEF" d="M14 9L6.5 13.3301L6.5 4.66987L14 9Z" />
              </svg>
            </IconButton>
            <IconButton
              onClick={onSave}
              disabled={!isSavedEnabled}
              css={`
                opacity: ${isSavedEnabled ? 1 : 0.5};
              `}
            >
              <SaveIcon htmlColor="#262c34" />
            </IconButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
