import React from "react";
import uniq from "lodash/uniq";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVizValueRange } from "app/utils/getVizValueRange";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BudgetsTimeCycleProps } from "app/components/Charts/Budgets/TimeCycle/data";
import { BarComponent } from "app/components/Charts/Budgets/TimeCycle/components/bar";
import { getFinancialValueWithMetricPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

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

export function BudgetsTimeCycle(props: BudgetsTimeCycleProps) {
  const matches = useMediaQuery("(max-width: 767px)");
  const [hoveredXIndex, setHoveredXIndex] = React.useState(null);
  const [keys, setKeys] = React.useState(getKeysFromData(props.data));
  const moneyAbbrRange = getVizValueRange(props.data, "budgetBarChart");
  const totalBudget = sumBy(props.data, "amount");

  React.useEffect(() => setKeys(getKeysFromData(props.data)), [props.data]);

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
        selected={props.selectedNodeId}
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
      data-cy="budgets-time-cycle"
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
        <Grid item xs={3}>
          <div
            css={`
              display: flex;
              align-items: center;

              > svg {
                margin-left: 10px;
              }
            `}
          >
            Budget <InfoIcon />
          </div>
          <div css="font-weight: normal;">
            {formatFinancialValue(totalBudget)}
          </div>
        </Grid>
      </Grid>
      <ResponsiveBar
        animate
        enableLabel={false}
        enableGridX
        indexScale={{ type: "band", round: true }}
        groupMode="stacked"
        motionStiffness={90}
        motionDamping={15}
        borderColor="inherit:darker(1.6)"
        layers={["grid", "axes", Bars, "markers", "legends"]}
        padding={matches ? 0.3 : 0.5}
        innerPadding={0}
        data={props.data}
        colors={(value: any) => value.data[`${value.id}Color`]}
        keys={keys}
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
