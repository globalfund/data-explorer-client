/* third-party */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { InvestmentsRadialViz } from "app/modules/country-detail-module/sub-modules/overview/components/radial";
import { InvestmentsTimeCycleViz } from "app/modules/country-detail-module/sub-modules/overview/components/time-cyle";

interface Props {
  code: string;
}

export function LocationDetailOverviewModule(props: Props) {
  const isLoading = useStoreState(
    (state) =>
      state.LocationDetailInfo.loading ||
      state.DisbursementsTimeCycle.loading ||
      state.SignedTimeCycle.loading ||
      state.CommitmentTimeCycle.loading
  );
  const locationInfoData = useStoreState((state) =>
    get(state.LocationDetailInfo.data, "data[0]", {
      id: "",
      locationName: "",
      disbursed: 0,
      committed: 0,
      signed: 0,
      countries: [],
      multicountries: [],
      indicators: [],
      portfolioManager: "",
      portfolioManagerEmail: "",
    })
  );
  const fetchDisbursementsTimeCycleData = useStoreActions(
    (store) => store.DisbursementsTimeCycle.fetch
  );
  const fetchSignedTimeCycleData = useStoreActions(
    (store) => store.SignedTimeCycle.fetch
  );
  const fetchCommitmentTimeCycleData = useStoreActions(
    (store) => store.CommitmentTimeCycle.fetch
  );
  const timeCycleData = useStoreState((state) => ({
    disbursed: get(state.DisbursementsTimeCycle.data, "data", []) as Record<
      string,
      unknown
    >[],
    signed: get(state.SignedTimeCycle.data, "data", []) as Record<
      string,
      unknown
    >[],
    committed: get(state.CommitmentTimeCycle.data, "data", []) as Record<
      string,
      unknown
    >[],
  }));

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters({
      locations: [props.code],
      components: [],
      partnerTypes: [],
      partnerSubTypes: [],
      partners: [],
      status: [],
      replenishmentPeriods: [],
      donors: [],
      donorCategories: [],
    });
    fetchSignedTimeCycleData({ filterString });
    fetchCommitmentTimeCycleData({ filterString });
    fetchDisbursementsTimeCycleData({ filterString });
  }, [props.code]);

  React.useEffect(() => {
    document.body.style.background = "#F5F5F7";
    return () => {
      document.body.style.background = "#FFFFFF";
    };
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid
      container
      css={`
        * {
          color: #262c34;
        }

        > div {
          padding: 28px;
          background: #fff;
          border-radius: 20px;
          margin-bottom: 20px;

          @media (min-width: 600px) {
            &:nth-of-type(2) {
              margin-right: 20px;
              max-width: calc(50% - 10px);
            }
            &:nth-of-type(3) {
              max-width: calc(50% - 10px);
            }
          }
        }
      `}
    >
      <Grid item container xs={12}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8}>
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              Total Disbursement
            </div>
            <div
              css={`
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 27px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {formatLargeAmountsWithPrefix(locationInfoData.disbursed)}
            </div>
            <Grid container spacing={4}>
              {locationInfoData.indicators.map((indicator: any) => (
                <Grid item xs={12} sm={6} md={4} key={indicator.name}>
                  <div
                    css={`
                      font-size: 14px;
                      font-weight: bold;
                      margin-bottom: 8px;
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    `}
                  >
                    {indicator.name}
                  </div>
                  <div
                    css={`
                      gap: 5px;
                      display: flex;
                      flex-direction: row;
                      align-items: baseline;
                    `}
                  >
                    <div
                      css={`
                        font-size: 18px;
                        font-weight: bold;
                        font-family: "GothamNarrow-Bold", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {indicator.value}
                    </div>
                    <div
                      css={`
                        font-size: 14px;
                      `}
                    >
                      ({indicator.year})
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sm={12} md={4}>
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {locationInfoData.multicountries.length > 0 &&
                `Multicountries with ${locationInfoData.locationName}`}
              {locationInfoData.countries.length > 0 &&
                `Countries in ${locationInfoData.locationName}`}
            </div>
            <div
              css={`
                display: ${locationInfoData.countries.length > 0
                  ? "inline-block"
                  : "flex"};
                margin-bottom: 20px;
                flex-direction: column;

                > a {
                  width: fit-content;
                  text-decoration: none;

                  &:hover {
                    text-decoration: underline;
                  }
                }
              `}
            >
              {locationInfoData.multicountries.map(
                (mc: { name: string; code: string }) => (
                  <Link to={`/location/${mc.code}/overview`} key={mc.name}>
                    {mc.name}
                  </Link>
                )
              )}
              {locationInfoData.countries.map(
                (c: { name: string; code: string }, index: number) => (
                  <React.Fragment key={c.name}>
                    <Link to={`/location/${c.code}/overview`}>{c.name}</Link>
                    {index < locationInfoData.countries.length - 1 && ", "}
                  </React.Fragment>
                )
              )}
            </div>
            {(locationInfoData.portfolioManager ||
              locationInfoData.portfolioManagerEmail) && (
              <React.Fragment>
                <div
                  css={`
                    font-size: 14px;
                    font-weight: bold;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  `}
                >
                  Fund Portfolio Manager
                </div>
                <div
                  css={`
                    font-size: 14px;
                  `}
                >
                  {locationInfoData.portfolioManager}
                </div>
                <a
                  href={`mailto:${locationInfoData.portfolioManagerEmail}`}
                  css={`
                    font-size: 14px;
                    text-decoration: none;

                    &:hover {
                      text-decoration: underline;
                    }
                  `}
                >
                  {locationInfoData.portfolioManagerEmail}
                </a>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 18px;
            font-weight: bold;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Investment
        </div>
        <div
          css={`
            font-size: 12px;
          `}
        >
          Comparison between disbursed, commited and signed amounts
        </div>
        <InvestmentsRadialViz />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Investment over time
        </div>
        <InvestmentsTimeCycleViz rawData={timeCycleData} />
      </Grid>
      <span css="width: 100%;height: 25px;" />
    </Grid>
  );
}
