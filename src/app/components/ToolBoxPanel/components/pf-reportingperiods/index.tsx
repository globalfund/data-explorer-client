/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import useMeasure from "react-use/lib/useMeasure";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

export interface PerformanceFrameworkReportingPeriodsProps {
  periods: string[][];
}

export function PerformanceFrameworkReportingPeriods(
  props: PerformanceFrameworkReportingPeriodsProps
) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const setSelected = useStoreActions(
    (store) => store.ToolBoxPanelPFPeriodState.setValue
  );
  const selected = useStoreState(
    (state) => state.ToolBoxPanelPFPeriodState.value
  );

  function onDraggableStop(e: DraggableEvent, data: DraggableData) {
    const newSelectedIndex =
      props.periods.length -
      (width - data.lastX) / (width / props.periods.length);
    setSelected(Math.round(newSelectedIndex));
  }

  return (
    <div
      css={`
        gap: 12px;
        width: 100%;
        display: flex;
        padding: 15px 25px;
        flex-direction: column;
        border-bottom: 1px solid #dfe3e6;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 12px;
            }
          }
        }

        span {
          font-size: 12px;
        }
      `}
    >
      <b>Reporting Period</b>
      <div
        ref={ref}
        css={`
          width: 100%;
          height: 6px;
          display: flex;
          margin-top: 50px;
          position: relative;
          flex-direction: row;
          background: #231d2c;
          border-radius: 20px;

          > div:not(:first-child) {
            height: 100%;
            position: relative;
            width: calc(100% / ${props.periods.length});

            &:nth-of-type(2) {
              &::before {
                top: -8px;
                width: 2px;
                height: 4px;
                content: "";
                position: absolute;
                background: #c7cdd1;
              }
            }

            &::after {
              right: 0;
              top: -8px;
              width: 2px;
              height: 4px;
              content: "";
              position: absolute;
              background: #c7cdd1;
            }

            > div {
              top: -50px;
              width: 100%;
              position: absolute;
              text-align: center;

              > span {
                display: block;
                font-size: 10px;
                line-height: 16px;
              }
            }
          }
        `}
      >
        <Draggable
          axis="x"
          allowAnyClick
          bounds="parent"
          onStop={onDraggableStop}
          position={{
            x: selected * (width / props.periods.length),
            y: 0,
          }}
          grid={[width / props.periods.length, 0]}
        >
          <div
            css={`
              top: -2px;
              z-index: 15;
              background: #fff;
              cursor: ew-resize;
              border-radius: 4px;
              position: absolute;
              height: calc(100% + 4px);
              width: calc(100% / ${props.periods.length});
              box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
            `}
          />
        </Draggable>
        {props.periods.map((period: string[], index: number) => (
          <div
            css="cursor: pointer;"
            key={`${period[0]}-${period[1]}`}
            onClick={() => setSelected(index)}
          >
            <div>
              <span>{period[0]}</span>
              <span>{period[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
