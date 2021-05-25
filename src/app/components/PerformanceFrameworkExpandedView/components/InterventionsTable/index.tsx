import React from "react";
import { css } from "styled-components/macro";
import {
  PFIndicatorResult,
  PFIndicatorResultIntervention,
  PFIndicatorResultInterventionValue,
} from "../../data";

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
      padding: 5px;
      font-size: 10px;
      width: calc(100% / 3);
      border-top: 1px solid #adb5bd;
      border-bottom: 1px solid #adb5bd;
    }
  `,
};

export function InterventionsTable(props: PFIndicatorResultIntervention) {
  return (
    <div
      css={`
        font-size: 12px;
      `}
    >
      <b>{props.name}</b>
      <table css={styles.table}>
        <thead css={styles.tablehead}>
          <tr>
            <th>Interventions</th>
            <th>Achievement rate</th>
            <th>Value text</th>
          </tr>
        </thead>
        <tbody css={styles.tablebody}>
          {props.values.map((value: PFIndicatorResultInterventionValue) => (
            <tr key={value.name}>
              <td>{value.name}</td>
              <td>{value.achievementRate}</td>
              <td>{value.valueText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
