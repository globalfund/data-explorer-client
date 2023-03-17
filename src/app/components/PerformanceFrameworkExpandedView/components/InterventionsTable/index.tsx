import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import {
  PFIndicatorResultIntervention,
  PFIndicatorResultInterventionValue,
} from "app/components/PerformanceFrameworkExpandedView/data";

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
      border-top: 1px solid ${appColors.NETWORK.TABLE_BORDER_COLOR};
      border-bottom: 1px solid ${appColors.NETWORK.TABLE_BORDER_COLOR};
    }
  `,
  tablebody: css`
    td {
      padding: 5px;
      font-size: 10px;
      width: calc(100% / 3);
      border-top: 1px solid ${appColors.NETWORK.TABLE_BORDER_COLOR};
      border-bottom: 1px solid ${appColors.NETWORK.TABLE_BORDER_COLOR};
    }
  `,
};

export function InterventionsTable(props: PFIndicatorResultIntervention) {
  const cmsData = useCMSData({ returnData: true });

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
            <th>
              {get(
                cmsData,
                "componentsPerformanceFrameworkComponents.interventionTableInterventions",
                ""
              )}
            </th>
            <th>
              {get(
                cmsData,
                "componentsPerformanceFrameworkComponents.interventionTableAchievementRate",
                ""
              )}
            </th>
            <th>
              {get(
                cmsData,
                "componentsPerformanceFrameworkComponents.interventionTableValueText",
                ""
              )}
            </th>
          </tr>
        </thead>
        <tbody css={styles.tablebody}>
          {props.values.map((value: PFIndicatorResultInterventionValue) => (
            <tr key={`${value.name}${value.valueText}`}>
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
