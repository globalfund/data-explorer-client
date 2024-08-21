import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { componentsGroupingOptions } from "app/pages/datasets/grant-implementation/data";
import { useCMSData } from "app/hooks/useCMSData";

interface GrantImplementationPageBlock1Props {
  filterString: string;
  geographyGrouping: string;
  componentsGrouping: string;
}

export const GrantImplementationPageBlock1: React.FC<
  GrantImplementationPageBlock1Props
> = (props: GrantImplementationPageBlock1Props) => {
  const cmsData = useCMSData({ returnData: true });

  const dataFinancialInsightsStats = useStoreState((state) =>
    get(state.FinancialInsightsStats, "data.data[0]", {
      signed: 0,
      committed: 0,
      disbursed: 0,
    })
  );
  const loadingStats = useStoreState(
    (state) => state.FinancialInsightsStats.loading
  );
  const fetchFinancialInsightsStats = useStoreActions(
    (actions) => actions.FinancialInsightsStats.fetch
  );

  React.useEffect(() => {
    fetchFinancialInsightsStats({
      filterString: props.filterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
  }, [props.filterString, props.componentsGrouping, props.geographyGrouping]);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      marginBottom="50px"
      position="relative"
      sx={{
        "> div": {
          width: "calc(100% / 3)",
          padding: "0 20px",
          "&:not(:last-child)": {
            borderRight: "1px solid #DFE3E5",
          },
          "&:first-of-type": {
            paddingLeft: 0,
          },
          "@media (max-width: 920px)": {
            padding: "0 15px",
            h5: {
              fontSize: "20px",
            },
          },
          "@media (max-width: 767px)": {
            width: "100%",
            padding: "16px 0",
            "&:not(:last-child)": {
              borderRightStyle: "none",
              borderBottom: "1px solid #DFE3E5",
            },
          },
        },
        "@media (max-width: 767px)": {
          marginBottom: 0,
          flexDirection: "column",
        },
      }}
    >
      {loadingStats && (
        <Box
          height="100%"
          display="flex"
          position="absolute"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255, 255, 255, 0.8)"
          sx={{
            width: "100% !important",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box>
        <Typography variant="h5">
          {formatFinancialValue(dataFinancialInsightsStats.signed)}
        </Typography>
        <Typography fontSize="14px" fontWeight="700">
          {get(
            cmsData,
            "pagesDatasetsGrantImplementation.statsText1",
            "Total Signed Amount"
          )}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">
          {formatFinancialValue(dataFinancialInsightsStats.committed)}
        </Typography>
        <Typography fontSize="14px" fontWeight="700">
          {get(
            cmsData,
            "pagesDatasetsGrantImplementation.statsText2",
            "Total Committed Amount"
          )}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">
          {formatFinancialValue(dataFinancialInsightsStats.disbursed)}
        </Typography>
        <Typography fontSize="14px" fontWeight="700">
          {get(
            cmsData,
            "pagesDatasetsGrantImplementation.statsText3",
            "Total Disbursed Amount"
          )}
        </Typography>
      </Box>
    </Box>
  );
};
