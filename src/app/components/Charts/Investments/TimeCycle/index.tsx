import React from "react";
import uniq from "lodash/uniq";
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import CloseIcon from "@material-ui/icons/Close";
import { InfoIcon } from "app/assets/icons/Info";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { isTouchDevice } from "app/utils/isTouchDevice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVizValueRange } from "app/utils/getVizValueRange";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { BarComponent } from "app/components/Charts/Investments/TimeCycle/components/bar";
import { InvestmentsTimeCycleProps } from "app/components/Charts/Investments/TimeCycle/data";
import { getFinancialValueWithMetricPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { NoDataBudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle/components/nodata";
import {
  TooltipButton,
  XsContainer,
} from "app/components/Charts/common/styles";
import { InvestmentsTimeCycleTooltip } from "./components/tooltip";
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
    if (k.indexOf("Children") > -1) return false;
    return true;
  });
  return keys;
}

function getLegendItems(data: any) {
  let allChildren: any[] = [];
  data.forEach((item: any) => {
    Object.keys(item).forEach((key) => {
      if (key.indexOf("Children") > -1) {
        allChildren = [...allChildren, ...item[key]];
      }
    });
  });

  const uniqChildren = uniqBy(allChildren, "name");
  return uniqChildren.map((child: any) => ({
    name: child.name,
    color: child.color,
  }));
}

