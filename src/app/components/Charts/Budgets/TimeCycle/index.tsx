import React from "react";
import uniq from "lodash/uniq";
import sumBy from "lodash/sumBy";
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVizValueRange } from "app/utils/getVizValueRange";
import { XsContainer } from "app/components/Charts/common/styles";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { BudgetsTimeCycleProps } from "app/components/Charts/Budgets/TimeCycle/data";
import { BarComponent } from "app/components/Charts/Budgets/TimeCycle/components/bar";
import { MobileBudgetsFlowTooltipProps } from "app/components/Charts/Budgets/Flow/data";
import { getFinancialValueWithMetricPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { MobileBudgetsFlowTooltip } from "app/components/Charts/Budgets/Flow/components/tooltip";
import { NoDataBudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle/components/nodata";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

function getKeysFromData(data: Record<string, unknown>[]) {
  if (data.length === 0) {
    return [];
  }
  let keys: string[] = [];
  data.forEach((item: Record<string, unknown>) => {
    const itemKeys = Object.keys(item).map((key) => key);
    keys.push(...itemKeys);
  });
  keys = filter(uniq(keys), (k) => {
    if (k === "year") return false;
    if (k === "amount") return false;
    if (k === "filterStr") return false;
    if (k.indexOf("Color") > -1) return false;
    return true;
  });
  return keys;
}

function getLegendItems(data: any) {
  const legends: { name: string; color: string }[] = [];
  data.forEach((item: Record<string, unknown>) => {
    Object.keys(item).forEach((key: string) => {
      if (key !== "year" && key !== "amount" && key.indexOf("Color") === -1) {
        legends.push({
          name: key,
          color: item[`${key}Color`] as string,
        });
      }
    });
  });

  return uniqBy(legends, "name");
}

export function BudgetsTimeCycle(props: BudgetsTimeCycleProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [hoveredXIndex, setHoveredXIndex] = React.useState(null);
  const [hoveredLegend, setHoveredLegend] = React.useState(null);
  const [xsTooltipData, setXsTooltipData] =
    React.useState<MobileBudgetsFlowTooltipProps | null>(null);
  const [keys, setKeys] = React.useState(getKeysFromData(props.data));
  const moneyAbbrRange = getVizValueRange(props.data, "budgetBarChart");
  const totalBudget = sumBy(props.data, "amount");
  const legends = getLegendItems(props.data);

  React.useEffect(() => setKeys(getKeysFromData(props.data)), [props.data]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const viz = document.getElementById("budgets-time-cycle");
  //     if (viz) {
  //       const svgs = viz.getElementsByTagName("svg");
  //       if (svgs.length > 1) {
  //         const pathElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "path"
  //         );
  //         pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
  //         pathElement.setAttribute("stroke", "#13183F");
  //         pathElement.setAttribute("strokeWidth", "1");

  //         const patternElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "pattern"
  //         );
  //         patternElement.setAttribute("id", "diagonalHatch");
  //         patternElement.setAttribute("patternUnits", "userSpaceOnUse");
  //         patternElement.setAttribute("width", "4");
  //         patternElement.setAttribute("height", "4");
  //         patternElement.appendChild(pathElement);

  //         const defsElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "defs"
  //         );
  //         defsElement.appendChild(patternElement);

  //         svgs[1].appendChild(defsElement);
  //       }
  //     }
  //   }, 100);
  // }, []);

  const Bars = (bprops: any) => {
    return bprops.bars.map((bar: any) => (
      <BarComponent
        {...bar}
        showTooltip={bprops.showTooltip}
        hideTooltip={bprops.hideTooltip}
        onMouseEnter={bprops.onMouseEnter}
        onMouseLeave={bprops.onMouseLeave}
        onClick={props.onNodeClick}
        hoveredXIndex={hoveredXIndex}
        hoveredLegend={hoveredLegend}
        selected={props.selectedNodeId}
        setHoveredXIndex={setHoveredXIndex}
        onTouchStart={setXsTooltipData}
      />
    ));
  };
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        width: 100%;
        height: 700px;

        > svg {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 767px) {
          height: 500px;
        }
      `}
      data-cy="budgets-time-cycle"
    >
      <Grid
        container
        alignItems="center"
        spacing={!isMobile ? 4 : 2}
        css={`
          > div {
            color: #231d2c;
          }
        `}
      >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          {!isMobile && (
            <React.Fragment>
              <div
                css={`
                  display: flex;
                  font-size: 14px;
                  font-weight: bold;
                  align-items: center;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

                  > svg {
                    margin-left: 10px;
                  }
                `}
              >
                {get(cmsData, "componentsChartsBudgets.budget", "")}{" "}
                <InfoIcon />
              </div>
              <div css="font-weight: normal;">
                {formatFinancialValue(totalBudget)}
              </div>
            </React.Fragment>
          )}
          {isMobile && (
            <Grid item xs={12} css="font-size: 12px !important;">
              <b>
                {get(cmsData, "componentsChartsBudgets.totalAmount", "")}{" "}
                {formatFinancialValue(totalBudget)}
              </b>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <div
            css={`
              gap: 24px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 24px;
                  }
                }
              }

              @media (max-width: 767px) {
                gap: 12px;
                flex-wrap: wrap;
                justify-content: flex-start;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 12px;
                    }
                  }
                }
              }
            `}
          >
            {legends.map((legend: any) => (
              <div
                key={legend.name}
                onMouseEnter={() => setHoveredLegend(legend.name)}
                onMouseLeave={() => setHoveredLegend(null)}
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 12px;
                  cursor: pointer;
                  align-items: center;
                  flex-direction: row;
                  transition: opacity 0.2s ease-in-out;
                  opacity: ${!hoveredLegend || hoveredLegend === legend.name
                    ? 1
                    : 0.3};

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-right: 6px;
                      }
                    }
                  }
                `}
              >
                <div
                  css={`
                    width: 12px;
                    height: 12px;
                    border: 1px solid #231d2c;
                    background: ${legend.color};
                  `}
                />
                <div>{legend.name}</div>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
      {props.data.length > 0 ? (
        <ResponsiveBar
          animate
          enableLabel={false}
          enableGridX
          indexScale={{ type: "band", round: true }}
          groupMode="stacked"
          motionStiffness={90}
          motionDamping={15}
          borderColor="inherit:darker(1.6)"
          layers={["grid", "axes", Bars, "markers"]}
          padding={isMobile ? 0.3 : 0.5}
          innerPadding={0}
          data={props.data}
          colors={(value: any) => value.data[`${value.id}Color`]}
          keys={keys}
          indexBy="year"
          margin={{
            top: !isMobile ? 60 : 20,
            right: 30,
            bottom: props.data.length > 5 ? 120 : 80,
            left: 70,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: -60,
            legendPosition: "end",
            legend: `USD (${moneyAbbrRange.abbr})`,
            format: (value: number | string | Date) =>
              `${getFinancialValueWithMetricPrefix(
                parseInt(value.toString(), 10),
                moneyAbbrRange.index
              )}`,
          }}
          axisBottom={{
            tickRotation: isMobile && props.data.length > 3 ? 45 : 0,
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "top-right",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: -60,
              itemsSpacing: 2,
              itemWidth: 130,
              itemHeight: 12,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 12,
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  strokeWidth: 1,
                  stroke: "#868E96",
                  strokeOpacity: 0.3,
                },
                text: {
                  fill: "#231d2c",
                  fontSize: 12,
                },
              },
              legend: {
                text: {
                  fontWeight: "bold",
                },
              },
            },
            legends: {
              text: {
                fontSize: 12,
              },
            },
            grid: {
              line: {
                strokeWidth: 1,
                stroke: "#868E96",
                strokeOpacity: 0.3,
              },
            },
          }}
        />
      ) : (
        <React.Fragment>
          <NoDataBudgetsTimeCycle />
          <NoDataLabel />
        </React.Fragment>
      )}
      {isMobile && xsTooltipData && !props.selectedNodeId && (
        <XsContainer id="mobile-tooltip-container">
          <div
            css={`
              width: 95%;
            `}
          >
            <MobileBudgetsFlowTooltip
              {...xsTooltipData}
              onClose={() => setXsTooltipData(null)}
              value={sumBy(xsTooltipData.components, "value")}
              drilldown={(id: string, filterStr: string) => {
                props.onNodeClick(filterStr, 0, 0);
              }}
            />
          </div>
        </XsContainer>
      )}
    </div>
  );
}
