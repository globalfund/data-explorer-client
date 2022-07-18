/* third-party */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { LocationIcon } from "app/assets/icons/Location";
import { ComponentIcon } from "app/assets/icons/Component";
import { PageLoader } from "app/modules/common/page-loader";
import { ratingValues } from "app/components/Charts/PerformanceRating/data";
import { InvestmentsRadialViz } from "app/modules/grant-detail-module/components/sub-modules/overview/components/radial";

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
      principalRecipient: {
        code: "",
        name: "",
        shortName: "",
      },
    })
  );
  const cmsData = useCMSData({ returnData: true });

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
      spacing={2}
      css={`
        * {
          color: #262c34;
        }

        > div {
          > div {
            padding: 24px;
            background: #fff;

            @media (max-width: 600px) {
              margin-bottom: 20px;
            }
          }

          @media (min-height: 650px) {
            &:first-of-type {
              > div:first-of-type {
                overflow-y: auto;
                max-height: calc(100vh - 150px);

                &::-webkit-scrollbar {
                  width: 6px;
                  background: #ededf6;
                }
                &::-webkit-scrollbar-track {
                  border-radius: 4px;
                  background: #fff;
                }
                &::-webkit-scrollbar-thumb {
                  border-radius: 4px;
                  background: #495057;
                }
              }
              > div:nth-of-type(2) {
                max-height: 532px;
              }
            }
          }
        }
      `}
    >
      <Grid item container xs={12} lg={12} justifyContent="space-between">
        <Grid
          item
          xs={12}
          md={4}
          css={`
            hr {
              opacity: 0.3;
              margin: 20px 0;
              margin-left: -24px;
              border-color: #dfe3e6;
              width: calc(100% + 48px);
            }
          `}
        >
          <div>
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {get(cmsData, "modulesGrantDetail.fundManager", "")}
            </div>
            <div
              css={`
                font-size: 14px;
              `}
            >
              {grantInfoData.manager.name}
            </div>
            <a
              target="_blank"
              href={`mailto:${grantInfoData.manager.email}`}
              css={`
                font-size: 14px;
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              {grantInfoData.manager.email}
            </a>
            <hr />
            <div
              css={`
                font-size: 14px;
                margin-bottom: 8px;
              `}
            >
              <b>{get(cmsData, "modulesGrantDetail.grantStatus", "")}</b>{" "}
              {grantInfoData.status}
            </div>
            <hr />
            <div
              css={`
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              `}
            >
              <div
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 12px;
                  flex-direction: row;
                  align-items: center;

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-right: 6px;
                      }
                    }
                  }
                `}
              >
                <LocationIcon />
                <div>
                  {get(cmsData, "modulesGrantDetail.location", "")}{" "}
                  <b>{grantInfoData.location}</b>
                </div>
              </div>
              <div
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 12px;
                  flex-direction: row;
                  align-items: center;

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-right: 6px;
                      }
                    }
                  }
                `}
              >
                <ComponentIcon />
                <div>
                  {get(cmsData, "modulesGrantDetail.component", "")}{" "}
                  <b>{grantInfoData.component}</b>
                </div>
              </div>
            </div>
            <hr />
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 5px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {get(cmsData, "modulesGrantDetail.rating", "")}
            </div>
            <div
              css={`
                gap: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 20px;
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
                    ${(grantInfoData.rating || ratingValues[0]) === value &&
                    `font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;`}
                    opacity: ${(grantInfoData.rating || ratingValues[0]) ===
                    value
                      ? 1
                      : 0.3};
                    ${index > 0 &&
                    `
                      background: #f5f5f7;
                      border: 2px solid #262c34;
                    `}
                  `}
                >
                  {value}
                </div>
              ))}
            </div>
            {grantInfoData.principalRecipient && (
              <div>
                <hr />
                <div
                  css={`
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  `}
                >
                  Principal Recipient:
                </div>
                <div
                  css={`
                    display: flex;
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
                  <Link
                    to={`/partner/${grantInfoData.principalRecipient.code}/investments`}
                  >
                    {grantInfoData.principalRecipient.name}
                    {grantInfoData.principalRecipient.shortName &&
                      ` (${grantInfoData.principalRecipient.shortName})`}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          css={`
            @media (min-width: 960px) {
              max-width: 65%;
              flex-basis: 65%;
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
              Comparison between disbursed, commited and signed amounts
            </div>
            <InvestmentsRadialViz />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
