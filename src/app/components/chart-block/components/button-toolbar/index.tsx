import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { exportChart } from "app/utils/exportChart";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ReactComponent as InfoIcon } from "app/assets/vectors/Info_GreyBG.svg";
import { ReactComponent as ShareIcon } from "app/assets/vectors/Share_GreyBG.svg";
import { ReactComponent as DownloadIcon } from "app/assets/vectors/Download_GreyBG.svg";
import { ReactComponent as FavoriteIcon } from "app/assets/vectors/Favorite_GreyBG.svg";

interface ChartBlockButtonToolbarProps {
  hashId: string;
  blockId: string;
}

const DownloadPanel: React.FC<ChartBlockButtonToolbarProps> = (
  props: ChartBlockButtonToolbarProps
) => {
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(
    null
  );

  const handleButtonClick = (type: "pdf" | "png") => () => {
    exportChart(props.blockId || "", type)
      .then(() => {
        setFeedbackMessage(`Chart downloaded as ${type.toUpperCase()}!`);
      })
      .catch(() => {
        setFeedbackMessage("Oops, something went wrong!");
      });
  };

  React.useEffect(() => {
    if (feedbackMessage) {
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  }, [feedbackMessage]);

  return (
    <React.Fragment>
      {feedbackMessage && (
        <Box
          sx={{
            lineHeight: 1.2,
            textTransform: "capitalize",
          }}
        >
          {feedbackMessage}
        </Box>
      )}
      {!feedbackMessage && (
        <React.Fragment>
          <Button onClick={handleButtonClick("pdf")}>PDF.</Button>
          <Button onClick={handleButtonClick("png")}>PNG.</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const SharePanel: React.FC<ChartBlockButtonToolbarProps> = (
  props: ChartBlockButtonToolbarProps
) => {
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(
    null
  );

  const handleButtonClick = (type: "code" | "link") => () => {
    let url = window.location.href.split("#")[0];
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    navigator.clipboard.writeText(
      type === "code" ? "" : `${url}#${props.hashId}`
    );
    setFeedbackMessage(`${type} copied!`);
  };

  React.useEffect(() => {
    if (feedbackMessage) {
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  }, [feedbackMessage]);

  React.useEffect(() => {
    if (feedbackMessage) {
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  }, [feedbackMessage]);

  return (
    <React.Fragment>
      {feedbackMessage && (
        <Box
          sx={{
            lineHeight: 1.2,
            textTransform: "capitalize",
          }}
        >
          {feedbackMessage}
        </Box>
      )}
      {!feedbackMessage && (
        <React.Fragment>
          <Tooltip title="Not implemented yet">
            <Button
              disableRipple
              sx={{
                opacity: 0.2,
                "&:hover": {
                  cursor: "default",
                  color:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR +
                    " !important",
                  background:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR +
                    " !important",
                },
              }}
            >
              Embed code
            </Button>
          </Tooltip>
          <Button onClick={handleButtonClick("link")}>Link</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const InfoPanel: React.FC = () => {
  return (
    <Box padding="16px" marginTop="24px" bgcolor="#F5F5F7" borderRadius="16px">
      <Typography
        color="#495057"
        fontSize="10px"
        fontWeight="700"
        marginBottom="4px"
      >
        Note
      </Typography>
      <Typography color="#495057" fontSize="10px">
        Amounts are in the specified currency. Where noted, the USD-equivalent
        is presented for amounts in non-USD currencies. Expenitures made in
        currencies other than USD from 2014 onward were converted to USD using
        fixed Replenishment exchange rates. Expenditure data collected before
        2014 were converted using spot exchange rates. Amounts are in the
        specified currency. Where noted, the USD-equivalent is presented for
        amounts in non-USD currencies. Expenitures made in currencies other than
        USD from 2014 onward were converted to USD using fixed Replenishment
        exchange rates. Expenditure data collected before 2014 were converted
        using spot exchange rates.
      </Typography>
    </Box>
  );
};

export const ChartBlockButtonToolbar: React.FC<ChartBlockButtonToolbarProps> = (
  props: ChartBlockButtonToolbarProps
) => {
  const [active, setActive] = React.useState<
    "download" | "share" | "favorite" | "info" | null
  >(null);

  const handleButtonClick =
    (type: "download" | "share" | "favorite" | "info") => () => {
      setActive(type);
      if (type === "favorite") {
        setTimeout(() => {
          setActive(null);
        }, 3000);
      }
    };

  const handleClose = () => {
    setActive(null);
  };

  const activePanel = React.useMemo(() => {
    switch (active) {
      case "download":
        return <DownloadPanel {...props} />;
      case "share":
        return <SharePanel {...props} />;
      case "favorite":
        return (
          <Box
            sx={{
              lineHeight: 1.2,
            }}
          >
            Chart added to your library!
          </Box>
        );
      case "info":
        return <InfoPanel />;
      default:
        return null;
    }
  }, [active]);

  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={handleClose}>
        <Box
          gap="8px"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{
            "& > button": {
              padding: "0",
              width: "40px",
              height: "30px",
              borderRadius: "4px",
              background: "transparent",
              border: "1px solid #DFE3E5",
              "&:hover": {
                borderColor: "#70777E",
              },
            },
          }}
        >
          {active !== "info" && activePanel && (
            <React.Fragment>
              <Box
                gap="8px"
                display="flex"
                flexDirection="row"
                sx={{
                  "& > button": {
                    height: "32px",
                    fontSize: "14px",
                    fontWeight: "400",
                    padding: "7px 24px",
                    borderRadius: "8px",
                    textTransform: "none",
                    color: appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
                    background:
                      appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR,
                    "&:hover": {
                      color:
                        appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
                      background:
                        appColors.CHART_BLOCK_CYCLES
                          .BUTTON_ACTIVE_BACKGROUND_COLOR,
                    },
                  },
                  "& > div": {
                    height: "32px",
                    fontSize: "14px",
                    fontWeight: "700",
                    padding: "7px 24px",
                    borderRadius: "8px",
                    color: appColors.COMMON.WHITE,
                    background: appColors.COMMON.BLACK,
                  },
                }}
              >
                {activePanel}
              </Box>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ borderColor: appColors.COMMON.BLACK }}
              />
            </React.Fragment>
          )}

          <Tooltip title="Info" onClick={handleButtonClick("info")}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton onClick={handleButtonClick("share")}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton onClick={handleButtonClick("download")}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Favourite (Not implemented yet)">
            <IconButton
              disableRipple
              sx={{
                opacity: 0.2,
                "&:hover": {
                  cursor: "default",
                  borderColor: "#DFE3E5 !important",
                },
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </ClickAwayListener>
      {active === "info" && <InfoPanel />}
    </React.Fragment>
  );
};
