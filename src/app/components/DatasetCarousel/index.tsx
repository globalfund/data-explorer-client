import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import Carousel from "react-grid-carousel";

import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { InvestmentsBarPreview } from "app/assets/dataset-preview/investmentsBar";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";

interface DatasetCarouselProps {}

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
          border-color: #2e4df9;
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
                <b>Finance</b> · Budgets
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
                <b>Finance</b> · Investments
              </div>
              <InvestmentsBarPreview />
            </>,
            "/viz/investments/time-cycle"
          )}
        </Carousel.Item>
        <Carousel.Item>
          {griditem(
            <>
              <div>
                <b>Finance</b> · Allocations
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
                <b>Finance</b> · Investments
              </div>
              <InvestmentsTreemapPreview />
            </>,
            "/viz/investments/disbursements"
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
      </Carousel>
    </div>
  );
}
