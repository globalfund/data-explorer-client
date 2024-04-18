import React from "react";
import { BreadcrumbItem } from "app/components/breadcrumbs/data";
import Typography from "@mui/material/Typography";

export interface DatasetPageProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  toolbarRightContent?: React.ReactNode;
}

export const TooltipTitle = (
  <React.Fragment>
    <Typography fontSize="12px" fontWeight="700">
      Global Filtering
    </Typography>
    <Typography fontSize="12px" marginTop="8px">
      This filter will be affecting the datasets and indicators throughout the
      page and will be shown in <span style={{ color: "#FF9800" }}>orange</span>
      . Whereas, showcased datasets have their local filtering that is
      represented in <span style={{ color: "#2196F3" }}>light blue</span>.
    </Typography>
  </React.Fragment>
);
