import React from "react";

export interface PerformanceFrameworkReportingPeriodsProps {
  periods: string[][];
}

export function PerformanceFrameworkReportingPeriods(
  props: PerformanceFrameworkReportingPeriodsProps
) {
  return (
    <div
      css={`
        gap: 12px;
        width: 100%;
        display: flex;
        padding: 15px 25px;
        flex-direction: column;
        border-bottom: 1px solid #dfe3e6;

        span {
          font-size: 12px;
        }
      `}
    >
      <b>Reporting Period</b>
      <div
        css={`
          width: 100%;
          height: 6px;
          display: flex;
          flex-direction: row;
          background: #495057;
          border-radius: 20px;

          > span {
            height: 100%;
            width: calc(100% / ${props.periods.length});

            &::before {
            }
          }
        `}
      ></div>
    </div>
  );
}
