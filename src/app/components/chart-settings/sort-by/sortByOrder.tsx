import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Refresh from "@mui/icons-material/Refresh";
import { CategoryButton } from "app/components/search/styles";
import { ReactComponent as ChartSettingsAddIcon } from "app/assets/vectors/ChartSettingsAdd.svg";
import { ReactComponent as ChartSettingsSortByIcon } from "app/assets/vectors/ChartSettingsSortBy.svg";
import { ChartSettingsSortByOrderProps } from "app/components/chart-settings/sort-by/data";
import ChevronRight from "@mui/icons-material/ChevronRight";

export const ChartSettingsSortByOrder: React.FC<
  ChartSettingsSortByOrderProps
> = (props: ChartSettingsSortByOrderProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const order: ChartSettingsSortByOrderProps["order"][] = ["A-Z", "Z-A"];

  const handleOrderChange =
    (value: ChartSettingsSortByOrderProps["order"]) => () => {
      props.setOrder(value);
      setAnchorEl(null);
    };

  const handleReset = () => {
    props.onReset();
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {!props.secondary ? (
        <Box
          ref={ref}
          sx={{
            gap: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography fontSize="12px" fontWeight="700">
            Sort By
          </Typography>
          <CategoryButton
            disableTouchRipple
            onClick={handleClick}
            theme={{ anchorEl: Boolean(anchorEl) }}
            style={{
              width: 200,
              maxHeight: 26,
              marginRight: 0,
              fontSize: "12px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                gap: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <ChartSettingsSortByIcon />
              <Typography fontSize="12px">Add Sort</Typography>
            </Box>
            <ChartSettingsAddIcon />
          </CategoryButton>
        </Box>
      ) : (
        <Box>
          <Typography fontSize="12px" fontWeight="700" marginBottom="10px">
            Sort By
          </Typography>
          <CategoryButton
            disableTouchRipple
            onClick={handleClick}
            theme={{ anchorEl: Boolean(anchorEl) }}
            style={{
              minWidth: props.order ? "max-content" : "105.23px",
              width: props.order ? "auto" : "105.23px",
              maxHeight: 22,
              marginRight: 0,
              fontSize: "12px",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                gap: "1.4px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                svg: {
                  flexShrink: 0,
                  marginRight: "2px",
                },
              }}
            >
              <ChartSettingsSortByIcon />
              <Typography fontSize="12px" whiteSpace={"nowrap"}>
                Add Sort {props.order && "(1)"}
              </Typography>
              <ChevronRight
                fontSize={"small"}
                sx={{
                  transform: `rotate(${anchorEl ? 90 : 0}deg)`,
                  marginLeft: props.order ? "5px" : "0",
                }}
              />
            </Box>
          </CategoryButton>
        </Box>
      )}
      <Popover
        keepMounted
        container={ref.current}
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 30,
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "105px",
            padding: "7px 10px",
            borderRadius: "4px",
            border: `1px solid ${colors.secondary[200]}`,
          }}
        >
          <Box>
            {order.map((item) => (
              <Button
                key={item}
                disabled={item === props.order}
                onClick={handleOrderChange(item)}
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  maxHeight: "22px",
                  width: "100%",
                  textTransform: "none",
                  display: "flex",
                  justifyContent: "flex-start",
                  border: "none",
                  background: "none",
                  "&:hover": {
                    background: "none",
                  },
                  "&:disabled": {
                    color: colors.secondary[500],
                    "svg > path": {
                      fill: colors.secondary[500],
                    },
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{
              fontSize: "12px",
              maxHeight: "26px",
              lineHeight: "1.5",
              padding: "2px 12px",
              width: "73px",
              marginTop: "8px",
              justifySelf: "flex-end",
              display: "flex",
            }}
            startIcon={
              <Refresh
                fontSize="small"
                htmlColor="#373D43"
                sx={{
                  transform: "rotate(-180deg)",
                }}
              />
            }
          >
            Reset
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
};
