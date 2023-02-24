import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { css } from "styled-components/macro";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import { useCMSData } from "app/hooks/useCMSData";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import {
  PFIndicatorResult,
  PFIndicatorResultDisaggregation,
  PFIndicatorResultDisaggregationGroup,
} from "app/components/PerformanceFrameworkExpandedView/data";

const styles = {
  container: (showAggrs: boolean) => css`
    gap: 10px;
    width: 267px;
    display: flex;
    padding: 15px;
    color: ${appColors.NETWORK.TOOLTIP_CONTAINER_COLOR};
    font-size: 12px;
    position: relative;
    border-radius: 20px;
    flex-direction: column;
    background: ${showAggrs
      ? appColors.NETWORK.TOOLTIP_CONTAINER_BACKGROUND_COLOR_1
      : appColors.NETWORK.TOOLTIP_CONTAINER_BACKGROUND_COLOR_2};

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  `,
  header: css`
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  `,
  bottombtn: (showAggrs: boolean) => css`
    left: 0;
    gap: 15px;
    color: ${appColors.NETWORK.TOOLTIP_BOTTOM_BUTTON_TEXT_COLOR};
    width: 267px;
    display: flex;
    cursor: pointer;
    position: absolute;
    padding: 10px 15px;
    flex-direction: row;
    align-items: center;
    background: ${appColors.NETWORK.TOOLTIP_BOTTOM_BUTTON_BACKGROUND_COLOR};
    border-bottom: 1px solid
      ${appColors.NETWORK.TOOLTIP_BOTTOM_BUTTON_BORDER_COLOR};
    ${showAggrs ? "top" : "bottom"}: 0;
    border-bottom-style: ${showAggrs ? "solid" : "none"};
    border-radius: ${showAggrs ? "20px 20px 0px 0px" : "0px 0px 20px 20px"};

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }

    > svg {
      transform: rotate(${showAggrs ? 180 : 0}deg);

      > path {
        fill: ${appColors.COMMON.WHITE};
      }
    }

    > div {
      font-weight: bold;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    }

    > button {
      right: 10px;
      position: absolute;

      svg {
        path {
          fill: ${appColors.COMMON.WHITE};
        }
      }
    }
  `,
  aggregation: css`
    gap: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
    }

    > hr {
      width: 100%;
      border-color: ${appColors.COMMON.SECONDARY_COLOR_11};
    }

    > div {
      color: ${appColors.COMMON.WHITE};
      display: flex;
      flex-direction: row;

      &:nth-of-type(1) {
        gap: 10px;
        align-items: center;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 10px;
            }
          }
        }

        svg {
          transform: scale(0.7);

          path {
            fill: ${appColors.COMMON.WHITE};
          }
        }
      }

      &:nth-of-type(2) {
        gap: 20px;
        font-size: 10px;
        justify-content: space-between;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 20px;
            }
          }
        }
      }
    }
  `,
};

interface IndicatorToolTipProps {
  show: boolean;
  close: () => void;
  data: PFIndicatorResult;
  children: React.ReactElement;
}

export function IndicatorToolTip(props: IndicatorToolTipProps) {
  const [showAggrs, setShowAggrs] = React.useState(false);
  const cmsData = useCMSData({ returnData: true });

  return (
    <Tooltip
      interactive
      placement="bottom-end"
      title={
        <div css={styles.container(showAggrs)}>
          {!showAggrs ? (
            <React.Fragment>
              <div css={styles.header}>
                <div>
                  <b>
                    {get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.toolTipPeriod",
                      ""
                    )}
                    <br />
                    {props.data.period}
                  </b>
                </div>
                <IconButton size="small" onClick={() => props.close()}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div>
                <b>
                  {get(
                    cmsData,
                    "componentsPerformanceFrameworkComponents.toolTipIndicator",
                    ""
                  )}
                </b>
                : {props.data.isReversed}
              </div>
              <div>
                <b>
                  {get(
                    cmsData,
                    "componentsPerformanceFrameworkComponents.toolTipAggregationType",
                    ""
                  )}
                </b>
                : {props.data.aggregationType}
              </div>
              <div>
                <b>
                  {get(
                    cmsData,
                    "componentsPerformanceFrameworkComponents.toolTipCoverage",
                    ""
                  )}
                </b>
                : {props.data.coverage}
              </div>
              <div
                css={`
                  width: 100%;
                  height: 40px;
                `}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                css={`
                  width: 100%;
                  height: 20px;
                `}
              />
              {props.data.disaggregations.map(
                (disaggregation: PFIndicatorResultDisaggregationGroup) => (
                  <AggregationRow
                    key={disaggregation.name}
                    {...disaggregation}
                  />
                )
              )}
            </React.Fragment>
          )}
          {props.data.disaggregations.length > 0 && (
            <div
              css={styles.bottombtn(showAggrs)}
              onClick={() => setShowAggrs(!showAggrs)}
            >
              <TriangleXSIcon />
              <div>
                {showAggrs
                  ? get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.toolTipBack",
                      ""
                    )
                  : get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.toolTipSeeDisaggregations",
                      ""
                    )}
              </div>
              {showAggrs && (
                <IconButton size="small" onClick={() => props.close()}>
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>
      }
      open={props.show}
    >
      {props.children}
    </Tooltip>
  );
}

function AggregationRow(props: PFIndicatorResultDisaggregationGroup) {
  const [showDetails, setShowDetails] = React.useState(false);
  const cmsData = useCMSData({ returnData: true });

  return (
    <div css={styles.aggregation}>
      <div>
        <IconButton
          size="small"
          onClick={() => setShowDetails(!showDetails)}
          css={`
            transform: rotate(${showDetails ? 270 : 90}deg);
          `}
        >
          <ArrowForwardIcon />
        </IconButton>
        <div>{props.name}</div>
      </div>
      {showDetails && (
        <React.Fragment>
          {props.values.map((value: PFIndicatorResultDisaggregation) => (
            <React.Fragment key={value.category}>
              <div>
                <div>
                  <div>
                    {get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.toolTipCategory",
                      ""
                    )}
                  </div>
                  <br />
                  <div>{value.category}</div>
                </div>
                <div>
                  <div>
                    {get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.toolTipBaseline",
                      ""
                    )}
                  </div>
                  <br />
                  <div css="width: fit-content;">
                    {value.baseline.numerator || value.baseline.denominator ? (
                      <React.Fragment>
                        {value.baseline.numerator}
                        <hr />
                        {value.baseline.denominator}
                      </React.Fragment>
                    ) : (
                      value.baseline.percentage
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    {get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.toolTipReported",
                      ""
                    )}
                  </div>
                  <br />
                  <div css="width: fit-content;">
                    {value.reported.numerator || value.reported.denominator ? (
                      <React.Fragment>
                        {value.reported.numerator}
                        <hr />
                        {value.reported.denominator}
                      </React.Fragment>
                    ) : (
                      value.reported.percentage
                    )}
                  </div>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
