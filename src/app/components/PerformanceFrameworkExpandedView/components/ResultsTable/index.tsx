import React from "react";
import { css } from "styled-components/macro";
import {
  PFIndicator,
  PFIndicatorResult,
} from "app/components/PerformanceFrameworkExpandedView/data";
import { IndicatorToolTip } from "app/components/PerformanceFrameworkExpandedView/components/ToolTip";

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

interface ResultsTableProps extends PFIndicator {}

export function ResultsTable(props: ResultsTableProps) {
  return (
    <div
      css={`
        font-size: 12px;
      `}
    >
      <b>Indicator: {props.name}</b>
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
          {props.results.map((result: PFIndicatorResult) => (
            <ResultsTableRow key={result.period} {...result} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ResultsTableRowProps extends PFIndicatorResult {}

function ResultsTableRow(props: ResultsTableRowProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.baseline}</td>
      <td>{props.target}</td>
      <td>{props.result}</td>
      <td>
        <div
          css={`
            gap: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          {props.achievementRate}{" "}
          <div
            css={`
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${props.color};
            `}
          />
        </div>
      </td>
      <td>{props.period}</td>
      <td>
        <IndicatorToolTip
          data={props}
          show={showTooltip}
          close={() => setShowTooltip(false)}
        >
          <span onClick={() => setShowTooltip(!showTooltip)}>More info</span>
        </IndicatorToolTip>
      </td>
    </tr>
  );
}
