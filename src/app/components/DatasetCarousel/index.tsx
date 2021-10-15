import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import Carousel from "react-grid-carousel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { GeomapPreview } from "app/assets/dataset-preview/geomap";
import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { ResultsListPreview } from "app/assets/dataset-preview/resultsList";
import { InvestmentsBarPreview } from "app/assets/dataset-preview/investmentsBar";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";

const griditem = (content: React.ReactElement, link: string) => (
  <Link to={link} css="text-decoration: none;">
    <div
      css={`
        padding: 20px;
        height: 230px;
        color: #262c34;
        background: #fff;
        border-radius: 20px;
        border: 2px solid #fff;

        > div {
          margin-bottom: 10px;
        }

        > svg {
          width: calc(100% - 20px);
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
  return (
    <div
      css={`
        width: 100%;

        > div {
          > div:nth-of-type(2) {
            margin: 0;
          }
        }
      `}
    >
      <Carousel
        cols={3}
        rows={1}
        gap={10}
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
                <b>Finance</b> · Budgets Flow
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
                <b>Finance</b> · Budgets Time/Cycle
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/budgets/time-cycle"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Budgets Geomap
              </div>
              <GeomapPreview />
            </>,
            "/viz/budgets/geomap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Disbursements Treemap
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
                <b>Finance</b> · Disbursements Time/Cycle
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
                <b>Finance</b> · Disbursements Geomap
              </div>
              <GeomapPreview />
            </>,
            "/viz/disbursements/geomap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Signed Treemap
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
                <b>Finance</b> · Signed Time/Cycle
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
                <b>Finance</b> · Signed Geomap
              </div>
              <GeomapPreview />
            </>,
            "/viz/signed/geomap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Committments Treemap
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
                <b>Finance</b> · Committments Time/Cycle
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
                <b>Finance</b> · Commitments Geomap
              </div>
              <GeomapPreview />
            </>,
            "/viz/commitment/geomap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Pledges & Contributions Treemap
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
                <b>Finance</b> · Pledges & Contributions Time/Cycle
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
                <b>Finance</b> · Pledges & Contributions Geomap
              </div>
              <GeomapPreview />
            </>,
            "/viz/pledges-contributions/geomap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Allocations Radial
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
                <b>Finance</b> · Allocations Geomap
              </div>
              <GeomapPreview />
            </>,
            "/viz/allocations/geomap"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Other</b> · Eligibility
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
                <b>Grants</b>
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
                <b>Results</b>
              </div>
              <ResultsListPreview />
            </>,
            "/results"
          )}
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