export function InvestmentsTimeCycle(props: InvestmentsTimeCycleProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [hoveredXIndex, setHoveredXIndex] = React.useState(null);
  const [hoveredLegend, setHoveredLegend] = React.useState(null);
  const [showCumulative, setShowCumulative] = React.useState(false);
  const [xsTooltipData, setXsTooltipData] = React.useState<any>(null);
  const [keys, setKeys] = React.useState(getKeysFromData(props.data));
  const moneyAbbrRange = getVizValueRange(props.data, "budgetBarChart");
  const totalInvestmentValue =
    props.data.length > 0
      ? (props.data[props.data.length - 1].cumulative as number)
      : 0;
  const legends = getLegendItems(props.data);

  function showHideBarLabels(show: boolean) {
    const labels = [
      ...document.getElementsByClassName("investments-time-cycle-bar-label"),
    ];
    labels.forEach((label: Element) => {
      label.setAttribute("display", show ? "inherit" : "none");
    });
  }

  function handleChangeCumulative() {
    setShowCumulative(!showCumulative);
    if (!showCumulative) {
      setTimeout(() => showHideBarLabels(!showCumulative), 100);
    } else {
      showHideBarLabels(!showCumulative);
    }
  }

  React.useEffect(() => {
    setKeys(getKeysFromData(props.data));
    setTimeout(() => {
      const scrollableDiv = document.getElementById("bar-scroll-div");
      if (scrollableDiv && isMobile) {
        scrollableDiv.scroll({
          left: scrollableDiv.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 1000);
  }, [props.data]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const viz = document.getElementById("investments-time-cycle");
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
        selected={props.selectedNodeId}
        hoveredLegend={hoveredLegend}
        hoveredXIndex={hoveredXIndex}
        setHoveredXIndex={setHoveredXIndex}
        onTouchStart={(data: any) => setXsTooltipData(data)}
      />
    ));
  };

  function closeXsTooltip() {
    setXsTooltipData(null);
  }

  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
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
        data-cy="investments-time-cycle"
      >
        <Grid
          container
          alignItems="center"
          spacing={!isMobile ? 4 : 2}
          css={`
            > div {
              color: #231d2c;
              font-size: 14px;
            }
          `}
        >
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            {isMobile && (
              <Grid item xs={12} css="font-size: 12px !important;">
                <b>
                  {get(cmsData, "componentsChartsInvestments.totalAmount", "")}:{" "}
                  {formatFinancialValue(totalInvestmentValue)}
                </b>
              </Grid>
            )}
            {!isMobile && (
              <React.Fragment>
                <div
                  css={`
                    display: flex;
                    font-weight: bold;
                    align-items: center;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;

                    > svg {
                      margin-left: 10px;
                    }
                  `}
                >
                  Investments - {props.type || "Disbursement"} <InfoIcon />
                </div>
                <div css="font-weight: normal;">
                  {formatFinancialValue(totalInvestmentValue)}
                </div>
              </React.Fragment>
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
              {props.data.length > 0 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      color="primary"
                      name="cumulative"
                      checked={showCumulative}
                      onChange={handleChangeCumulative}
                    />
                  }
                  label="Show Cumulative"
                />
              )}
            </div>
          </Grid>
        </Grid>
        {props.data.length === 0 ? (
          <div css="display: flex;justify-content: center;">
            <NoDataBudgetsTimeCycle />
            <NoDataLabel />
          </div>
        ) : (
          <div
            id="bar-scroll-div"
            css={`
              width: 100%;
              @media (max-width: 767px) {
                overflow-x: auto;
                overflow-y: hidden;

                &::-webkit-scrollbar {
                  height: 5px;
                  background: #231d2c;
                }
                &::-webkit-scrollbar-track {
                  background: #dfe3e6;
                }
                &::-webkit-scrollbar-thumb {
                  background: #231d2c;
                }
              }
            `}
          >
            <div
              css={`
                width: 100%;
                height: 620px;

                @media (max-width: 767px) {
                  height: 500px;
                  width: ${props.data.length < 3 ? "100%" : "700px"};
                }
              `}
            >
              <ResponsiveBar
                animate
                enableLabel={false}
                indexScale={{ type: "band", round: true }}
                groupMode="grouped"
                motionStiffness={90}
                motionDamping={15}
                borderColor="inherit:darker(1.6)"
                layers={["grid", "axes", Bars, "markers", "legends"]}
                padding={isMobile ? 0.6 : 0.5}
                innerPadding={6}
                data={props.data}
                keys={
                  showCumulative
                    ? keys
                    : filter(keys, (key: string) => key !== "cumulative")
                }
                indexBy="year"
                margin={{
                  top: !isMobile ? 60 : 20,
                  right: !isMobile ? 30 : 70,
                  bottom: 50,
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
                axisRight={
                  isMobile
                    ? {
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        legendOffset: 60,
                        legendPosition: "end",
                        legend: `USD (${moneyAbbrRange.abbr})`,
                        format: (value: number | string | Date) =>
                          `${getFinancialValueWithMetricPrefix(
                            parseInt(value.toString(), 10),
                            moneyAbbrRange.index
                          )}`,
                      }
                    : null
                }
                // axisBottom={{
                //   tickRotation: isMobile && props.data.length > 3 ? 90 : 0,
                // }}
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
            </div>
          </div>
        )}
      </div>
      {(isMobile || isTouchDevice()) && xsTooltipData && !props.selectedNodeId && (
        <XsContainer id="mobile-tooltip-container">
          <div
            css={`
              width: 95%;
            `}
          >
            <div
              css={`
                padding: 16px 25px;
                position: relative;
                background: #f4f4f4;
                border-radius: 20px;

                @media (max-width: 767px) {
                  padding: 25px;
                  color: #231d2c;
                  background: #fff;
                  border-radius: 20px;
                  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);

                  > div {
                    padding: 0;
                    background: #fff !important;
                  }
                }
              `}
            >
              <div
                css={`
                  display: flex;
                  flex-direction: row;
                  justify-content flex-end;

                  path {
                    fill: #2E4063;
                  }
                `}
              >
                <IconButton
                  onTouchStart={closeXsTooltip}
                  css={`
                    padding: 0;
                  `}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <InvestmentsTimeCycleTooltip {...xsTooltipData} />
              <div
                css={`
                  display: flex;
                  margin-top: 10px;
                  flex-direction: row;
                  justify-content: flex-end;
                `}
              >
                <TooltipButton
                  type="button"
                  onTouchStart={() => {
                    if (
                      xsTooltipData &&
                      xsTooltipData.indexValue !== props.selectedNodeId
                    ) {
                      props.onNodeClick(
                        xsTooltipData.indexValue,
                        xsTooltipData.x - 100,
                        0
                      );
                    }
                  }}
                >
                  {get(cmsData, "componentsChartsInvestments.drilldown", "")}
                </TooltipButton>
              </div>
            </div>
          </div>
        </XsContainer>
      )}
    </React.Fragment>
  );
}
