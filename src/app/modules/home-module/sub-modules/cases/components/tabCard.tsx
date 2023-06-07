import { Grid } from "@material-ui/core";
import React from "react";
import AboutCard from "app/modules/home-module/assets/about-card.png";
import GrantsCard from "app/modules/home-module/assets/grants-card.png";
import BudgetsCard from "app/modules/home-module/assets/budgets-card.png";
import PerfomanceCard from "app/modules/home-module/assets/performance-card.png";
import { TabCardEllipseCss } from "app/modules/home-module/sub-modules/cases/style";
import { ReactComponent as FullEliipse } from "app/modules/home-module/assets/full-light-ellipse.svg";

export default function TabCard(props: {
  src: string;
  alt: string;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <>
      <div
        css={`
          position: relative;
          z-index: 1;
          background: linear-gradient(180deg, #a4a0ff -61.62%, #f8fcfc 114.5%);
          border-radius: 29px;
          margin-top: 41px;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 39px;
          font-family: "Gotham Narrow Bold", sans-serif;
          padding: 72px 40px 100px 88px;
          color: #231d2c;

          a {
            text-decoration: none;
            color: #231d2c;
            border-bottom: 1px solid #231d2c;
            cursor: pointer;
          }
          div:nth-child(1) {
            width: 60%;
            img {
              height: 363px;
              object-fit: contain;
              position: relative;
              z-index: 2;
            }
          }
          h4 {
            font-size: 24px;
            line-height: 29px;
            margin: 0;
          }
          p {
            font-family: "Gotham Narrow Light", sans-serif;
            white-space: pre-line;
            font-weight: 400;
            line-height: 19px;
          }
          @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      >
        <div>
          <img src={props.src} alt={props.alt} />
        </div>
        <div>
          <h4>
            <b>{props.title}</b>
          </h4>
          {props.description}
        </div>
        <FullEliipse css={TabCardEllipseCss} />
      </div>
    </>
  );
}

export const AboutTabCard = () => {
  const description = (
    <div>
      The Global Fund&apos;s Data Explorer is one of the key transparency tools
      of the organization.
      <br />
      <br /> The Data Explorer visualizes where investments come from, where
      they are and what they achieve by providing pledge and contribution data,
      grant financial data, and results data at global, regional and country
      levels.
      <br /> <br />
      <a
        href="https://data.theglobalfund.org/"
        rel="noreferrer noopener"
        target="_blank"
      >
        Visit the Global Fund Data Explorer
      </a>
    </div>
  );
  return (
    <TabCard
      src={AboutCard}
      alt="about_snippet"
      title="The Global Fund Data Explorer"
      description={description}
    />
  );
};

export const GrantsTabCard = () => {
  const description = (
    <p>
      The effective implementation and monitoring of thousands of grants is at
      the core of the Global Funds work to end HIV, TB and malaria as epidemics.
      All collected grant data is presented via the Data Explorer.
      <br />
      <br />
      LiveView of the Grant Implementation on the Global Fund Data Explorer
    </p>
  );
  return (
    <TabCard
      src={GrantsCard}
      alt="grants_snippet"
      title="Grant Implementation Period"
      description={description}
    />
  );
};

export const BudgetsTabCard = () => {
  const description = (
    <p>
      The Global Fund applies strict budget requirements during the development,
      review and implementation of Global Fund-supported programs. It
      establishes clear eligibility criteria for grant expenditures and
      requirements for monitoring and financial reporting obligations.
      <br /> <br /> All collected financial reporting data on budgets including
      investment landscapes and corresponding cost categories is presented via
      the Data Explorer.\n\nLiveView of the Budget Flow on the Global Fund Data
      Explorer
    </p>
  );
  return (
    <TabCard
      src={BudgetsCard}
      alt="budgets_snippet"
      title="Grant Budgeting"
      description={description}
    />
  );
};
export const PerformanceTabCard = () => {
  const description = (
    <p>
      The Global Fund requires countries to report grant performance indicators
      on funded programs. The data provided by national monitoring and
      evaluation systems is critical to informing decision-making on the part of
      both implementers and funders.\n\nAll collected performance data on funded
      programs is presented via the Data Explorer.
      <br />
      <br /> LiveView of the XXXX
    </p>
  );
  return (
    <TabCard
      src={PerfomanceCard}
      alt="performance_snippet"
      title="Performance Framework"
      description={description}
    />
  );
};
