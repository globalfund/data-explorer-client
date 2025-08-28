import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCMSData } from "app/hooks/useCMSData";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { getCMSDataField } from "app/utils/getCMSDataField";
import CircularProgress from "@mui/material/CircularProgress";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useGetDatasetLatestUpdate } from "app/hooks/useGetDatasetLatestUpdate";

interface AccessToFundingBlock1Props {
  filterString: string;
  eligibilityYear: string;
  eligibilityYears: {
    label: string;
    value: string;
  }[];
  setEligibilityYear: React.Dispatch<React.SetStateAction<string>>;
}

export const AccessToFundingBlock1: React.FC<AccessToFundingBlock1Props> = (
  props: AccessToFundingBlock1Props,
) => {
  const cmsData = useCMSData({ returnData: true });
  const latestUpdateDate = useGetDatasetLatestUpdate({
    dataset: "eligibility",
  });

  const dataStats = useStoreState(
    (state) =>
      get(state.AccessToFundingStats, "data.data", []) as {
        name: string;
        value: string;
      }[],
  );
  const loadingStats = useStoreState(
    (state) => state.AccessToFundingStats.loading,
  );
  const fetchStats = useStoreActions(
    (actions) => actions.AccessToFundingStats.fetch,
  );

  const handleEligibilityYearChange = (value: string) => {
    props.setEligibilityYear(value);
  };

  React.useEffect(() => {
    if (props.eligibilityYears.length > 0 && props.eligibilityYear === "") {
      props.setEligibilityYear(props.eligibilityYears[0].value);
    }
  }, [props.eligibilityYears]);

  React.useEffect(() => {
    if (props.eligibilityYears.length > 0) {
      fetchStats({
        filterString: props.filterString,
        routeParams: {
          year: props.eligibilityYear,
        },
      });
    }
  }, [props.filterString, props.eligibilityYear]);

  return (
    <Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          "@media (max-width: 767px)": {
            flexDirection: "column",
            gap: "20px",
          },
        }}
      >
        <Box>
          <Typography variant="h3">
            {getCMSDataField(
              cmsData,
              "pagesDatasetsAccessToFunding.statsTitle",
              "Eligible Countries by Numbers",
            )}
          </Typography>
          <Typography variant="body2" fontSize="20px">
            {getCMSDataField(
              cmsData,
              "pagesDatasetsAccessToFunding.statsSubtitle",
              "Segmented by Components.",
            )}
          </Typography>
        </Box>
        <Box
          gap="10px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{
            "@media (max-width: 767px)": {
              width: "100%",
              justifyContent: "flex-end",
            },
          }}
        >
          <Typography fontSize="16px" fontWeight="700">
            {getCMSDataField(
              cmsData,
              "pagesDatasetsAccessToFunding.statsDropDownLabel",
              "Eligibility Year",
            )}
          </Typography>
          <Dropdown
            width={100}
            dropdownItems={props.eligibilityYears}
            dropdownSelected={props.eligibilityYear}
            handleDropdownChange={handleEligibilityYearChange}
          />
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        position="relative"
        margin="4px 0 50px 0"
        sx={{
          marginLeft: "-16px",
        }}
      >
        {loadingStats && (
          <Box
            width="100%"
            height="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(255, 255, 255, 0.8)"
          >
            <CircularProgress />
          </Box>
        )}
        {dataStats.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={3}>
            <Box padding="15px" bgcolor="#F1F3F5">
              <Typography variant="h4">{item.value}</Typography>
              <Typography fontSize="16px">
                {getCMSDataField(
                  cmsData,
                  "pagesDatasetsAccessToFunding.countriesEligible",
                  "Countries Eligible for",
                )}{" "}
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="overline" fontSize="14px">
            Latest Update: <b>{latestUpdateDate}</b>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
