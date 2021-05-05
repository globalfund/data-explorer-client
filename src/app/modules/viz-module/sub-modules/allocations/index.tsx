import React from "react";
import { useMeasure } from "react-use";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import Grid from "@material-ui/core/Grid";
import ReactApexCharts from "react-apexcharts";
import { InfoIcon } from "app/assets/icons/Info";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import {
  allocationmockdata,
  getKeysPercentages,
} from "app/modules/viz-module/sub-modules/allocations/data";

export function AllocationsModule() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [keysPercentages, setKeysPercentages] = React.useState<number[]>(
    getKeysPercentages(allocationmockdata.total, allocationmockdata.values)
  );

  const options: ApexOptions = {
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 300,
        hollow: {
          margin: 5,
          size: "50%",
          background: "transparent",
          image: undefined,
        },
        track: {
          show: true,
          background: "#f2f2f2",
          strokeWidth: "5px",
        },
        dataLabels: {
          name: {
            show: true,
            color: "#262c34",
            fontFamily: "GothamNarrow-Book",
          },
          value: {
            show: true,
            fontFamily: "GothamNarrow-Book",
            formatter: (value: number) => {
              const fkeyIndex = findIndex(
                keysPercentages,
                (p: number) => p.toString() === value.toString()
              );
              if (fkeyIndex > -1) {
                return formatFinancialValue(
                  allocationmockdata.values[fkeyIndex]
                );
              }
              return "";
            },
          },
          total: {
            show: true,
            formatter: () => formatFinancialValue(allocationmockdata.total),
          },
        },
      },
    },
    colors: allocationmockdata.colors,
    labels: allocationmockdata.keys,
    legend: {
      show: true,
      floating: true,
      fontSize: "14px",
      fontFamily: "GothamNarrow-Book",
      fontWeight: "bold",
      position: "right",
      offsetX: width / 2,
      offsetY: 25,
      markers: {
        width: 0,
      },
      formatter: (seriesName: string, opts: any) => {
        return `${seriesName}: ${formatLargeAmountsWithPrefix(
          allocationmockdata.values[opts.seriesIndex]
        )}`;
      },
      itemMargin: {
        vertical: 8,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: true,
          },
        },
      },
    ],
  };

  return (
    <div
      ref={ref}
      css={`
        width: 100%;
      `}
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
            Allocations <InfoIcon />
          </div>
          <div css="font-weight: normal;">
            {formatFinancialValue(allocationmockdata.total)}
          </div>
        </Grid>
      </Grid>
      <ReactApexCharts
        height={580}
        type="radialBar"
        options={options}
        series={keysPercentages}
      />
      <div
        css={`
          gap: 6px;
          width: 250px;
          display: flex;
          font-size: 12px;
          flex-direction: column;
        `}
      >
        <div>
          <b>Allocations</b>
        </div>
        <div
          css={`
            width: 100%;
            height: 6px;
            border-radius: 20px;
            background: linear-gradient(
                90deg,
                #f2f3f7 0%,
                rgba(255, 255, 255, 0) 100%
              ),
              #343a40;
          `}
        />
        <div
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div>0 USD</div>
          <div>{formatFinancialValue(allocationmockdata.total)}</div>
        </div>
      </div>
    </div>
  );
}
