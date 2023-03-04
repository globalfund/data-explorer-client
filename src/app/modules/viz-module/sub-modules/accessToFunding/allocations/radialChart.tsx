import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";

import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

import { findIndex, values, keys, get } from "lodash";

import React from "react";
import { NoDataAllocations } from "../../allocations/components/nodata";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getKeysPercentages } from "app/modules/viz-module/sub-modules/allocations/data";
import { useMeasure } from "react-use";
interface Props {
  total: number;
  keys: string[];
  values: number[];
}

export default function RadialChart(props: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const [keysPercentagesColors, setKeysPercentagesColors] = React.useState<{
    percentages: number[];
    colors: string[];
  }>(getKeysPercentages(props.total, props.values));

  React.useEffect(() => {
    setKeysPercentagesColors(getKeysPercentages(props.total, props.values));
  }, [props.total, values]);

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
          strokeWidth: "1px",
          background: "#262C34",
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
                return formatFinancialValue(props.values[fkeyIndex]);
              }
              return "";
            },
          },
          total: {
            show: true,
            fontFamily: "GothamNarrow-Bold",
            formatter: () => formatFinancialValue(props.total),
          },
        },
      },
    },
    colors: ["#E4EBF8", "#C9CAD4", "#F1ECEC"],
    labels: props.keys,
    legend: {
      show: true,
      floating: true,
      fontSize: !isMobile ? "14px" : "10px",
      fontFamily: "GothamNarrow-Book",
      horizontalAlign: "left",
      fontWeight: "bold",
      position: "right",
      offsetX: width / 2,
      offsetY: !isMobile ? 25 : 15,
      markers: {
        width: 0,
      },
      formatter: (seriesName: string, opts: any) => {
        if (isMobile) {
          return seriesName;
        }
        console.log(keysPercentagesColors.percentages, "values");
        return `${seriesName}: ${Math.floor(
          keysPercentagesColors.percentages[opts.seriesIndex]
        )}%`;
      },
      itemMargin: {
        vertical: !isMobile ? 8 : 2,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
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
    <>
      <div
        css={`
          @media (max-width: 767px) {
            z-index: 2;
            width: 100%;
            position: relative;
            padding-bottom: 100px;

            #mobile-tooltip-container {
              top: 30vh;
              left: 16px;
              width: calc(100% - 32px);
            }
          }
        `}
      >
        <div ref={ref} id="allocations-radial-bar">
          {props.total === 0 ? (
            <div css="display: flex;justify-content: center;">
              <NoDataLabel />
              <NoDataAllocations />
            </div>
          ) : (
            <ReactApexCharts
              type="radialBar"
              options={options}
              height={isMobile ? 400 : 580}
              series={keysPercentagesColors.percentages}
              width={500}
            />
          )}
        </div>
        {/* {(isMobile || isTouchDevice()) && xsTooltipData && (
            <XsContainer id="mobile-tooltip-container">
              <div
                css={`
                  width: 95%;
                `}
              >
                <AllocationsRadialMobileTooltip
                  {...xsTooltipData}
                  close={() => setXsTooltipData(null)}
                  drilldown={() => {
                    setVizLevel(1);
                    setVizSelected(xsTooltipData.label);
                  }}
                />
              </div>
            </XsContainer>
          )} */}
      </div>
    </>
  );
}
