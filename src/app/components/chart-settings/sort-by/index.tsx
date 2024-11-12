import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { OrderList } from "app/components/order-list";
import { CategoryButton } from "app/components/search/styles";
import { ReactComponent as ChartSettingsAddIcon } from "app/assets/vectors/ChartSettingsAdd.svg";
import { ReactComponent as ChartSettingsSortByIcon } from "app/assets/vectors/ChartSettingsSortBy.svg";
import {
  ChartSettingsSortByItem,
  ChartSettingsSortByProps,
  ChartSettingsSortByPoolItem,
} from "app/components/chart-settings/sort-by/data";

export const ChartSettingsSortBy: React.FC<ChartSettingsSortByProps> = (
  props: ChartSettingsSortByProps
) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePoolItemClick = (item: ChartSettingsSortByPoolItem) => () => {
    const newItem: ChartSettingsSortByItem = {
      ...item,
      id: (props.items.length + 1).toString(),
      order: "asc",
    };
    props.setItems([...props.items, newItem]);
  };

  const handleCancel = () => {
    props.onCancel();
    handleClose();
  };

  const handleSubmit = () => {
    props.onSubmit();
    handleClose();
  };

  return (
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
            items={props.items}
            // @ts-ignore
            setItems={props.setItems}
            dropdownSetSelected={props.orderListDropdownSetSelected}
          />
          <Box
            sx={{
              gap: "5px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {props.pool.map((item) => (
              <Button
                key={item.name}
                disabled={item.disabled}
                onClick={handlePoolItemClick(item)}
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
                {item.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              gap: "5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              "> button": {
                width: "36px",
                height: "26px",
                padding: "0px",
                borderRadius: "4px",
                border: `1px solid ${colors.secondary[700]}`,
                "&:hover": {
                  borderColor: colors.secondary[200],
                },
              },
            }}
          >
            <IconButton onClick={handleCancel}>
              <Close fontSize="small" htmlColor={colors.primary.black} />
            </IconButton>
            <IconButton onClick={handleSubmit}>
              <Check fontSize="small" htmlColor={colors.primary.black} />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
