/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import useMeasure from "react-use/lib/useMeasure";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getKeysPercentages } from "app/modules/viz-module/sub-modules/allocations/data";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

export function InvestmentRadialViz() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const grantInfoData = useStoreState((state) =>
    get(state.GrantDetailInfo.data, "data[0]", {
      title: "",
      code: "",
      rating: "",
      status: "",
      location: "",
      component: "",
      description: "",
      investments: {
        disbursed: 0,
        committed: 0,
        signed: 0,
      },
      manager: {
        name: "",
        email: "",
      },
    })
  );

  const total =
    grantInfoData.investments.committed +
    grantInfoData.investments.signed +
    grantInfoData.investments.disbursed;
  const values = [
    grantInfoData.investments.committed,
    grantInfoData.investments.signed,
    grantInfoData.investments.disbursed,
  ];
  const colors = appColors.LOCATION.OVERVIEW_VISUALISATION_COLORS;
  const keys = ["Committed", "Signed", "Disbursed"];
  const [keysPercentagesColors, setKeysPercentagesColors] = React.useState<{
    percentages: number[];
    colors: string[];
  }>(getKeysPercentages(total, values));

  console.log(keysPercentagesColors.percentages, "percentages");

  React.useEffect(() => {
    const newTotal =
      grantInfoData.investments.committed +
      grantInfoData.investments.signed +
      grantInfoData.investments.disbursed;
    const newValues = [
      grantInfoData.investments.committed,
      grantInfoData.investments.signed,
      grantInfoData.investments.disbursed,
    ];
    setKeysPercentagesColors(getKeysPercentages(newTotal, newValues));
  }, [grantInfoData]);

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
          background: appColors.COMMON.PRIMARY_COLOR_1,
        },
        dataLabels: {
          name: {
            show: true,
            color: appColors.COMMON.PRIMARY_COLOR_1,
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
              (grantInfoData.investments.disbursed /
                grantInfoData.investments.committed) *
                100
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
          <div>
            {formatLargeAmountsWithPrefix(grantInfoData.investments.committed)}
          </div>
        </div>
        <div>
          <span>
            <div style={{ background: colors[1] }} />
            <span>Signed</span>
          </span>
          <div>
            {formatLargeAmountsWithPrefix(grantInfoData.investments.signed)}
          </div>
        </div>
        <div>
          <span>
            <div style={{ background: colors[2] }} />
            <span>Disbursed</span>
          </span>
          <div>
            {formatLargeAmountsWithPrefix(grantInfoData.investments.disbursed)}
          </div>
        </div>
      </div>
    </div>
  );
}
