/* third-party */
import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { LocationIcon } from "app/assets/icons/Location";
import { ComponentIcon } from "app/assets/icons/Component";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { ratingValues } from "app/components/Charts/PerformanceRating/data";

export function GrantDetailOverviewModule() {
  const isLoading = useStoreState((state) => state.GrantDetailInfo.loading);
  const grantInfoData = useStoreState((state) =>
    get(state.GrantDetailInfo.data, "data[0]", {
      title: "",
      code: "",
      rating: "",
      status: "",
      location: "",
      component: "",
      description: "",
      investments: {
        disbursed: 0,
        committed: 0,
        signed: 0,
      },
      manager: {
        name: "",
        email: "",
      },
    })
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid container spacing={2}>
      <div css="width: 100%;height: 25px;" />
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 14px;
          `}
        >
          <b>Grant status</b>: {grantInfoData.status}
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Rating
        </div>
        <div
          css={`
            gap: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 20px;
          `}
        >
          {ratingValues.map((value: string) => (
            <div
              key={value}
              css={`
                width: 30px;
                height: 30px;
                display: flex;
                font-size: 12px;
                border-radius: 50%;
                align-items: center;
                justify-content: center;
                border: 2px solid #262c34;
                opacity: ${(grantInfoData.rating || ratingValues[0]) === value
                  ? 1
                  : 0.3};
              `}
            >
              {value}
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            gap: 6px;
            display: flex;
            font-size: 12px;
            margin-bottom: 10px;
            flex-direction: row;
            align-items: center;
          `}
        >
          <LocationIcon />
          <div>
            Location: <b>{grantInfoData.location}</b>
          </div>
        </div>
        <div
          css={`
            gap: 6px;
            display: flex;
            font-size: 12px;
            margin-bottom: 20px;
            flex-direction: row;
            align-items: center;
          `}
        >
          <ComponentIcon />
          <div>
            Component: <b>{grantInfoData.component}</b>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Finance
        </div>
        <div
          css={`
            font-size: 12px;
          `}
        >
          <b>Disbursed: </b>
          {formatFinancialValue(grantInfoData.investments.disbursed)}
        </div>
        <div
          css={`
            font-size: 12px;
          `}
        >
          <b>Committed: </b>
          {formatFinancialValue(grantInfoData.investments.committed)}
        </div>
        <div
          css={`
            font-size: 12px;
            margin-bottom: 40px;
          `}
        >
          <b>Signed: </b>
          {formatFinancialValue(grantInfoData.investments.signed)}
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          {/* Description */}
        </div>
        <div
          css={`
            font-size: 12px;
            margin-bottom: 20px;
          `}
        >
          {/* {grantInfoData.description} */}
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Fund Portfolio Manager
        </div>
        <div
          css={`
            font-size: 12px;
          `}
        >
          {grantInfoData.manager.name}
        </div>
        <a
          href={`mailto:${grantInfoData.manager.email}`}
          css={`
            color: #000;
            font-size: 12px;
          `}
        >
          {grantInfoData.manager.email}
        </a>
      </Grid>
    </Grid>
  );
}
