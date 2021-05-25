import React from "react";
import { css } from "styled-components/macro";
import { IndicatorToolTip } from "../ToolTip";

const styles = {
  table: css`
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;
  `,
  tablehead: css`
    th {
      padding: 9px 0;
      text-align: start;
      border-top: 1px solid #adb5bd;
      border-bottom: 1px solid #adb5bd;
    }
  `,
  tablebody: css`
    td {
      font-size: 10px;

      > span {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  `,
};

export function ResultsTable() {
  return (
    <div
      css={`
        font-size: 12px;
      `}
    >
      <b>
        Indicator: Percentage of sex workers that have received an HIV test
        during the reporting period and know their results
      </b>
      <table css={styles.table}>
        <thead css={styles.tablehead}>
          <tr>
            <th>Result type</th>
            <th>Baseline</th>
            <th>Target</th>
            <th>Result</th>
            <th>Achievement rate</th>
            <th>Reporting periods</th>
            <th> </th>
          </tr>
        </thead>
        <tbody css={styles.tablebody}>
          <ResultsTableRow />
          <ResultsTableRow />
          <ResultsTableRow />
        </tbody>
      </table>
    </div>
  );
}

function ResultsTableRow() {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <tr>
      <td>Percentage</td>
      <td>60%</td>
      <td>70%</td>
      <td>80%</td>
      <td>
        <div
          css={`
            gap: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          90%{" "}
          <div
            css={`
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffd646;
            `}
          />
        </div>
      </td>
      <td>01-01-2019 : 01-01-2020</td>
      <td>
        <IndicatorToolTip
          show={showTooltip}
          close={() => setShowTooltip(false)}
        >
          <span onClick={() => setShowTooltip(!showTooltip)}>More info</span>
        </IndicatorToolTip>
      </td>
    </tr>
  );
}
