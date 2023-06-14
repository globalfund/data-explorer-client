/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { Link } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
import { Grid, useMediaQuery } from "@material-ui/core";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { LocationIcon } from "app/assets/icons/Location";
import { ComponentIcon } from "app/assets/icons/Component";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
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
      document.body.style.background = "pink";
    };
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  // const detailsBlock = (
  //   <Grid
  //     item
  //     xs={12}
  //     md={countrySummaryCMSData ? 12 : 4}
  //     css={`
  //       hr {
  //         opacity: 0.3;
  //         margin: 20px 0;
  //         margin-left: -24px;
  //         width: calc(100% + 48px);
  //         border-color: ${appColors.COMMON.SECONDARY_COLOR_7};
  //       }
  //     `}
  //   >
  //     <div>
  //       {(locationInfoData.portfolioManager ||
  //         locationInfoData.portfolioManagerEmail) && (
  //         <React.Fragment>
  //           <div
  //             css={`
  //               font-size: 14px;
  //               font-weight: bold;
  //               font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  //             `}
  //           >
  //             {get(cmsData, "modulesCountryDetail.fundManager", "")}
  //           </div>
  //           <div
  //             css={`
  //               font-size: 14px;
  //             `}
  //           >
  //             {locationInfoData.portfolioManager}
  //           </div>
  //           <a
  //             target="_blank"
  //             href={`mailto:${locationInfoData.portfolioManagerEmail}`}
  //             css={`
  //               font-size: 14px;
  //               text-decoration: none;

  //               &:hover {
  //                 text-decoration: underline;
  //               }
  //             `}
  //           >
  //             {locationInfoData.portfolioManagerEmail}
  //           </a>
  //           <hr />
  //         </React.Fragment>
  //       )}
  //       <div
  //         css={`
  //           font-size: 14px;
  //           margin-bottom: 8px;
  //         `}
  //       >
  //         {locationInfoData.coordinatingMechanismContacts?.length > 0 && (
  //           <React.Fragment>
  //             <button
  //               onClick={() => setContactsExpanded(!contactsExpanded)}
  //               css={`
  //                 padding: 0;
  //                 width: 100%;
  //                 display: flex;
  //                 cursor: pointer;
  //                 font-size: 14px;
  //                 text-align: start;
  //                 border-style: none;
  //                 align-items: center;
  //                 background: transparent;
  //                 flex-direction: space-between;

  //                 > svg {
  //                   transition: all 0.2s ease-in-out;
  //                   transform: rotate(${contactsExpanded ? -90 : 90}deg);
  //                 }
  //               `}
  //             >
  //               <b>
  //                 {" "}
  //                 {get(
  //                   cmsData,
  //                   "modulesCountryDetail.mechanismContactsLabel",
  //                   ""
  //                 )}
  //               </b>
  //               <ChevronRight />
  //             </button>
  //             <Collapse in={contactsExpanded}>
  //               <div
  //                 css={`
  //                   height: 20px;
  //                 `}
  //               />
  //               {locationInfoData.coordinatingMechanismContacts.map(
  //                 (c: any) => {
  //                   const groupedByRole = groupBy(c.items, "role");
  //                   return (
  //                     <div key={c.name}>
  //                       <div
  //                         css={`
  //                           margin-bottom: 8px;
  //                         `}
  //                       >
  //                         <b>{c.name}</b>
  //                       </div>
  //                       <div
  //                         css={`
  //                           padding-left: 20px;
  //                         `}
  //                       >
  //                         {Object.keys(groupedByRole).map((r: any) => (
  //                           <div
  //                             key={r}
  //                             css={`
  //                               margin-bottom: 8px;
  //                             `}
  //                           >
  //                             <b>
  //                               {r}
  //                               {groupedByRole[r].length > 1 && "s"}
  //                             </b>
  //                             <br />
  //                             {groupedByRole[r].map((i: any) => (
  //                               <div
  //                                 key={i.surname}
  //                                 css={`
  //                                   margin-bottom: 8px;
  //                                 `}
  //                               >
  //                                 {i.salutation} {i.name} {i.surname}
  //                                 <br />
  //                                 {i.position}
  //                                 {i.position && <br />}
  //                                 <a href={`mailto:${i.email}`}>{i.email}</a>
  //                               </div>
  //                             ))}
  //                           </div>
  //                         ))}
  //                       </div>
  //                     </div>
  //                   );
  //                 }
  //               )}
  //             </Collapse>
  //             <hr />
  //           </React.Fragment>
  //         )}
  //       </div>
  //       <div
  //         css={`
  //           font-size: 14px;
  //           font-weight: bold;
  //           margin-bottom: 8px;
  //           font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  //         `}
  //       >
  //         {locationInfoData.multicountries.length > 0 &&
  //           `Multicountries with ${locationInfoData.locationName}`}
  //         {locationInfoData.countries.length > 0 &&
  //           `Countries in ${locationInfoData.locationName}`}
  //       </div>
  //       <div
  //         css={`
  //           display: ${locationInfoData.countries.length > 0
  //             ? "inline-block"
  //             : "flex"};
  //           margin-bottom: 20px;
  //           flex-direction: column;

  //           > a {
  //             width: fit-content;
  //             text-decoration: none;

  //             &:hover {
  //               text-decoration: underline;
  //             }
  //           }
  //         `}
  //       >
  //         {locationInfoData.multicountries.map(
  //           (mc: { name: string; code: string }) => {
  //             return (
  //               <Link to={`/location/${mc.code}/overview`} key={mc.name}>
  //                 {mc.name}
  //               </Link>
  //             );
  //           }
  //         )}
  //         {locationInfoData.countries.map(
  //           (c: { name: string; code: string }, index: number) => (
  //             <React.Fragment key={c.name}>
  //               <Link to={`/location/${c.code}/overview`}>{c.name}</Link>
  //               {index < locationInfoData.countries.length - 1 && ", "}
  //             </React.Fragment>
  //           )
  //         )}
  //       </div>
  //       {locationInfoData.principalRecipients &&
  //         locationInfoData.principalRecipients.length > 0 && (
  //           <div>
  //             <hr />
  //             <div
  //               css={`
  //                 font-size: 14px;
  //                 font-weight: bold;
  //                 margin-bottom: 8px;
  //                 font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  //               `}
  //             >
  //               {get(
  //                 cmsData,
  //                 "modulesCountryDetail.PrincipalRecipientsLabel",
  //                 ""
  //               )}{" "}
  //               {locationInfoData.locationName}
  //             </div>
  //             <div
  //               css={`
  //                 display: flex;
  //                 flex-direction: column;

  //                 > a {
  //                   width: fit-content;
  //                   text-decoration: none;

  //                   &:hover {
  //                     text-decoration: underline;
  //                   }
  //                 }
  //               `}
  //             >
  //               {locationInfoData.principalRecipients.map(
  //                 (pr: { name: string; code: string }) => (
  //                   <Link to={`/partner/${pr.code}/investments`} key={pr.name}>
  //                     {pr.name}
  //                   </Link>
  //                 )
  //               )}
  //             </div>
  //           </div>
  //         )}
  //     </div>
  //   </Grid>
  // );

  return (
    <Grid
      container
      spacing={2}
      css={`
        * {
          color: ${appColors.COMMON.PRIMARY_COLOR_1};
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
            <h3> Goals</h3>
            To ensure that Albania remains a low prevalence country for TB and
            HIV
          </div>
          <div>
            {" "}
            <h3>Objectives</h3>
            Objectives Ensure sustainable response to HIV through strengthening
            coordination, leadership and financial and political commitment of
            the Government To ensure equitable access to high quality TB and HIV
            prevention, treatment, care and support with a focus on key affected
            populations (MSM, PWID, SW, PLWHA and other vulnerable people most
            affected by the HIV and TB epidemic) To strengthen the health and
            community systems that enable needs-based, evidence-based and
            cost-effective prevention interventions for key populations mostly
            affected by the HIV and TB epidemic.
          </div>
        </Grid>
      </React.Fragment>

      <Grid
        item
        container
        xs={12}
        lg={4}
        // justifyContent={countrySummaryCMSData ? undefined : "space-between"}
      >
        {/* {(!countrySummaryCMSData || !isSmallScreen) && detailsBlock} */}
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
