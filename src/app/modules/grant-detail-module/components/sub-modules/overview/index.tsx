/* third-party */
import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { LocationIcon } from "app/assets/icons/Location";
import { ComponentIcon } from "app/assets/icons/Component";
import { PageLoader } from "app/modules/common/page-loader";
import { ratingValues } from "app/components/Charts/PerformanceRating/data";
import { InvestmentRadialViz } from "app/modules/grant-detail-module/components/radial";

export function GrantDetailOverviewModule() {
  const cmsData = useCMSData({ returnData: true });

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
      principalRecipient: {
        code: "",
        name: "",
        shortName: "",
      },
    })
  );
  const goalsObjectives = useStoreState(
    (state) =>
      get(state.GrantDetailPeriodGoalsObjectives, "data.data", []) as {
        name: string;
        type: string;
      }[]
  );

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_2;
    return () => {
      document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_1;
    };
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      css={`
        * {
          color: ${appColors.COMMON.PRIMARY_COLOR_1};
        }
        @media (min-width: 1280px) {
          margin-top: 20px;
        }

        > div {
          > div {
            padding: 24px;

            background: ${appColors.COMMON.WHITE};
          }
        }
      `}
    >
      <Grid
        item
        xs={12}
        lg={8}
        md={7}
        css={`
          > div {
            h3 {
              margin-top: 0px;
              font-size: 14px;
              font-weight: 700;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }

            h4 {
              font-size: 12px;
              font-weight: 700;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }

            p {
              font-size: 14px;
            }
          }
        `}
      >
        <div>
          <div>
            <h3>Goals</h3>
            {filter(goalsObjectives, { type: "Goal" }).map((item) => (
              <p key={item.name}>{item.name}</p>
            ))}
          </div>
          <div
            css={`
              margin-top: 2%;
            `}
          >
            <h3>Objectives</h3>
            {filter(goalsObjectives, { type: "Objective" }).map((item) => (
              <p key={item.name}>{item.name}</p>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item container xs={12} lg={4} md={5}>
        <Grid
          item
          xs={12}
          // md={7}
          css={`
            padding-left: 0 !important;
          `}
        >
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 0.5px solid #dfe3e6;

              padding-left: 20px;
              padding-bottom: 10px;
            `}
          >
            <div
              css={`
                p {
                  font-family: "Gotham Narrow", sans-serif;
                  margin: 0;
                }
              `}
            >
              <p
                css={`
                  color: #262c34;
                  font-weight: 400;
                  font-size: 14px;
                  margin-bottom: 0;
                `}
              >
                <b>
                  {get(
                    cmsData,
                    "modulesGrantDetail.fundManager",
                    "Fund Portfolio Manager"
                  )}
                </b>
              </p>
              <p
                css={`
                  margin-top: -4px;
                `}
              >
                {grantInfoData.manager.name}
              </p>
              <a
                css={`
                  color: #000;
                  font-size: 10px;
                  cursor: pointer;
                  text-decoration: underline;
                `}
                href={`mailto:${grantInfoData.manager.email}`}
              >
                {grantInfoData.manager.email}
              </a>
            </div>
            <div>
              <p
                css={`
                  color: #262c34;
                  font-weight: 400;
                  font-size: 14px;
                  margin: 0;
                `}
              >
                <b>
                  {get(
                    cmsData,
                    "modulesGrantDetail.grantStatus",
                    "Grant Status"
                  )}
                </b>
              </p>
              <p
                css={`
                  margin: 0;
                `}
              >
                {grantInfoData.status}
              </p>
            </div>
          </div>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left: 20px;
              padding-bottom: 3px;
              border-bottom: 0.5px solid #dfe3e6;

              p {
                font-size: 12px;
                color: #262c34;
                font-family: "Gotham Narrow", sans-serif;
              }
            `}
          >
            <div>
              <p
                css={`
                  display: flex;
                  align-items: center;
                  gap: 7px;
                `}
              >
                <span
                  css={`
                    svg {
                      width: 15px;
                      height: 21px;
                      margin-top: 4px;
                    }
                  `}
                >
                  <LocationIcon />
                </span>
                {get(cmsData, "modulesGrantDetail.location", "Location")}{" "}
                <b>{grantInfoData.location}</b>
              </p>
            </div>
            <div>
              <p
                css={`
                  display: flex;
                  align-items: center;
                  gap: 7px;
                `}
              >
                <span
                  css={`
                    svg {
                      margin-top: 4px;
                    }
                  `}
                >
                  <ComponentIcon />
                </span>
                {get(cmsData, "modulesGrantDetail.component", "Component")}{" "}
                <b>{grantInfoData.component}</b>
              </p>
            </div>
          </div>
          <div
            css={`
              padding-left: 20px;
              width: 95%;
            `}
          >
            <p
              css={`
                font-family: "Gotham Narrow", sans-serif;
                font-size: 14px; ;
              `}
            >
              {get(cmsData, "modulesGrantDetail.lowestRating", "Rating")}
            </p>
            <div
              css={`
                gap: 21px;
                display: flex;
                flex-direction: row;
                align-items: center;

                width: 90%;
                margin-bottom: 20px;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 12px;
                    }
                  }
                }
              `}
            >
              {ratingValues.map((value: string, index: number) => (
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
                    text-transform: ${index == 0 ? "lowercase" : "auto"};
                    border: ${index == 0
                      ? "none"
                      : `2px solid ${appColors.COMMON.PRIMARY_COLOR_1}`};
                    opacity: ${(grantInfoData.rating || ratingValues[0]) ===
                    value
                      ? 1
                      : 0.3};
                  `}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
          <div
            css={`
              padding-left: 20px;
              width: 95%;
            `}
          >
            <p
              css={`
                color: #000;
                font-family: "Gotham Narrow", sans-serif;
                margin-top: 0;
                margin-bottom: 0;
              `}
            >
              <b>Principal Recipient:</b>
            </p>
            <Link
              css={`
                color: #000;
                font-size: 12px;
                cursor: pointer;
                text-decoration: underline;
              `}
              to={`/partner/${grantInfoData.principalRecipient.code}/investments`}
            >
              {grantInfoData.principalRecipient.name} (
              {grantInfoData.principalRecipient.shortName})
            </Link>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          css={`
            @media (min-width: 1280px) {
              margin-top: 20px;
            }
          `}
        >
          <div>
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
              comparison between disbursed, committed and signed amount
            </div>
            <InvestmentRadialViz />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
