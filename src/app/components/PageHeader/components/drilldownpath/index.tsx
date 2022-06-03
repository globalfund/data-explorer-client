import React from "react";
import { css } from "styled-components/macro";
import { DrilldownModel } from "app/interfaces";
import { useStoreState } from "app/state/store/hooks";

const styles = {
  drilldowns: css`
    gap: 3px;
    display: flex;
    width: fit-content;
    flex-direction: row;

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 3px;
        }
      }
    }

    @media (max-width: 767px) {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
    }
  `,
  drilldownitem: (index: number) => css`
    color: #fff;
    font-size: 10px;
    padding: 2px 20px;
    margin-right: 6px;
    line-height: 15px;
    position: relative;
    background: #373d43;

    &::after {
      top: 0;
      width: 0;
      height: 0;
      left: 100%;
      content: "";
      display: block;
      position: absolute;
      border-style: solid;
      border-width: 9px 0 10px 9px;
      border-color: rgba(0, 0, 0, 0) #373d43;
    }

    ${index > 0
      ? `
    &::before {
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      content: "";
      display: block;
      position: absolute;
      border-style: solid;
      border-width: 9px 0 10px 9px;
      border-color: rgba(0, 0, 0, 0) #ffffff;
    }
  `
      : ""}
  `,
  drilldowntext: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export function DrilldownPath() {
  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
  );

  return (
    <div css={styles.drilldowns}>
      {vizDrilldowns.length > 1 &&
        vizDrilldowns.map((item: DrilldownModel, index: number) => (
          <div css={styles.drilldownitem(index)} key={item.name}>
            <div css={styles.drilldowntext}>{item.name}</div>
          </div>
        ))}
    </div>
  );
}
