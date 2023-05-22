import React from "react";
import max from "lodash/max";
import maxBy from "lodash/maxBy";
import { useMeasure } from "react-use";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { NoDataAllocations } from "../../allocations/components/nodata";
import { getKeysPercentages } from "app/modules/viz-module/sub-modules/allocations/data";
import { useDataThemesEchart } from "app/hooks/useDataThemesEchart";

interface Props {
  total: number;
  keys: string[];
  values: number[];
  isLoading: boolean;
  colors: string[];
}

export default function RadialChart(props: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const maxValue = max(props.values);
  const [keysPercentagesColors, setKeysPercentagesColors] = React.useState<{
    percentages: number[];
    colors: string[];
  }>(getKeysPercentages(maxValue ? maxValue * 1.2 : props.total, props.values));

  React.useEffect(() => {
    setKeysPercentagesColors(
      getKeysPercentages(maxValue ? maxValue * 1.2 : props.total, props.values)
    );
  }, [props.values]);

  const polarBarChartLabels = props.keys.map((key) => ({
    label: key,
  }));
  const polarBarChartSizes = keysPercentagesColors.percentages.map((value) => ({
    size: value,
  }));
  const polarBarChartColors = props.colors.map((color) => ({
    itemStyles: {
      color,
    },
  }));

  const polarBarChartData = polarBarChartLabels.map((data, index) => {
    return {
      ...data,
      ...polarBarChartSizes[index],
      ...polarBarChartColors[index],
    };
  });

  const { render } = useDataThemesEchart();
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (domRef && domRef.current) {
      try {
        const max = maxBy(polarBarChartData, "value");
        render(
          polarBarChartData,
          // @ts-ignore
          domRef.current,
          "echartsPolarBar",
          {
            height: 378,
          },
          "chart-container-id"
        );
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [polarBarChartData]);

  if (props.isLoading) {
    return (
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
        <PageLoader inLoader />
      </div>
    );
  }

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
            show: false,
          },
        },
      },
    },
    colors: ["#252C34", "#C9CAD4", "#595D70"],
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
        return `${seriesName}: ${Math.floor(
          opts.w.globals.series[opts.seriesIndex]
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
      <div
        id={"chart-container-id"}
        ref={domRef}
        css={`
          width: 378px;
          height: 378px;
        `}
      />
      {/* <div ref={ref} id="allocations-radial-bar">
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
            width={480}
          />
        )}
      </div> */}
    </div>
  );
}
