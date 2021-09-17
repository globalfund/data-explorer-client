/* third-party */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

interface Props {
  code: string;
}

export function LocationDetailOverviewModule(props: Props) {
  const isLoading = useStoreState((state) => state.LocationDetailInfo.loading);
  const locationInfoData = useStoreState((state) =>
    get(state.LocationDetailInfo.data, "data[0]", {
      id: "",
      locationName: "",
      disbursed: 0,
      committed: 0,
      signed: 0,
      countries: [],
      multicountries: [],
      portfolioManager: "",
      portfolioManagerEmail: "",
    })
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid
      container
      spacing={6}
      css={`
        * {
          color: #262c34;
        }
      `}
    >
      <div css="width: 100%;height: 25px;" />
      <Grid item md={12} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
          `}
        >
          Investments
        </div>
        <div
          css={`
            font-size: 14px;
          `}
        >
          <b>Disbursed: </b>
          {formatFinancialValue(locationInfoData.disbursed)}
        </div>
        <div
          css={`
            font-size: 14px;
          `}
        >
          <b>Committed: </b>
          {formatFinancialValue(locationInfoData.committed)}
        </div>
        <div
          css={`
            font-size: 14px;
            margin-bottom: 40px;
          `}
        >
          <b>Signed: </b>
          {formatFinancialValue(locationInfoData.signed)}
        </div>
      </Grid>
      <Grid item md={12} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
          `}
        >
          {locationInfoData.multicountries.length > 0 &&
            `Multicountries with ${locationInfoData.locationName}`}
          {locationInfoData.countries.length > 0 &&
            `Countries in ${locationInfoData.locationName}`}
        </div>
        <div
          css={`
            font-weight: bold;
            display: inline-block;
          `}
        >
          {locationInfoData.multicountries.map(
            (mc: { name: string; code: string }, index: number) => (
              <React.Fragment key={mc.name}>
                <Link to={`/location/${mc.code}/overview`}>{mc.name}</Link>
                {index < locationInfoData.multicountries.length - 1 && ", "}
              </React.Fragment>
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
      </Grid>
      {props.code.length === 3 && (
        <Grid item md={12} lg={6}>
          <Link
            to={`/results?locations=${props.code}`}
            css={`
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 40px;
            `}
          >
            See {locationInfoData.locationName}&apos;s results
          </Link>
        </Grid>
      )}
      <Grid item md={12} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
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
          `}
        >
          {locationInfoData.portfolioManagerEmail}
        </a>
      </Grid>
    </Grid>
  );
}
