import React from "react";
import { css } from "styled-components/macro";
import { useStoreState } from "app/state/store/hooks";
import {
  PFIndicator,
  PFIndicatorResult,
} from "app/components/PerformanceFrameworkExpandedView/data";
import { IndicatorToolTip } from "app/components/PerformanceFrameworkExpandedView/components/ToolTip";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

const styles = {
  table: css`
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;

    @media (max-width: 767px) {
      width: 700px;
      min-width: 700px;
      max-width: 700px;
    }
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
      font-size: 12px;

      > span {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  `,
};

export function ResultsTable(props: PFIndicator) {
  const selected = useStoreState(
    (state) => state.ToolBoxPanelPFPeriodState.value
  );
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        font-size: 12px;
      `}
    >
      <b>{get(cmsData, "componentsPerformanceFrameworkComponents.toolTipIndicator", "")}: {props.name}</b>
      <div
        css={`
          width: 100%;

          @media (max-width: 767px) {
            overflow-x: auto;
          }
        `}
      >
        <table css={styles.table}>
          <thead css={styles.tablehead}>
            <tr>
              <th>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableResultType", "")}</th>
              <th>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableBaseline", "")}</th>
              <th>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableTarget", "")}</th>
              <th>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableResult", "")}</th>
              <th>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableAchievementRate", "")}</th>
              <th>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableReportingPeriods", "")}</th>
              <th> </th>
            </tr>
          </thead>
          <tbody css={styles.tablebody}>
            {props.results.map((result: PFIndicatorResult, index: number) => (
              <ResultsTableRow
                key={result.period}
                selected={index === props.results.length - selected - 1}
                {...result}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ResultsTableRowProps extends PFIndicatorResult {
  selected: boolean;
}

function ResultsTableRow(props: ResultsTableRowProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const cmsData = useCMSData({ returnData: true });

  return (
    <tr
      css={`
        background-color: ${props.selected ? "#cfd4da" : "transparent"};
      `}
    >
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

            > * {
              @supports (-webkit-touch-callout: none) and
                (not (translate: none)) {
                &:not(:last-child) {
                  margin-right: 20px;
                }
              }
            }
          `}
        >
          <div
            css={`
              gap: 10px;
              display: flex;
              flex-direction: row;
              align-items: center;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 10px;
                  }
                }
              }

              > svg {
                transform: rotate(90deg);
                visibility: ${props.selected ? "visible" : "hidden"};
              }
            `}
          >
            <TriangleXSIcon />
            <div
              css={`
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${props.color === "#E2E2E2"
                  ? `repeating-linear-gradient(
                    -45deg,
                    #262c34 0 0.5px,
                    #fff 1.5px 2px
                    )`
                  : props.color};
              `}
            />
          </div>
          <div
            css={`
              min-width: 30px;
            `}
          >
            {props.achievementRate ? props.achievementRate : get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableNotAvailable", "")}
          </div>
        </div>
      </td>
      <td>{props.period}</td>
      <td>
        <IndicatorToolTip
          data={props}
          show={showTooltip}
          close={() => setShowTooltip(false)}
        >
          <span onClick={() => setShowTooltip(!showTooltip)}>{get(cmsData, "componentsPerformanceFrameworkComponents.resultsTableTooltip", "")}</span>
        </IndicatorToolTip>
      </td>
    </tr>
  );
}
