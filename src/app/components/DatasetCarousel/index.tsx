import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
// @ts-ignore
import Carousel from "react-grid-carousel";
import { useMediaQuery } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { ResultsListPreview } from "app/assets/dataset-preview/resultsList";
import { DocumentsTablePreview } from "app/assets/dataset-preview/documentsTable";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";

const griditem = (content: React.ReactElement, link: string) => (
  <Link to={link} css="text-decoration: none;">
    <div
      css={`
        padding: 20px;
        height: 260px;
        color: #231d2c;
        background: #fff;
        border-radius: 20px;
        border: 2px solid #fff;

        @media (max-width: 767px) {
          height: 205px;
        }

        > div {
          font-weight: bold;
          margin-bottom: 10px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        }

        > svg {
          width: 100%;
          height: calc(100% - 30px);
        }

        &:hover {
          border-color: #13183f;
        }
      `}
    >
      {content}
    </div>
  </Link>
);

export function DatasetCarousel() {
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const cmsData = useCMSData({ returnData: true });

  const fpText = {
    __html: get(
      cmsData,
      "componentsDatasetCarousel.financePledgesContributions",
      ""
    ),
  };
  const fsText = {
    __html: get(cmsData, "componentsDatasetCarousel.financeSignedAmounts", ""),
  };
  const fcText = {
    __html: get(cmsData, "componentsDatasetCarousel.financeCommitments", ""),
  };
  const fdText = {
    __html: get(cmsData, "componentsDatasetCarousel.financeDisbursements", ""),
  };
  const fbText = {
    __html: get(cmsData, "componentsDatasetCarousel.financeBudgets", ""),
  };
  const aeText = {
    __html: get(cmsData, "componentsDatasetCarousel.accessEligibility", ""),
  };
  const aaText = {
    __html: get(cmsData, "componentsDatasetCarousel.accessAllocations", ""),
  };

  return (
    <div
      css={`
        width: 100%;

        > div {
          > div:nth-of-type(2) {
            margin: 0;
          }
          > div:nth-of-type(3) {
            padding-top: ${isSmallScreen ? "10px" : 0};
          }
        }
      `}
    >
      <Carousel
        cols={isSmallScreen ? 2 : 3}
        rows={1}
        gap={10}
        hideArrow={isSmallScreen ? true : undefined}
        showDots={isSmallScreen ? true : undefined}
        containerStyle={{ width: "100%" }}
        arrowLeft={
          <div
            css={`
              width: 30px;
              left: -40px;
              height: 30px;
              display: flex;
              position: absolute;
              align-items: center;
              top: calc(50% - 15px);
              justify-content: center;

              &:hover {
                cursor: pointer;
                border-radius: 50%;
                background: #98a1aa;
              }

              > svg {
                transform: rotate(-180deg);
              }
            `}
          >
            <ArrowForwardIcon />
          </div>
        }
        arrowRight={
          <div
            css={`
              width: 30px;
              height: 30px;
              right: -40px;
              display: flex;
              position: absolute;
              align-items: center;
              top: calc(50% - 15px);
              justify-content: center;

              &:hover {
                cursor: pointer;
                border-radius: 50%;
                background: #98a1aa;
              }
            `}
          >
            <ArrowForwardIcon />
          </div>
        }
      >
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={fpText} />
              </div>
              <InvestmentsTreemapPreview />
            </>,
            "/viz/pledges-contributions/treemap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={fsText} />
              </div>
              <InvestmentsTreemapPreview />
            </>,
            "/viz/signed/treemap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={fcText} />
              </div>
              <InvestmentsTreemapPreview />
            </>,
            "/viz/commitment/treemap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={fdText} />
              </div>
              <InvestmentsTreemapPreview />
            </>,
            "/viz/disbursements/treemap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={fbText} />
              </div>
              <BudgetFlowPreview />
            </>,
            "/viz/budgets/flow"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={aeText} />
              </div>
              <EligibilityDotsPreview />
            </>,
            "/viz/eligibility"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <div dangerouslySetInnerHTML={aaText} />
              </div>
              <AllocationsRadialPreview />
            </>,
            "/viz/allocations"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>{get(cmsData, "componentsDatasetCarousel.grants", "")}</b>
              </div>
              <GrantsListPreview />
            </>,
            "/grants"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>{get(cmsData, "componentsDatasetCarousel.results", "")}</b>
              </div>
              <ResultsListPreview />
            </>,
            "/results"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>{get(cmsData, "componentsDatasetCarousel.documents", "")}</b>
              </div>
              <DocumentsTablePreview />
            </>,
            "/documents"
          )}
        </Carousel.Item>
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Budgets Time cycle
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/budgets/time-cycle"
          )}
        </Carousel.Item> */}
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Budgets Map
              </div>
              <GeomapPreview />
            </>,
            "/viz/budgets/map"
          )}
        </Carousel.Item> */}
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Disbursements Time cycle
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/disbursements/time-cycle"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Disbursements Map
              </div>
              <GeomapPreview />
            </>,
            "/viz/disbursements/map"
          )}
        </Carousel.Item> */}
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Signed Time cycle
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/signed/time-cycle"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Signed Map
              </div>
              <GeomapPreview />
            </>,
            "/viz/signed/map"
          )}
        </Carousel.Item> */}
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Commitments Time cycle
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/commitment/time-cycle"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Commitments Map
              </div>
              <GeomapPreview />
            </>,
            "/viz/commitment/map"
          )}
        </Carousel.Item> */}
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Pledges & Contributions Time cycle
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/pledges-contributions/time-cycle"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Pledges & Contributions Map
              </div>
              <GeomapPreview />
            </>,
            "/viz/pledges-contributions/map"
          )}
        </Carousel.Item> */}
        {/* <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Allocations Map
              </div>
              <GeomapPreview />
            </>,
            "/viz/allocations/map"
          )}
        </Carousel.Item> */}
      </Carousel>
    </div>
  );
}
