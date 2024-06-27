import React from "react";
import Typography from "@mui/material/Typography";
import { BreadcrumbItem } from "app/components/breadcrumbs/data";
import { FilterGroupModel } from "app/components/filters/list/data";
import { useCMSData } from "app/hooks/useCMSData";
import { get } from "lodash";

export interface DatasetPageProps {
  title: string;
  subtitle: string;
  appliedFilters: string[];
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  handleResetFilters: () => void;
  filterGroups: FilterGroupModel[];
  toolbarRightContent?: React.ReactNode;
}

export const TooltipTitle = () => {
  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
      <Typography fontSize="12px" fontWeight="700">
        {get(cmsData, "pagesDatasets.filtersTooltipTitle", "Global Filtering")}
      </Typography>
      <Typography
        fontSize="12px"
        marginTop="8px"
        dangerouslySetInnerHTML={{
          __html: get(
            cmsData,
            "pagesDatasets.filtersTooltipContent",
            `This filter will be affecting the datasets and indicators throughout the
              page and will be shown in <span style="color: #FF9800">orange</span>. 
              Whereas, showcased datasets have their local filtering that is
            represented in <span style="color: #2196F3">light blue</span>.`
          ),
        }}
      />
    </React.Fragment>
  );
};
