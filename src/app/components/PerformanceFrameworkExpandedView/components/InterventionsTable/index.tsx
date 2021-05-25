import React from "react";
import { css } from "styled-components/macro";

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

export function InterventionsTable() {
  return (
    <div
      css={`
        font-size: 12px;
      `}
    >
      <b>Service delivery infrastructure</b>
      <table css={styles.table}>
        <thead css={styles.tablehead}>
          <tr>
            <th>Interventions</th>
            <th>Achievement rate</th>
            <th>Value text</th>
          </tr>
        </thead>
        <tbody css={styles.tablebody}>
          <tr>
            <td>
              Contracts for the work and supervision of the refurbishmentof the
              national reference laboratory (LNR)
            </td>
            <td></td>
            <td>
              Tender for works and supervision of the refurbishment of the
              national reference laboratory (LNR)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
