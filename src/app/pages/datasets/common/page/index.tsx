import React from "react";
import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Breadcrumbs } from "app/components/breadcrumbs";
import { FilterPanel } from "app/components/filters/panel";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {
  TooltipTitle,
  DatasetPageProps,
} from "app/pages/datasets/common/page/data";

export const DatasetPage: React.FC<DatasetPageProps> = (
  props: DatasetPageProps
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterPanelClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box padding="50px 0">
      <Breadcrumbs items={props.breadcrumbs} />
      <Typography variant="h1">{props.title}</Typography>
      <Typography variant="h6">{props.subtitle}</Typography>
      <Divider
        sx={{
          left: 0,
          width: "100vw",
          margin: "50px 0",
          position: "absolute",
          borderColor: "#CFD4DA",
        }}
      />
      <Box
        width="100%"
        height="82px"
        display="flex"
        marginTop="50px"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box gap="20px" display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h6" gap="5px" display="flex" alignItems="center">
            {props.title} Filters{" "}
            <Tooltip title={TooltipTitle} arrow>
              <InfoOutlined fontSize="small" />
            </Tooltip>
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleFilterButtonClick}
          >
            Filters
          </Button>
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterPanelClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <FilterPanel
              onClose={handleFilterPanelClose}
              appliedFilters={[
                "Africa",
                "Asia",
                "Americas",
                "Europe",
                "Oceania",
              ]}
              appliedFilterBgColors={{
                hover: "#FF9800",
                normal: "rgba(255, 152, 0, 0.2)",
              }}
            />
          </Popover>
        </Box>
        {props.toolbarRightContent && props.toolbarRightContent}
      </Box>
      <Divider
        sx={{
          left: 0,
          width: "100vw",
          position: "absolute",
          borderColor: "#CFD4DA",
        }}
      />
      {props.children}
    </Box>
  );
};
