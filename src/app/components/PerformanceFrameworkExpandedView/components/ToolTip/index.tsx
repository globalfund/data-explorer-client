import React from "react";
import { css } from "styled-components/macro";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";

const styles = {
  container: (showAggrs: boolean) => css`
    gap: 10px;
    width: 250px;
    display: flex;
    padding: 15px;
    color: #262c34;
    font-size: 12px;
    position: relative;
    border-radius: 20px;
    flex-direction: column;
    background: ${showAggrs ? "#495057" : "#fff"};
  `,
  header: css`
    gap: 10px;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
  `,
  bottombtn: (showAggrs: boolean) => css`
    left: 0;
    gap: 15px;
    color: #fff;
    width: 250px;
    display: flex;
    cursor: pointer;
    position: absolute;
    padding: 10px 15px;
    flex-direction: row;
    align-items: center;
    background: #495057;
    border-bottom: 1px solid #fff;
    ${showAggrs ? "top" : "bottom"}: 0;
    border-bottom-style: ${showAggrs ? "solid" : "none"};
    border-radius: ${showAggrs ? "20px 20px 0px 0px" : "0px 0px 20px 20px"};

    > svg {
      transform: rotate(${showAggrs ? 180 : 0}deg);

      > path {
        fill: #fff;
      }
    }

    > div {
      font-weight: bold;
    }

    > button {
      right: 10px;
      position: absolute;

      svg {
        path {
          fill: #fff;
        }
      }
    }
  `,
  aggregation: css`
    gap: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;

    > hr {
      width: 100%;
      border-color: #c7cdd1;
    }

    > div {
      color: #fff;
      display: flex;
      flex-direction: row;

      &:nth-of-type(1) {
        gap: 10px;
        align-items: center;

        svg {
          transform: scale(0.7);

          path {
            fill: #fff;
          }
        }
      }

      &:nth-of-type(2) {
        gap: 20px;
        font-size: 10px;
        justify-content: space-between;
      }
    }
  `,
};

interface IndicatorToolTipProps {
  show: boolean;
  close: () => void;
  children: React.ReactElement;
}

export function IndicatorToolTip(props: IndicatorToolTipProps) {
  const [showAggrs, setShowAggrs] = React.useState(false);

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
                  <b>Reporting period: 01-01-2019 : 01-01-2020</b>
                </div>
                <IconButton size="small" onClick={() => props.close()}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div>
                <b>Is Indicator reversed?</b>: No
              </div>
              <div>
                <b>Aggregation type</b>: Non cumulative
              </div>
              <div>
                <b>Coverage</b>: National
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
              <AggregationRow />
              <AggregationRow />
            </React.Fragment>
          )}
          <div
            css={styles.bottombtn(showAggrs)}
            onClick={() => setShowAggrs(!showAggrs)}
          >
            <TriangleXSIcon />
            <div>{showAggrs ? "Back" : "See Disaggregations"}</div>
            {showAggrs && (
              <IconButton size="small" onClick={() => props.close()}>
                <CloseIcon />
              </IconButton>
            )}
          </div>
        </div>
      }
      open={props.show}
    >
      {props.children}
    </Tooltip>
  );
}

function AggregationRow() {
  const [showDetails, setShowDetails] = React.useState(false);

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
        <div>Aggregation</div>
      </div>
      {showDetails && (
        <React.Fragment>
          <div>
            <div>
              <div>Category</div>
              <br />
              <div>{"<"}15</div>
            </div>
            <div>
              <div>Baseline</div>
              <br />
              <div>
                111
                <hr />0
              </div>
            </div>
            <div>
              <div>Reported</div>
              <br />
              <div>
                111
                <hr />0
              </div>
            </div>
          </div>
          <hr />
        </React.Fragment>
      )}
    </div>
  );
}
