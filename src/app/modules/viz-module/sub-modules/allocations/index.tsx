import React from "react";
import ApexCharts from "apexcharts";
import { useMeasure } from "react-use";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

export function AllocationsModule() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  React.useEffect(() => {
    const container = document.getElementById("allocations-chart");

    if (container) {
      const options = {
        series: [90, 50, 30],
        chart: {
          height: 580,
          type: "radialBar",
        },
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
              },
              value: {
                show: true,
              },
            },
          },
        },
        colors: ["#868E96", "#ADB5BD", "#DFE3E6"],
        labels: ["Malaria", "Tuberculosis", "HIV"],
        legend: {
          show: true,
          floating: true,
          fontSize: "14px",
          fontFamily: "GothamNarrow-Book",
          fontWeight: "bold",
          position: "right",
          offsetX: width / 2,
          offsetY: 25,
          labels: {
            colors: ["#262C34", "#262C34", "#262C34"],
          },
          markers: {
            width: 0,
          },
          formatter: (seriesName: string, opts: any) => seriesName,
          //   {
          //     return `${seriesName}: ${formatLargeAmountsWithPrefix(
          //       opts.w.globals.series[opts.seriesIndex]
          //     )}`;
          //   },
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
      const chart = new ApexCharts(container, options);
      chart.render();
    }
  }, [ref, width]);

  return (
    <div
      ref={ref}
      id="allocations-chart"
      css={`
        width: 100%;
      `}
    />
  );
}
