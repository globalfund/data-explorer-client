/* third-party */
import React from "react";
import get from "lodash/get";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useStoreState } from "app/state/store/hooks";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { PageLoader } from "app/modules/common/page-loader";
import { InvestmentsRadialViz } from "app/modules/country-detail-module/sub-modules/overview/components/radial";

interface Props {
  openToolboxPanel: boolean;
}

export function LocationDetailOverviewModule(props: Props) {
  const cmsData = useCMSData({ returnData: true });
  const isSmallScreen = useMediaQuery("(max-width: 1279px)");

  const isLoading = useStoreState(
    (state) =>
      state.LocationDetailInfo.loading || state.cms.countrySummary.loading
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
      principalRecipients: [],
    })
  );
  const countrySummaryCMSData = useStoreState((state) =>
    get(state.cms.countrySummary, "data.entries[0].summary", null)
  );
  const notesDisclaimersCMSData = useStoreState((state) =>
    get(state.cms.notesAndDisclaimers, "data.entries[0].content", null)
  );

  React.useEffect(() => {
    document.body.style.background = "#F5F5F7";
    return () => {
      document.body.style.background = "#FFFFFF";
    };
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  const detailsBlock = (
    <Grid
      item
      xs={12}
      md={countrySummaryCMSData ? 12 : 4}
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
        {(locationInfoData.portfolioManager ||
          locationInfoData.portfolioManagerEmail) && (
          <React.Fragment>
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {get(cmsData, "modulesCountryDetail.fundManager", "")}
            </div>
            <div
              css={`
                font-size: 14px;
              `}
            >
              {locationInfoData.portfolioManager}
            </div>
            <a
              target="_blank"
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
            <hr />
          </React.Fragment>
        )}
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
            (mc: { name: string; code: string }) => {
              return (
                <Link to={`/location/${mc.code}/overview`} key={mc.name}>
                  {mc.name}
                </Link>
              );
            }
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
        {locationInfoData.principalRecipients &&
          locationInfoData.principalRecipients.length > 0 && (
            <div>
              <hr />
              <div
                css={`
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 8px;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `}
              >
                Principal Recipients in {locationInfoData.locationName}
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
                {locationInfoData.principalRecipients.map(
                  (pr: { name: string; code: string }) => (
                    <Link to={`/partner/${pr.code}/investments`} key={pr.name}>
                      {pr.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
      </div>
    </Grid>
  );

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
            margin-bottom: ${!countrySummaryCMSData ? "20px" : 0};
          }
        }
      `}
    >
      {countrySummaryCMSData && (
        <React.Fragment>
          {isSmallScreen && detailsBlock}
          <Grid
            item
            xs={12}
            lg={props.openToolboxPanel ? 7 : 8}
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
              <h3>Country overview description</h3>
              {parse(countrySummaryCMSData)}
              {notesDisclaimersCMSData && parse(notesDisclaimersCMSData)}
            </div>
          </Grid>
        </React.Fragment>
      )}
      <Grid
        item
        container
        xs={12}
        lg={countrySummaryCMSData ? (props.openToolboxPanel ? 5 : 4) : 12}
        justifyContent={countrySummaryCMSData ? undefined : "space-between"}
      >
        {(!countrySummaryCMSData || !isSmallScreen) && detailsBlock}
        <Grid
          item
          xs={12}
          md={countrySummaryCMSData ? 12 : 7}
          css={
            !countrySummaryCMSData
              ? `
            @media (min-width: 960px) {
              max-width: 65%;
              flex-basis: 65%;
            }
          `
              : `
                @media (min-width: 1280px) {
                  margin-top: 20px;
                }
              `
          }
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
