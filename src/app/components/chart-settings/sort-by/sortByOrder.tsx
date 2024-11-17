import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { OrderList } from "app/components/order-list";
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

  const order = ["A-Z", "Z-A"];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePoolItemClick = (item: "A-Z" | "Z-A") => () => {
    props.setItems(item);
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
              width: 105.23,
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
                Add Sort
              </Typography>
              <ChevronRight fontSize="small" />
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
          vertical: 32 + 5,
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "350px",
            padding: "7px 10px",
            borderRadius: "4px",
            border: `1px solid ${colors.secondary[700]}`,
          }}
        >
          <OrderList
            items={[
              {
                id: props.items,
              },
            ]}
            // @ts-ignore
            setItems={props.setItems}
            dropdownSetSelected={props.orderListDropdownSetSelected}
          />

          <Box>
            {order.map((item) => (
              <Button
                key={item}
                disabled={item === props.items}
                onClick={handlePoolItemClick(item as "A-Z" | "Z-A")}
                startIcon={<ChartSettingsAddIcon />}
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  maxHeight: "22px",
                  padding: "0px 10px",
                  borderRadius: "4px",
                  textTransform: "none",
                  border: `1px solid ${colors.secondary[700]}`,
                  "&:disabled": {
                    color: colors.secondary[500],
                    borderColor: colors.secondary[600],
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
        </Box>
      </Popover>
    </React.Fragment>
  );
};
