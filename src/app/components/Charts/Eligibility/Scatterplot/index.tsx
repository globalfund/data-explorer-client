import React from "react";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useStoreState } from "app/state/store/hooks";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ResponsiveScatterPlot, Value } from "@nivo/scatterplot";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { AreaLayer } from "app/components/Charts/Eligibility/Scatterplot/components/area";
import { ScatterplotNode } from "app/components/Charts/Eligibility/Scatterplot/components/node";
import { ScatterplotLegends } from "app/components/Charts/Eligibility/Scatterplot/components/legends";
import {
  incomeLevels,
  diseaseBurdens,
  EligibilityScatterplotHoveredNode,
  ScatterPlotProps,
  EligibilityScatterplotDataModel,
} from "app/components/Charts/Eligibility/Scatterplot/data";

export function ScatterPlot(props: ScatterPlotProps) {
  const [hoveredNode, setHoveredNode] =
    React.useState<EligibilityScatterplotHoveredNode | null>(null);
  const isMobile = useMediaQuery("(max-width: 960px)");
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
    return nProps.nodes.map((node: any) => {
      return (
        <ScatterplotNode
          x={node.x}
          y={node.y}
          key={node.id}
          data={node.data}
          hovered={hoveredNode}
          onHover={setHoveredNode}
          showExtraData={showExtraData}
          invisible={node.data.invisible}
          hoveredEligibilityLegend={hoveredLegend}
          hoveredBurdenLegend={hoveredBurdenLegend}
          hoveredIncomeLegend={hoveredIncomeLegend}
        />
      );
    });
  };

  const AreaLayerContainer = (aProps: any) => (
    <AreaLayer
      {...aProps}
      hoveredEligibilityLegend={hoveredLegend}
      hoveredBurdenLegend={hoveredBurdenLegend}
      hoveredIncomeLegend={hoveredIncomeLegend}
    />
  );

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
        item.id.toString() !== "dummy1" && item.id.toString() !== "dummy2"
    ).length === 0;

  const components = filter(
    props.data,
    (item: EligibilityScatterplotDataModel) =>
      item.id.toString() !== "dummy1" && item.id.toString() !== "dummy2"
  ).map((item: EligibilityScatterplotDataModel) => item.id);

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

            @media (max-width: 767px) {
              top: 40vh;
              left: 16px;
              background: #fff;
              width: calc(100vw - 32px);
              box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
            }
          `}
        >
          <div
            css={`
              display: flex;
              font-weight: bold;
              margin-bottom: 10px;
              flex-direction: row;
              justify-content: space-between;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

              path {
                fill: #2e4063;
              }
            `}
          >
            <div>
              {hoveredNode.x} - {hoveredNode.y}
            </div>
            <IconButton
              onTouchStart={() => setHoveredNode(null)}
              css={`
                padding: 0;
              `}
            >
              <CloseIcon />
            </IconButton>
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
          md={3}
          css={`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            @media (max-width: 960px) {
              display: none;
            }
          `}
        >
          <ScatterplotLegends
            showExtraLegends={showExtraData}
            hoveredEligibilityLegend={hoveredLegend}
            hoveredBurdenLegend={hoveredBurdenLegend}
            hoveredIncomeLegend={hoveredIncomeLegend}
            setHoveredEligibilityLegend={setHoveredLegend}
            setHoveredBurdenLegend={setHoveredBurdenLegend}
            setHoveredIncomeLegend={setHoveredIncomeLegend}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          css={`
            display: flex;
            position: relative;
            flex-direction: row;
          `}
        >
          {components.length > 0 && (
            <div
              css={`
                display: flex;
                position: sticky;
                margin-top: 55px;
                flex-direction: column;
                height: calc(100% - 110px);
                justify-content: space-evenly;

                @media (max-width: 767px) {
                  margin-top: 20px;
                }

                > div {
                  font-size: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: rgb(38, 44, 52);
                  transform: rotate(-90deg);
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

                  @media (max-width: 767px) {
                    width: 50px;
                  }
                }
              `}
            >
              {components.map((component: string | number) => (
                <div key={component}>{component}</div>
              ))}
            </div>
          )}
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
                width: ${noData ? "100%" : "3000px"};

                @media (max-width: 767px) {
                  height: 550px;
                }
              `}
            >
              {noData ? (
                <NoDataLabel />
              ) : (
                <ResponsiveScatterPlot
                  data={props.data}
                  useMesh={false}
                  layers={[
                    AreaLayerContainer,
                    "grid",
                    "axes",
                    Nodes,
                    "markers",
                  ]}
                  margin={{
                    top: !isMobile ? 60 : 0,
                    right: 0,
                    bottom: 50,
                    left: 50,
                  }}
                  xScale={{ type: "point" }}
                  xFormat={(e: Value) => e.toString()}
                  yScale={{ type: "point" }}
                  yFormat={(e: Value) => e.toString()}
                  blendMode="multiply"
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 15,
                    tickRotation: 0,
                    format: (e: Value) =>
                      e !== 2002 && e !== 2022 ? e.toString() : "",
                  }}
                  axisLeft={null}
                  // axisLeft={{
                  //   tickSize: 0,
                  //   tickPadding: 15,
                  //   tickRotation: -90,
                  //   format: (e: Value) =>
                  //     e !== "dummy1" && e !== "dummy2" ? e : "",
                  //   renderTick: (tProps: any) => (
                  //     <g
                  //       css="opacity: 1;"
                  //       transform={`translate(${tProps.x},${tProps.y - 15})`}
                  //     >
                  //       <text
                  //         textAnchor="end"
                  //         dominantBaseline="central"
                  //         transform={`translate(${tProps.textX},${tProps.textY})  rotate(-90)`}
                  //         css={`
                  //           font-size: 12px;
                  //           font-weight: bold;
                  //           fill: rgb(38, 44, 52);
                  //           font-family: sans-serif;
                  //           font-family: "GothamNarrow-Bold", "Helvetica Neue",
                  //             sans-serif;
                  //         `}
                  //       >
                  //         {tProps.format(tProps.value)}
                  //       </text>
                  //     </g>
                  //   ),
                  // }}
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
