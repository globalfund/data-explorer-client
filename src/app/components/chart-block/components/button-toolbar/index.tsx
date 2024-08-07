import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { exportChart } from "app/utils/exportChart";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ReactComponent as InfoIcon } from "app/assets/vectors/Info_GreyBG.svg";
import { ReactComponent as ShareIcon } from "app/assets/vectors/Share_GreyBG.svg";
import { ReactComponent as DownloadIcon } from "app/assets/vectors/Download_GreyBG.svg";
import {
  NOTES_GLOBAL,
  NOTES_BUDGETS,
  InfoPanelProps,
  NOTES_EXPENDITURES,
  NOTES_PLEDGES_CONTRIBUTIONS,
  ChartBlockButtonToolbarProps,
} from "app/components/chart-block/components/button-toolbar/data";
// import { ReactComponent as FavoriteIcon } from "app/assets/vectors/Favorite_GreyBG.svg";

const DownloadPanel: React.FC<ChartBlockButtonToolbarProps> = (
  props: ChartBlockButtonToolbarProps
) => {
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(
    null
  );

  const handleButtonClick = (type: "pdf" | "png") => () => {
    exportChart(props.blockId || "", type)
      .then(() => {
        setFeedbackMessage(`Asset downloaded as ${type.toUpperCase()}.`);
      })
      .catch(() => {
        setFeedbackMessage("Oops, something went wrong.");
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
      type === "code"
        ? ""
        : `${url}#${props.hashId}${
            props.chartType ? `|${props.chartType}` : ""
          }`
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
          {/* <Tooltip title="Not implemented yet">
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
          </Tooltip> */}
          <Button onClick={handleButtonClick("link")}>Share link</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const InfoPanel: React.FC<InfoPanelProps> = (props: InfoPanelProps) => {
  const content = React.useMemo(() => {
    switch (props.type) {
      case "global":
        return NOTES_GLOBAL;
      case "expenditures":
        return [NOTES_GLOBAL, NOTES_EXPENDITURES].join("<br/><br/>");
      case "budgets":
        return [NOTES_GLOBAL, NOTES_BUDGETS].join("<br/><br/>");
      case "pledges_contributions":
        return [NOTES_GLOBAL, NOTES_PLEDGES_CONTRIBUTIONS].join("<br/><br/>");
      default:
        return NOTES_GLOBAL;
    }
  }, [props.type]);

  return (
    <Box
      left="5%"
      bottom={100}
      width="90%"
      zIndex={1000}
      padding="16px"
      bgcolor="#F5F5F7"
      borderRadius="16px"
      position="absolute"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          color="#495057"
          fontSize="12px"
          fontWeight="700"
          marginBottom="8px"
        >
          Note
        </Typography>
        <IconButton
          onClick={props.close}
          sx={{
            padding: "4px",
            marginTop: "-8px",
            marginRight: "-8px",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <div
        className="scrollbar"
        style={{
          color: "#495057",
          fontSize: "12px",
          overflowY: "auto",
          maxHeight: "270px",
        }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
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
      if (type === "info" && active === "info") {
        setActive(null);
        return;
      }
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
        return <InfoPanel close={handleClose} type={props.infoType} />;
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
          marginTop="40px"
          position="relative"
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
                background: "#000000",
                borderColor: "#000000",
                svg: {
                  filter: "invert(1)",
                },
              },
            },
            "#active": {
              background: "#000000",
              borderColor: "#000000",
              svg: {
                filter: "invert(1)",
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
                    height: "30px",
                    fontSize: "14px",
                    fontWeight: "400",
                    padding: "7px 12px",
                    borderRadius: "4px",
                    textTransform: "none",
                    color: appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
                    border: `1px solid ${appColors.CHART_BLOCK_CYCLES.BUTTON_BORDER_COLOR}`,
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
                    height: "30px",
                    fontSize: "14px",
                    fontWeight: "400",
                    padding: "7px 12px",
                    borderRadius: "4px",
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
                sx={{ borderColor: appColors.COMMON.BLACK, margin: "0 16px" }}
              />
            </React.Fragment>
          )}
          <Tooltip title="Info" onClick={handleButtonClick("info")}>
            <IconButton id={active === "info" ? "active" : ""}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          {active === "info" && (
            <InfoPanel close={handleClose} type={props.infoType} />
          )}
          <Tooltip title="Share">
            <IconButton
              onClick={handleButtonClick("share")}
              id={active === "share" ? "active" : ""}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton
              onClick={handleButtonClick("download")}
              id={active === "info" ? "download" : ""}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Favourite (Not implemented yet)">
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
          </Tooltip> */}
        </Box>
      </ClickAwayListener>
    </React.Fragment>
  );
};
