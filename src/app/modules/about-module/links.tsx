import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { appColors } from "app/theme";

export default function LinkList() {
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        top: 135px;
        position: sticky;
      `}
    >
      <div
        css={`
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 35px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "modulesAbout.linksTitle", "")}
      </div>
      <div
        css={`
          gap: 10px;
          width: 100%;
          display: flex;
          flex-direction: column;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-bottom: 10px;
              }
            }
          }

          > a {
            width: 100%;
            color: ${appColors.ABOUT_PAGE.LINK_COLOR};
            font-size: 14px;
            padding: 10px 0;
            font-weight: bold;
            text-align: center;
            background: ${appColors.ABOUT_PAGE.LINK_BACKGROUND_COLOR};
            border-radius: 20px;
            text-decoration: none;
            border: 1px solid ${appColors.ABOUT_PAGE.LINK_BORDER_COLOR};
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          }
        `}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.theglobalfund.org/en/methodology/"
        >
          {get(cmsData, "modulesAbout.linksResultMethodology", "")}
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.theglobalfund.org/en/legal/"
        >
          {get(cmsData, "modulesAbout.linksLegalDisclaimers", "")}
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.theglobalfund.org/en/site/privacy-statement/"
        >
          {get(cmsData, "modulesAbout.linksPrivacyStatements", "")}
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={`mailto:website@theglobalfund.org?subject=Data Explorer Feedback - URL: ${window.location}&body=User Feedback: `}
        >
          {get(cmsData, "modulesAbout.linksFeedback", "")}
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://data-service.theglobalfund.org/file_download/covid_approved_funding_report/pdf"
        >
          {get(cmsData, "modulesAbout.linksCovid", "")}
        </a>
      </div>
    </div>
  );
}
