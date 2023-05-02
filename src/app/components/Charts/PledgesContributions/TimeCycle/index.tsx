import React from "react";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import { InfoIcon } from "app/assets/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { isTouchDevice } from "app/utils/isTouchDevice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVizValueRange } from "app/utils/getVizValueRange";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { getFinancialValueWithMetricPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { NoDataBudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle/components/nodata";
import { BarComponent } from "app/components/Charts/PledgesContributions/TimeCycle/components/bar";
import { PledgesContributionsProps } from "app/components/Charts/PledgesContributions/TimeCycle/data";
import { PledgesContributionsTimeCycleTooltip } from "app/components/Charts/PledgesContributions/TimeCycle/components/tooltip";
import {
  TooltipButton,
  XsContainer,
} from "app/components/Charts/common/styles";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

export function PledgesContributionsTimeCycle(
  props: PledgesContributionsProps
) {
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [hoveredXIndex, setHoveredXIndex] = React.useState(null);
  const [hoveredLegend, setHoveredLegend] = React.useState(null);
  const [xsTooltipData, setXsTooltipData] = React.useState<any>(null);
  const moneyAbbrRange = getVizValueRange(
    props.data,
    "pledgesContributionsBar"
  );
  const legends = [
    {
      name: get(cmsData, "componentsChartsPledges.pledge", ""),
      color: "#BFCFEE",
    },
    {
      name: get(cmsData, "componentsChartsPledges.contribution", ""),
      color: "#252C34",
    },
  ];

  const Bars = (bprops: any) => {
    if (props.vizCompData.length !== bprops.bars.length) {
      props.setVizCompData(bprops.bars);
    }
    return bprops.bars.map((bar: any) => (
      <BarComponent
        {...bar}
        singleItemBar
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
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <div
              css={`
                display: flex;
                color: #231d2c;
                font-size: 14px;
                font-weight: bold;
                align-items: center;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

                > svg {
                  margin-left: 10px;
                }
              `}
            >
              {get(cmsData, "componentsChartsPledges.replenishmentPeriods", "")}{" "}
              <InfoIcon />
            </div>
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
              `}
            >
              {legends.map((legend: any) => (
                <div
                  key={legend.name}
                  onMouseEnter={() =>
                    setHoveredLegend(legend.name.toLowerCase())
                  }
                  onMouseLeave={() => setHoveredLegend(null)}
                  css={`
                    gap: 6px;
                    display: flex;
                    font-size: 12px;
                    cursor: pointer;
                    align-items: center;
                    flex-direction: row;
                    transition: opacity 0.2s ease-in-out;
                    opacity: ${!hoveredLegend ||
                    hoveredLegend === legend.name.toLowerCase()
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
                      background: ${legend.color};
                    `}
                  />
                  <div>{legend.name}</div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
        {props.data.length === 0 ? (
          <React.Fragment>
            <NoDataBudgetsTimeCycle />
            <NoDataLabel />
          </React.Fragment>
        ) : (
          <ResponsiveBar
            animate
            enableLabel={false}
            indexScale={{ type: "band", round: true }}
            groupMode="grouped"
            motionStiffness={90}
            motionDamping={15}
            borderColor="inherit:darker(1.6)"
            layers={["grid", "axes", Bars, "markers", "legends"]}
            padding={isMobile ? 0.3 : 0.5}
            innerPadding={6}
            data={props.data}
            colors={(value: any) => value.data[`${value.id}Color`]}
            keys={["pledge", "contribution"]}
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
              <PledgesContributionsTimeCycleTooltip {...xsTooltipData} />
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
                        `${xsTooltipData.indexValue}-${xsTooltipData.id}`,
                        xsTooltipData.x - 100,
                        0
                      );
                    }
                  }}
                >
                  {get(cmsData, "componentsChartsPledges.", "")}
                </TooltipButton>
              </div>
            </div>
          </div>
        </XsContainer>
      )}
    </React.Fragment>
  );
}
