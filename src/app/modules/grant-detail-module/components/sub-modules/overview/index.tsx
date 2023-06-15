/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { useStoreState } from "app/state/store/hooks";
import { Grid, useMediaQuery } from "@material-ui/core";
/* project */
import { useCMSData } from "app/hooks/useCMSData";

import { PageLoader } from "app/modules/common/page-loader";

import { ratingValues } from "app/components/Charts/PerformanceRating/data";
import { InvestmentsRadialViz } from "app/modules/country-detail-module/sub-modules/overview/components/radial";

export function GrantDetailOverviewModule() {
  const isMobile = useMediaQuery("(max-width: 767px)");
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
  const cmsData = useCMSData({ returnData: true });

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
      <React.Fragment>
        {/* {isSmallScreen && detailsBlock} */}
        <Grid
          item
          xs={12}
          lg={8}
          md={8}
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
          <div
            css={`
              height: 344px;
            `}
          >
            <div>
              <h3> Goals</h3>
              To ensure that Albania remains a low prevalence country for TB and
              HIV
            </div>
            <div
              css={`
                margin-top: 2%;
              `}
            >
              {" "}
              <h3>Objectives</h3>
              Objectives Ensure sustainable response to HIV through
              strengthening coordination, leadership and financial and political
              commitment of the Government To ensure equitable access to high
              quality TB and HIV prevention, treatment, care and support with a
              focus on key affected populations (MSM, PWID, SW, PLWHA and other
              vulnerable people most affected by the HIV and TB epidemic) To
              strengthen the health and community systems that enable
              needs-based, evidence-based and cost-effective prevention
              interventions for key populations mostly affected by the HIV and
              TB epidemic.
            </div>
          </div>
        </Grid>
      </React.Fragment>

      <Grid item container xs={12} lg={4} md={7}>
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
              /* background: pink; */
              padding-left: 20px;
              padding-bottom: 10px;
              width: 90%;
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
                `}
              >
                <b>Fund Portfolio Manager</b>
              </p>
              <p>{grantInfoData.manager.name}</p>
              <p
                css={`
                  font-weight: 325;
                  font-size: 10px;
                  color: #000;
                `}
              >
                {grantInfoData.manager.email}
              </p>
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
                <b>Grant Status</b>
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

              width: 90%;
              p {
                font-size: 12px;
                color: #262c34;
                font-family: "Gotham Narrow", sans-serif;
              }
            `}
          >
            <div>
              <p>
                Location: <b>{grantInfoData.location}</b>
              </p>
            </div>
            <div>
              <p>
                Component: <b>{grantInfoData.component}</b>{" "}
              </p>
            </div>
          </div>
          <div
            css={`
              padding-left: 20px;
            `}
          >
            <p
              css={`
                font-family: "Gotham Narrow", sans-serif;
                font-size: 14px; ;
              `}
            >
              <b>Rating</b>
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
              <b>Principal Recipient:</b>{" "}
            </p>
            <p
              css={`
                color: #000000;
                font-weight: 325;
                font-size: 12px;
              `}
            >
              {grantInfoData.principalRecipient.name}({" "}
              {grantInfoData.principalRecipient.shortName}){" "}
            </p>
            <p
              css={`
                color: #000000;
                font-weight: 325;
                font-size: 12px;
              `}
            >
              {grantInfoData.principalRecipient.name}({" "}
              {grantInfoData.principalRecipient.shortName}){" "}
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          // md={7}
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
            <InvestmentsRadialViz />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
