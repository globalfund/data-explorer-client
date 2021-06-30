import React from "react";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVizValueRange } from "app/utils/getVizValueRange";
import { getFinancialValueWithMetricPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { BarComponent } from "app/components/Charts/PledgesContributions/TimeCycle/components/bar";
import { PledgesContributionsProps } from "app/components/Charts/PledgesContributions/TimeCycle/data";

export function PledgesContributionsTimeCycle(
  props: PledgesContributionsProps
) {
  const matches = useMediaQuery("(max-width: 767px)");
  const [hoveredXIndex, setHoveredXIndex] = React.useState(null);
  const [hoveredLegend, setHoveredLegend] = React.useState(null);
  const moneyAbbrRange = getVizValueRange(
    props.data,
    "pledgesContributionsBar"
  );
  const legends = [
    { name: "Pledge", color: "#868E96" },
    { name: "Contribution", color: "#495057" },
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
      />
    ));
  };

  return (
    <div
      css={`
        width: 100%;
        height: 700px;
      `}
      data-cy="investments-time-cycle"
    >
      <Grid
        container
        alignItems="center"
        spacing={4}
        css={`
          > div {
            color: #262c34;
            font-size: 14px;
            font-weight: bold;
          }
        `}
      >
        <Grid item xs={12} sm={12} md={3}>
          <div
            css={`
              display: flex;
              align-items: center;

              > svg {
                margin-left: 10px;
              }
            `}
          >
            Replenishment Periods <InfoIcon />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <div
            css={`
              gap: 24px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
            `}
          >
            {legends.map((legend: any) => (
              <div
                key={legend.name}
                onMouseEnter={() => setHoveredLegend(legend.name.toLowerCase())}
                onMouseLeave={() => setHoveredLegend(null)}
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 10px;
                  cursor: pointer;
                  align-items: center;
                  flex-direction: row;
                  transition: opacity 0.2s ease-in-out;
                  opacity: ${!hoveredLegend ||
                  hoveredLegend === legend.name.toLowerCase()
                    ? 1
                    : 0.3};
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
      <ResponsiveBar
        animate
        enableLabel={false}
        indexScale={{ type: "band", round: true }}
        groupMode="grouped"
        motionStiffness={90}
        motionDamping={15}
        borderColor="inherit:darker(1.6)"
        layers={["grid", "axes", Bars, "markers", "legends"]}
        padding={matches ? 0.3 : 0.5}
        innerPadding={6}
        data={props.data}
        colors={(value: any) => value.data[`${value.id}Color`]}
        keys={["pledge", "contribution"]}
        indexBy="year"
        margin={{
          top: 60,
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
          legendPosition: "middle",
          legend: `USD (${moneyAbbrRange.abbr})`,
          format: (value: number | string | Date) =>
            `${getFinancialValueWithMetricPrefix(
              parseInt(value.toString(), 10),
              moneyAbbrRange.index
            )}`,
        }}
        axisBottom={{
          format: (value: number | string | Date) => {
            return matches && props.data.length > 2
              ? value.toString().slice(2, 4)
              : value.toString();
          },
          tickRotation: matches && props.data.length > 3 ? 45 : 0,
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
                fill: "#262c34",
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
  );
}
