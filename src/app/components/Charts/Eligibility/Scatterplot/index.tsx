import React from "react";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { useStoreState } from "app/state/store/hooks";
import { ResponsiveScatterPlot, Value } from "@nivo/scatterplot";
import {
  incomeLevels,
  diseaseBurdens,
  EligibilityScatterplotHoveredNode,
  ScatterPlotProps,
  EligibilityScatterplotDataModel,
} from "app/components/Charts/Eligibility/Scatterplot/data";
import {
  ScatterplotNode,
  backCircleRadius,
} from "app/components/Charts/Eligibility/Scatterplot/components/node";
import { NoDataLabel } from "../../common/nodatalabel";

const styles = {
  Eligible: css`
    background: #262c34;
    border: 1px solid #adb5bd;
  `,
  "Not Eligible": css`
    background: #adb5bd;
    border: 1px solid #262c34;
  `,
  "Transition Funding": css`
    border: 1px dashed #262c34;
  `,
};

export function ScatterPlot(props: ScatterPlotProps) {
  const [
    hoveredNode,
    setHoveredNode,
  ] = React.useState<EligibilityScatterplotHoveredNode | null>(null);
  const [hoveredLegend, setHoveredLegend] = React.useState<
    "Eligible" | "Not Eligible" | "Transition Funding" | null
  >(null);
  const [hoveredBurdenLegend, setHoveredBurdenLegend] = React.useState<
    | "Extreme"
    | "Severe"
    | "High"
    | "Not High"
    | "Moderate"
    | "Low"
    | "None"
    | null
  >(null);
  const [hoveredIncomeLegend, setHoveredIncomeLegend] = React.useState<
    | "None"
    | "Low"
    | "Low income"
    | "Lower-Lower middle income"
    | "Lower middle income"
    | "Upper-Lower middle income"
    | "Upper middle income"
    | "High income"
    | null
  >(null);
  const showExtraData = useStoreState(
    (state) => state.ToolBoxPanelEligibilityAdvancedCheckboxState.value
  );

  const Nodes = (nProps: any) => {
    return filter(
      nProps.nodes,
      (node: any) => node.data.y.trim().length > 0
    ).map((node: any) => {
      return (
        <ScatterplotNode
          x={node.x}
          y={node.y}
          key={node.id}
          data={node.data}
          hovered={hoveredNode}
          onHover={setHoveredNode}
          showExtraData={showExtraData}
          hoveredEligibilityLegend={hoveredLegend}
          hoveredBurdenLegend={hoveredBurdenLegend}
          hoveredIncomeLegend={hoveredIncomeLegend}
        />
      );
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      const scrollableDiv = document.getElementById("scatterplot-scroll-div");
      if (scrollableDiv) {
        scrollableDiv.scroll({
          left: scrollableDiv.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 500);
  }, []);

  const noData =
    filter(
      props.data,
      (item: EligibilityScatterplotDataModel) =>
        item.id.toString().trim().length > 0
    ).length === 0;

  return (
    <React.Fragment>
      {hoveredNode && (
        <div
          css={`
            z-index: 100;
            padding: 12px;
            color: #262c34;
            position: absolute;
            background: #f5f5f7;
            border-radius: 20px;
            top: ${hoveredNode.yPosition + 12}px;
            left: ${hoveredNode.xPosition + 12}px;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.1);
          `}
        >
          <div
            css={`
              font-weight: bold;
            `}
          >
            {hoveredNode.x} - {hoveredNode.y}
          </div>
          <div>Eligibility: {hoveredNode.eligibility}</div>
          <div>Disease Burden: {diseaseBurdens[hoveredNode.diseaseBurden]}</div>
          <div>Income Level: {incomeLevels[hoveredNode.incomeLevel]}</div>
        </div>
      )}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={2}
          css={`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          `}
        >
          <div
            css={`
              font-size: 14px;
              margin-bottom: 40px;
            `}
          >
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 5px;
              `}
            >
              Eligibility
            </div>
            <div
              css={`
                gap: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                opacity: ${!hoveredLegend || hoveredLegend === "Eligible"
                  ? 1
                  : 0.3};
              `}
              onMouseEnter={() => setHoveredLegend("Eligible")}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div
                css={`
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  ${styles.Eligible}
                `}
              />
              Eligible
            </div>
            <div
              css={`
                gap: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                opacity: ${!hoveredLegend || hoveredLegend === "Not Eligible"
                  ? 1
                  : 0.3};
              `}
              onMouseEnter={() => setHoveredLegend("Not Eligible")}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div
                css={`
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  ${styles["Not Eligible"]}
                `}
              />
              Not Eligible
            </div>
            <div
              css={`
                gap: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                opacity: ${!hoveredLegend ||
                hoveredLegend === "Transition Funding"
                  ? 1
                  : 0.3};
              `}
              onMouseEnter={() => setHoveredLegend("Transition Funding")}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div
                css={`
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  ${styles["Transition Funding"]}
                `}
              />
              Transition Funding
            </div>
          </div>
          {showExtraData && (
            <div
              css={`
                font-size: 14px;
              `}
            >
              <div
                css={`
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 5px;
                `}
              >
                Disease Burden
              </div>
              <div
                css={`
                  display: flex;
                  position: relative;
                  margin-bottom: 40px;
                  justify-content: center;
                  width: ${backCircleRadius[6]}px;
                  height: ${backCircleRadius[6]}px;

                  > span {
                    bottom: 0;
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid #262c34;

                    &:nth-of-type(1) {
                      width: ${backCircleRadius[6]}px;
                      height: ${backCircleRadius[6]}px;

                      &:after {
                        right: -70px;
                        content: "Extreme";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 35px;
                        height: 1px;
                        opacity: 0.2;
                        right: -15px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                    &:nth-of-type(2) {
                      width: ${backCircleRadius[5]}px;
                      height: ${backCircleRadius[5]}px;

                      &:after {
                        right: -68px;
                        content: "Severe";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 37px;
                        height: 1px;
                        opacity: 0.2;
                        right: -22px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                    &:nth-of-type(3) {
                      width: ${backCircleRadius[4]}px;
                      height: ${backCircleRadius[4]}px;

                      &:after {
                        right: -63px;
                        content: "High";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 40px;
                        height: 1px;
                        opacity: 0.2;
                        right: -29px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                    &:nth-of-type(4) {
                      width: ${backCircleRadius[3]}px;
                      height: ${backCircleRadius[3]}px;

                      &:after {
                        right: -96px;
                        content: "Not High";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 44px;
                        height: 1px;
                        opacity: 0.2;
                        right: -37px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                    &:nth-of-type(5) {
                      width: ${backCircleRadius[2]}px;
                      height: ${backCircleRadius[2]}px;

                      &:after {
                        right: -106px;
                        content: "Moderate";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 47px;
                        height: 1px;
                        opacity: 0.2;
                        right: -44px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                    &:nth-of-type(6) {
                      width: ${backCircleRadius[1]}px;
                      height: ${backCircleRadius[1]}px;

                      &:after {
                        right: -81px;
                        content: "Low";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 53px;
                        height: 1px;
                        opacity: 0.2;
                        right: -52px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                    &:nth-of-type(7) {
                      width: ${backCircleRadius[0]}px;
                      height: ${backCircleRadius[0]}px;

                      &:after {
                        right: -95px;
                        content: "None";
                        position: absolute;
                      }
                      &:before {
                        top: 12px;
                        content: "";
                        width: 58px;
                        height: 1px;
                        opacity: 0.2;
                        right: -59px;
                        position: absolute;
                        background: #262c34;
                      }
                    }
                  }
                `}
              >
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[6]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[6])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[5]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[5])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[4]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[4])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[3]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[3])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[2]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[2])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[1]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[1])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
                <span
                  css={`
                    opacity: ${!hoveredBurdenLegend ||
                    hoveredBurdenLegend === diseaseBurdens[0]
                      ? 1
                      : 0.3};
                  `}
                  onMouseEnter={() => setHoveredBurdenLegend(diseaseBurdens[0])}
                  onMouseLeave={() => setHoveredBurdenLegend(null)}
                />
              </div>
              <div
                css={`
                  font-size: 14px;
                `}
              >
                <div
                  css={`
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 5px;
                  `}
                >
                  Income Level
                </div>
                <div
                  css={`
                    width: 100%;
                    height: 6px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    > span {
                      position: relative;
                      width: calc(100% / 6);

                      &:nth-of-type(1) {
                        border: 0.5px solid #262c34;
                        border-radius: 20px 0 0 20px;

                        &:after {
                          bottom: -45px;
                          content: "None";
                          position: absolute;
                          display: inline-block;
                          transform: rotate(90deg);
                        }
                      }
                      &:nth-of-type(2) {
                        background: #70777e;
                        border: 0.5px solid #262c34;

                        &:after {
                          bottom: -45px;
                          content: "Low";
                          position: absolute;
                          display: inline-block;
                          transform: rotate(90deg);
                        }
                      }
                      &:nth-of-type(3) {
                        background: #98a1aa;
                        border: 0.5px solid #495057;
                      }
                      &:nth-of-type(4) {
                        background: #c7cdd1;
                        border: 0.5px solid #868e96;
                      }
                      &:nth-of-type(5) {
                        background: #dfe3e6;
                        border: 0.5px solid #adb5bd;
                      }
                      &:nth-of-type(6) {
                        background: #f5f5f7;
                        border: 0.5px solid #dfe3e6;
                      }
                      &:nth-of-type(7) {
                        border: 0.5px solid #dfe3e6;
                        border-radius: 0 20px 20px 0;

                        &:after {
                          bottom: -45px;
                          content: "High";
                          position: absolute;
                          display: inline-block;
                          transform: rotate(90deg);
                        }
                      }
                    }
                  `}
                >
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[0]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[0])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[1]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[1])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[2]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[2])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[3]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[3])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[4]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[4])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[5]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[5])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                  <span
                    css={`
                      opacity: ${!hoveredIncomeLegend ||
                      hoveredIncomeLegend === incomeLevels[6]
                        ? 1
                        : 0.3};
                    `}
                    onMouseEnter={() => setHoveredIncomeLegend(incomeLevels[6])}
                    onMouseLeave={() => setHoveredIncomeLegend(null)}
                  />
                </div>
              </div>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={10}>
          <div
            id="scatterplot-scroll-div"
            css={`
              width: 100%;
              overflow-x: auto;
              overflow-y: hidden;

              &::-webkit-scrollbar {
                height: 5px;
                background: #262c34;
              }
              &::-webkit-scrollbar-track {
                background: #dfe3e6;
              }
              &::-webkit-scrollbar-thumb {
                background: #262c34;
              }
            `}
          >
            <div
              css={`
                height: 620px;
                width: ${noData ? "100%" : "200vw"};
              `}
            >
              {noData ? (
                <NoDataLabel />
              ) : (
                <ResponsiveScatterPlot
                  data={props.data}
                  useMesh={false}
                  margin={{ top: 60, right: 100, bottom: 50, left: 50 }}
                  layers={["grid", "axes", Nodes, "markers"]}
                  xScale={{ type: "point" }}
                  xFormat={(e: Value) => e.toString()}
                  yScale={{ type: "point" }}
                  yFormat={(e: Value) => e.toString()}
                  blendMode="multiply"
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 15,
                    tickRotation: 0,
                    format: (e: Value) => (e !== 2002 ? e.toString() : ""),
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickPadding: 15,
                    tickRotation: -90,
                  }}
                  theme={{
                    axis: {
                      ticks: {
                        text: {
                          fontSize: 12,
                          fill: "#262C34",
                          fontWeight: "bold",
                        },
                      },
                    },
                    grid: {
                      line: {
                        fill: "#ADB5BD",
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
