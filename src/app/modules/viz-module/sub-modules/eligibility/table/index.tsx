import React from "react";
import { appColors } from "app/theme";
import { AccessToFundingEligibilityTableWrapper } from "app/modules/viz-module/sub-modules/accessToFunding/eligibility/tableWrapper";

export function EligibilityTableModuleWrapper() {
  return (
    <React.Fragment>
      <div
        css={`
          padding: 40px 0;
          text-align: center;
        `}
      >
        <h1
          css={`
            font-size: 24px;
            font-weight: 700;
            line-height: 24px;
            margin: 0 0 10px 0;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Access to Funding
        </h1>
        <h2
          css={`
            font-size: 18px;
            font-weight: 700;
            line-height: 20px;
            margin: 0 0 16px 0;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Eligibility
        </h2>
        <div
          css={`
            p {
              width: 50%;
              margin: 0 auto;
              font-size: 14px;
              line-height: 17px;
              color: ${appColors.COMMON.PRIMARY_COLOR_1};

              @media (max-width: 768px) {
                width: 90%;
              }
            }
          `}
        >
          <p>
            Below are the components which are eligible for an allocation for
            the selected allocation period, according to the Global Fund
            Eligibility Policy. Eligibility does not guarantee a funding
            allocation. Learn more about Eligibility{" "}
            <a
              target="_blank"
              href="https://www.theglobalfund.org/en/applying-for-funding/understand-and-prepare/eligibility/"
            >
              here
            </a>
          </p>
        </div>
      </div>
      <AccessToFundingEligibilityTableWrapper />
    </React.Fragment>
  );
}
