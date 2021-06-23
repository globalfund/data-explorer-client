import React from "react";
import get from "lodash/get";
import { useMeasure } from "react-use";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import Grid from "@material-ui/core/Grid";
import ReactApexCharts from "react-apexcharts";
import { InfoIcon } from "app/assets/icons/Info";
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { TransitionContainer } from "app/components/TransitionContainer";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";
import { getKeysPercentages } from "app/modules/viz-module/sub-modules/allocations/data";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

export function AllocationsModule() {
  // api call & data
  const fetchData = useStoreActions((store) => store.Allocations.fetch);
  const total = useStoreState(
    (state) => get(state.Allocations.data, "total", []) as number
  );
  const keys = useStoreState(
    (state) => get(state.Allocations.data, "keys", []) as string[]
  );
  const colors = useStoreState(
    (state) => get(state.Allocations.data, "colors", []) as string[]
  );
  const values = useStoreState(
    (state) => get(state.Allocations.data, "values", []) as number[]
  );
  const isLoading = useStoreState((state) => state.Allocations.loading);

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [keysPercentagesColors, setKeysPercentagesColors] = React.useState<{
    percentages: number[];
    colors: string[];
  }>(getKeysPercentages(total, values));
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
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
                return formatFinancialValue(values[fkeyIndex]);
              }
              return "";
            },
          },
          total: {
            show: true,
            formatter: () => formatFinancialValue(total),
          },
        },
      },
    },
    colors: keysPercentagesColors.colors,
    labels: keys,
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
          values[opts.seriesIndex]
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

  function onClick(this: Window, e: MouseEvent) {
    // @ts-ignore
    if (e.target && e.target.parentNode) {
      // @ts-ignore
      const key = e.target.parentNode.getAttribute("seriesName");
      if (key) {
        // @ts-ignore
        const keySelected = e.target.getAttribute("selected");
        if (keySelected === "true") {
          setVizLevel(1);
          setVizScale(0.4);
          setVizSelected(key);
        } else {
          setVizLevel(0);
          setVizScale(1);
          setVizSelected(undefined);
        }
      } else {
        setVizLevel(0);
        setVizScale(1);
        setVizSelected(undefined);
      }
    }
  }

  React.useEffect(() => fetchData({}), []);

  React.useEffect(() => {
    setKeysPercentagesColors(getKeysPercentages(total, values));
  }, [total, values]);

  React.useEffect(() => {
    const items = document.getElementsByClassName("apexcharts-radial-series");
    if (vizSelected) {
      [...items].forEach((item: Element) => {
        const paths = item.getElementsByTagName("path");
        if (paths.length > 0) {
          if (item.getAttribute("seriesName") === vizSelected) {
            paths[0].style.stroke = "url(#diagonalHatch)";
          } else {
            paths[0].style.stroke = "";
          }
        }
      });
    } else {
      [...items].forEach((item: Element) => {
        const paths = item.getElementsByTagName("path");
        if (paths.length > 0) {
          paths[0].style.stroke = "";
        }
      });
    }
  }, [vizSelected]);

  React.useEffect(() => {
    setTimeout(() => {
      const viz = document.getElementById("allocations-radial-bar");
      if (viz) {
        const svgs = viz.getElementsByTagName("svg");
        if (svgs.length > 1) {
          const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
          pathElement.setAttribute("stroke", "#2E4DF9");
          pathElement.setAttribute("strokeWidth", "1");

          const patternElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "pattern"
          );
          patternElement.setAttribute("id", "diagonalHatch");
          patternElement.setAttribute("patternUnits", "userSpaceOnUse");
          patternElement.setAttribute("width", "4");
          patternElement.setAttribute("height", "4");
          patternElement.appendChild(pathElement);

          const defsElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
          );
          defsElement.appendChild(patternElement);

          svgs[1].appendChild(defsElement);
        }
      }
    }, 1000);

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      id="allocations-radial-bar"
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
      overflow: visible !important;
    }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={vizScale} vizTranslation={vizTranslation}>
        <div
          ref={ref}
          id="allocations-radial-bar"
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
                {formatFinancialValue(total)}
              </div>
            </Grid>
          </Grid>
          <ReactApexCharts
            height={580}
            type="radialBar"
            options={options}
            series={keysPercentagesColors.percentages}
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
              <div>{formatFinancialValue(total)}</div>
            </div>
          </div>
        </div>
      </TransitionContainer>
      <SlideInContainer
        vizLevel={vizLevel}
        selected={vizSelected}
        close={() => {
          setVizLevel(0);
          setVizSelected(undefined);
          setVizTranslation({ x: 0, y: 0 });
        }}
      >
        <DisbursementsTreemap
          data={mockdata2}
          onNodeClick={(node: string, x: number, y: number) => {}}
        />
      </SlideInContainer>
    </div>
  );
}
