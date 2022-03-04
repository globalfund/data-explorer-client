/* third-party */
import React from "react";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import useMeasure from "react-use/lib/useMeasure";
import { useStoreState } from "app/state/store/hooks";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getKeysPercentages } from "app/modules/viz-module/sub-modules/allocations/data";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

export function InvestmentsRadialViz() {
  // const isMobile = useMediaQuery("(max-width: 767px)");
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const locationInfoData = useStoreState((state) =>
    get(state.LocationDetailInfo.data, "data[0]", {
      disbursed: 0,
      committed: 0,
      signed: 0,
    })
  );

  const total =
    locationInfoData.committed +
    locationInfoData.signed +
    locationInfoData.disbursed;
  const values = [
    locationInfoData.committed,
    locationInfoData.signed,
    locationInfoData.disbursed,
  ];
  const colors = ["#727F95", "#21262B", "#595C70"];
  const keys = ["Committed", "Signed", "Disbursed"];
  const [keysPercentagesColors, setKeysPercentagesColors] = React.useState<{
    percentages: number[];
    colors: string[];
  }>(getKeysPercentages(total, values));

  React.useEffect(() => {
    const newTotal =
      locationInfoData.committed +
      locationInfoData.signed +
      locationInfoData.disbursed;
    const newValues = [
      locationInfoData.committed,
      locationInfoData.signed,
      locationInfoData.disbursed,
    ];
    setKeysPercentagesColors(getKeysPercentages(newTotal, newValues));
  }, [locationInfoData]);

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
          opacity: 0.5,
          strokeWidth: "1px",
          background: "#252C34",
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
                keysPercentagesColors.percentages,
                (p: number) => p.toString() === value.toString()
              );
              if (fkeyIndex > -1) {
                return formatFinancialValue(values[fkeyIndex]);
              }
              return "";
            },
          },
          total: {
            show: true,
            label: `${Math.floor(
              (locationInfoData.disbursed / locationInfoData.committed) * 100
            )}%`,
            fontFamily: "GothamNarrow-Bold",
            formatter: () => "Disbursed/Committed",
          },
        },
      },
    },
    colors,
    labels: keys,
    legend: {
      offsetY: 10,
      show: true,
      floating: true,
      fontSize: "10px",
      position: "right",
      offsetX: width / 2 - 25,
      fontWeight: "normal",
      fontFamily: "GothamNarrow-Book",
      markers: {
        width: 0,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 0,
      },
    },
  };

  return (
    <div
      ref={ref}
      css={`
        width: 100%;

        .apexcharts-legend-series {
          text-align: right;
        }

        .apexcharts-datalabel-label {
          font-size: 24px;
        }

        .apexcharts-datalabel-value {
          font-size: 12px;
        }
      `}
    >
      <ReactApexCharts
        height={400}
        type="radialBar"
        options={options}
        series={keysPercentagesColors.percentages}
      />
      <div
        css={`
          display: flex;
          padding: 0 28px;
          flex-direction: row;
          justify-content: space-between;

          > div {
            gap: 10px;
            flex-direction: column;

            > span {
              gap: 8px;
              display: flex;
              font-size: 12px;
              flex-direction: row;
              align-items: center;

              > div {
                width: 8px;
                height: 8px;
              }
            }

            > div {
              font-size: 14px;
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }
          }
        `}
      >
        <div>
          <span>
            <div style={{ background: colors[0] }} />
            <span>Committed</span>
          </span>
          <div>{formatLargeAmountsWithPrefix(locationInfoData.committed)}</div>
        </div>
        <div>
          <span>
            <div style={{ background: colors[1] }} />
            <span>Signed</span>
          </span>
          <div>{formatLargeAmountsWithPrefix(locationInfoData.signed)}</div>
        </div>
        <div>
          <span>
            <div style={{ background: colors[2] }} />
            <span>Disbursed</span>
          </span>
          <div>{formatLargeAmountsWithPrefix(locationInfoData.disbursed)}</div>
        </div>
      </div>
    </div>
  );
}
