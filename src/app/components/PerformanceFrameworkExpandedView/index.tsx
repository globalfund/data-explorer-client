import React from "react";
import { css } from "styled-components/macro";
import { ResultsTable } from "app/components/PerformanceFrameworkExpandedView/components/ResultsTable";
import { ArrowSelector } from "app/components/PerformanceFrameworkExpandedView/components/ArrowSelector";
import { InterventionsTable } from "app/components/PerformanceFrameworkExpandedView/components/InterventionsTable";
import {
  PerformanceFrameworkExpandedViewProps,
  PFIndicator,
  PFIndicatorResultIntervention,
} from "app/components/PerformanceFrameworkExpandedView/data";

const styles = {
  container: css`
    gap: 30px;
    display: flex;
    flex-direction: column;

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 30px;
        }
      }
    }
  `,
  arrowscontainer: css`
    display: flex;
    flex-direction: row;

    @media (max-width: 767px) {
      width: 100%;

      > div {
        > div {
          max-width: 100%;
        }
      }
    }
  `,
  tabsList: css`
    display: flex;
    overflow-y: hidden;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 992px) {
      overflow-x: auto;
      margin-left: 36px;
    }

    @media (max-width: 767px) {
      margin: 0;
      width: 100%;
    }

    &::-webkit-scrollbar {
      width: 1px;
      height: 3px;
      background: #ededf6;
    }
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background: #ededf6;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #2e4063;
    }
  `,
  tabcss: (active: boolean) => css`
    height: 35px;
    display: flex;
    cursor: pointer;
    font-size: 14px;
    margin-right: 1px;
    padding: 10px 15px;
    white-space: nowrap;
    align-items: center;
    text-decoration: none;
    color: ${active ? "#fff" : "#13183F"};
    transition: background 0.2s ease-in-out;
    font-weight: ${active ? "bold" : "normal"};
    background: ${active ? "#262C34" : "#C7CDD1"};
    font-family: "GothamNarrow-${active ? "Bold" : "Book"}", "Helvetica Neue",
      sans-serif;

    :first-of-type {
      border-radius: 15px 0px 0px 0px;
    }

    :last-of-type {
      border-right-style: none;
      border-radius: 0px 15px 0px 0px;
    }

    &:hover {
      color: #fff;
      font-weight: bold;
      background: #231d2c;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    }

    @media (max-width: 767px) {
      width: 50%;
      justify-content: center;

      :first-of-type {
        border-radius: 20px 0px 0px 20px;
      }

      :last-of-type {
        border-right-style: none;
        border-radius: 0px 20px 20px 0px;
      }
    }
  `,
};

export function PerformanceFrameworkExpandedView(
  props: PerformanceFrameworkExpandedViewProps
) {
  const [tab, setTab] = React.useState(0);

  return (
    <div css={styles.container}>
      <div css={styles.arrowscontainer}>
        {/* <ArrowSelector selected="Coverage/Output" /> */}
        <ArrowSelector
          options={props.allModules}
          onChange={props.setSelectedModule}
          selected={props.selectedModule || ""}
        />
      </div>
      <div
        css={`
          border-bottom: 1px solid #adb5bd;

          @media (max-width: 767px) {
            border-bottom-style: none;
          }
        `}
      >
        <ul css={styles.tabsList}>
          <li css={styles.tabcss(tab === 0)} onClick={() => setTab(0)}>
            Indicator names
          </li>
          <li css={styles.tabcss(tab === 1)} onClick={() => setTab(1)}>
            Interventions
          </li>
        </ul>
      </div>
      {tab === 0 && (
        <React.Fragment>
          {props.indicators.map((indicator: PFIndicator) => (
            <ResultsTable key={indicator.name} {...indicator} />
          ))}
        </React.Fragment>
      )}
      {tab === 1 && (
        <React.Fragment>
          {props.interventions.map(
            (intervention: PFIndicatorResultIntervention) => (
              <InterventionsTable key={intervention.name} {...intervention} />
            )
          )}
        </React.Fragment>
      )}
    </div>
  );
}
