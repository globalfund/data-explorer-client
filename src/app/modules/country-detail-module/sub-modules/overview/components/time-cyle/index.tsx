import React from "react";
import orderBy from "lodash/orderBy";
import findIndex from "lodash/findIndex";
import useMeasure from "react-use/lib/useMeasure";
import { BarTooltipDatum, ResponsiveBar } from "@nivo/bar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getFinancialValueWithMetricPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

interface Props {
  rawData: {
    committed: Record<string, unknown>[];
    signed: Record<string, unknown>[];
    disbursed: Record<string, unknown>[];
  };
}

function formatData(rawData: {
  committed: Record<string, unknown>[];
  signed: Record<string, unknown>[];
  disbursed: Record<string, unknown>[];
}): Record<string, unknown>[] {
  const { committed, signed, disbursed } = rawData;

  const data: Record<string, unknown>[] = [];

  committed.forEach((item: any) => {
    const { year, disbursed } = item;
    const fYearIndex = findIndex(data, { year });
    if (fYearIndex > -1) {
      data[fYearIndex].committed = disbursed;
    } else {
      data.push({ year, committed: disbursed });
    }
  });
  signed.forEach((item: any) => {
    const { year, disbursed } = item;
    const fYearIndex = findIndex(data, { year });
    if (fYearIndex > -1) {
      data[fYearIndex].signed = disbursed;
    } else {
      data.push({ year, signed: disbursed });
    }
  });
  disbursed.forEach((item: any) => {
    const { year, disbursed } = item;
    const fYearIndex = findIndex(data, { year });
    if (fYearIndex > -1) {
      data[fYearIndex].disbursed = disbursed;
    } else {
      data.push({ year, disbursed: disbursed });
    }
  });

  return orderBy(data, "year", "asc");
}

function InvestmentsTimeCycleVizTooltip(props: BarTooltipDatum) {
  return (
    <div
      css={`
        color: #231d2c;
        min-width: 300px;
        padding: 16px 25px;
        position: relative;
        background: #f5f5f7;
        border-radius: 20px;
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          padding-bottom: 16px;
          text-transform: capitalize;
          border-bottom: 1px solid #dfe3e6;
          font-family: "Inter", "Helvetica Neue", sans-serif;
        `}
      >
        {props.id}
      </div>
      <div
        css={`
          gap: 6px;
          display: flex;
          font-size: 12px;
          padding: 16px 0;
          flex-direction: column;
          border-bottom: 1px solid #dfe3e6;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 6px;
              }
            }
          }
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              font-weight: bold;
              font-family: "Inter", "Helvetica Neue", sans-serif;
            `}
          >
            Year
          </div>
          <div
            css={`
              font-weight: bold;
              font-family: "Inter", "Helvetica Neue", sans-serif;
            `}
          >
            Amount
          </div>
        </div>
        <div
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div>{props.indexValue}</div>
          <div>{formatFinancialValue(props.value as number)}</div>
        </div>
      </div>
    </div>
  );
}

export function InvestmentsTimeCycleViz(props: Props) {
  const colors = ["#727F95", "#21262B", "#595C70"];
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const [data, setData] = React.useState(formatData(props.rawData));
  const moneyAbbrRange = {
    index: 1,
    abbr: "million",
  };

  React.useEffect(() => {
    setData(formatData(props.rawData));
  }, [props.rawData]);

  React.useEffect(() => {
    const scrollContainer = document.getElementById("bar-scroll-div");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        left: 2000,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      id="bar-scroll-div"
      css={`
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        height: calc(100% - 32px);

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

        @media (max-width: 767px) {
          height: 420px;
        }
      `}
    >
      <div
        css={`
          height: ${height}px;
          width: ${data.length === 0 ? "100%" : "2000px"};
        `}
      >
        <ResponsiveBar
          animate
          enableGridY
          data={data}
          padding={0.6}
          indexBy="year"
          colors={colors}
          innerPadding={4}
          motionDamping={15}
          groupMode="grouped"
          enableLabel={false}
          motionStiffness={90}
          isInteractive={!isMobile}
          keys={["committed", "signed", "disbursed"]}
          tooltip={(tProps: BarTooltipDatum) => (
            <InvestmentsTimeCycleVizTooltip {...tProps} />
          )}
          margin={{
            top: 30,
            right: 70,
            bottom: 30,
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
          axisRight={{
            orient: "right",
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
          }}
          legends={[
            {
              translateX: 0,
              symbolSize: 8,
              itemWidth: 80,
              itemHeight: 20,
              translateY: -30,
              symbolSpacing: 5,
              direction: "row",
              dataFrom: "keys",
              anchor: "top-left",
              itemDirection: "left-to-right",
            },
            {
              translateX: 0,
              symbolSize: 8,
              itemWidth: 80,
              itemHeight: 20,
              translateY: -30,
              symbolSpacing: 5,
              direction: "row",
              dataFrom: "keys",
              anchor: "top-right",
              itemDirection: "left-to-right",
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  strokeWidth: 1,
                  stroke: "#868E96",
                  strokeOpacity: 0.1,
                },
                text: {
                  fontSize: 10,
                  fill: "#231d2c",
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                },
              },
              legend: {
                text: {
                  fontSize: 10,
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                },
              },
            },
            legends: {
              text: {
                fontSize: 10,
                textTransform: "capitalize",
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              },
            },
            grid: {
              line: {
                strokeWidth: 1,
                stroke: "#868E96",
                strokeOpacity: 0.1,
              },
            },
            tooltip: {
              container: {
                padding: 0,
                borderRadius: 20,
                background: "#f5f5f7",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
