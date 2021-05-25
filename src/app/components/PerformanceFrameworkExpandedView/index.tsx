import React from "react";
import { css } from "styled-components/macro";
import { ResultsTable } from "app/components/PerformanceFrameworkExpandedView/components/ResultsTable";
import { ArrowSelector } from "app/components/PerformanceFrameworkExpandedView/components/ArrowSelector";
import { InterventionsTable } from "./components/InterventionsTable";

const styles = {
  container: css`
    gap: 30px;
    display: flex;
    flex-direction: column;
  `,
  arrowscontainer: css`
    gap: 40px;
    display: flex;
    flex-direction: row;
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
    background: ${active ? "#495057" : "#C7CDD1"};

    :first-of-type {
      border-radius: 15px 0px 0px 0px;
    }

    :last-of-type {
      border-right-style: none;
      border-radius: 0px 15px 0px 0px;
    }

    &:hover {
      background: #495057;
      color: #fff;
      font-weight: bold;
    }
  `,
};

export function PerformanceFrameworkExpandedView() {
  const [tab, setTab] = React.useState(0);

  return (
    <div css={styles.container}>
      <div css={styles.arrowscontainer}>
        <ArrowSelector indicator="Coverage/Output" />
        <ArrowSelector indicator="Comprehensive prevention programs for MSM" />
      </div>
      <div
        css={`
          border-bottom: 1px solid #adb5bd;
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
          <ResultsTable />
          <ResultsTable />
        </React.Fragment>
      )}
      {tab === 1 && (
        <React.Fragment>
          <InterventionsTable />
        </React.Fragment>
      )}
    </div>
  );
}
