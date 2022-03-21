/* third-party */
import React from "react";
import get from "lodash/get";
import sum from "lodash/sum";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTitle, useMeasure, useUnmount } from "react-use";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { isTouchDevice } from "app/utils/isTouchDevice";
import { PageLoader } from "app/modules/common/page-loader";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { XsContainer } from "app/components/Charts/common/styles";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { DrilldownPath } from "app/components/PageHeader/components/drilldownpath";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { NoDataAllocations } from "app/modules/viz-module/sub-modules/allocations/components/nodata";
import { AllocationsRadialMobileTooltip } from "app/modules/viz-module/sub-modules/allocations/components/mobiletooltip";
import {
  getKeysPercentages,
  AllocationsTreemapDataItem,
} from "app/modules/viz-module/sub-modules/allocations/data";

interface AllocationsModuleProps {
  code?: string;
  toolboxOpen?: boolean;
}

export function AllocationsModule(props: AllocationsModuleProps) {
  useTitle(`The Data Explorer -${props.code ? " Location" : ""} Allocations`);

  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelAllocationsPeriodState.value
  );

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

  const fetchDrilldownLevelData = useStoreActions(
    (store) => store.AllocationsDrilldown.fetch
  );
  const clearDrilldownLevelData = useStoreActions(
    (store) => store.AllocationsDrilldown.clear
  );
  const dataDrilldownLevel = useStoreState(
    (state) =>
      get(
        state.AllocationsDrilldown.data,
        "data",
        []
      ) as AllocationsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.AllocationsDrilldown.loading
  );
  const fetchPeriodOptionsData = useStoreActions(
    (store) => store.AllocationsPeriods.fetch
  );
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const isMobile = useMediaQuery("(max-width: 767px)");
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
  const [xsTooltipData, setXsTooltipData] = React.useState<any | null>(null);

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
            fontFamily: "GothamNarrow-Bold",
            formatter: () => formatFinancialValue(total),
          },
        },
      },
    },
    colors,
    labels: keys,
    legend: {
      show: true,
      floating: true,
      fontSize: !isMobile ? "14px" : "10px",
      fontFamily: "GothamNarrow-Book",
      fontWeight: "bold",
      position: "right",
      offsetX: width / 2,
      offsetY: !isMobile ? 25 : 15,
      markers: {
        width: 0,
      },
      formatter: (seriesName: string, opts: any) => {
        return `${seriesName}: ${formatLargeAmountsWithPrefix(
          values[opts.seriesIndex]
        )}`;
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

  function onClick(this: Window, e: MouseEvent | TouchEvent) {
    // @ts-ignore
    if (e.target && e.target.parentNode && !vizSelected) {
      // @ts-ignore
      const key = e.target.parentNode.getAttribute("seriesName");
      if (key) {
        // @ts-ignore
        const keySelected = e.target.getAttribute("selected");
        if (keySelected === "true") {
          setVizLevel(1);
          setVizSelected(key);
          setVizTranslation({ x: -300, y: 0 });
        } else if (isMobile || isTouchDevice()) {
          setXsTooltipData({
            label: key,
            value: values[keys.indexOf(key)],
          });
        }
        // @ts-ignore
      } else if (e.target.className.baseVal === "apexcharts-radialbar-hollow") {
        if (isMobile || isTouchDevice()) {
          setXsTooltipData({
            label: "Total",
            value: sum(values),
          });
        } else {
          setVizLevel(1);
          setVizSelected("Total");
          setVizTranslation({ x: -300, y: 0 });
        }
      }
    }
  }

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({
      filterString: `periods=${selectedPeriod}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [props.code, appliedFilters, selectedPeriod]);

  React.useEffect(() => {
    setKeysPercentagesColors(getKeysPercentages(total, values));
  }, [total, values]);

  React.useEffect(() => {
    const items = document.getElementsByClassName("apexcharts-radial-series");
    if (vizSelected) {
      setVizDrilldowns([
        { name: "Dataset" },
        { name: selectedPeriod },
        { name: vizSelected },
      ]);
      [...items].forEach((item: Element) => {
        const paths = item.getElementsByTagName("path");
        if (paths.length > 0) {
          if (item.getAttribute("seriesName") === vizSelected) {
            // paths[0].style.stroke = "url(#diagonalHatch)";
            paths[0].style.opacity = "1";
          } else {
            paths[0].style.opacity = "0.3";
          }
        }
      });
      const filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      fetchDrilldownLevelData({
        filterString: `levelParam=component/componentName in (${(vizSelected ===
        "Total"
          ? keys.join(",")
          : vizSelected
        )
          .split(",")
          .map((s: string) => `'${s}'`)
          .join(",")})&periods=${selectedPeriod}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      setVizDrilldowns([{ name: "Dataset" }]);
      [...items].forEach((item: Element) => {
        const paths = item.getElementsByTagName("path");
        if (paths.length > 0) {
          paths[0].style.opacity = "1";
        }
      });
      clearDrilldownLevelData();
    }
  }, [vizSelected, selectedPeriod]);

  React.useEffect(() => {
    setVizDrilldowns([{ name: "Dataset" }]);
    fetchPeriodOptionsData({});

    // setTimeout(() => {
    //   const viz = document.getElementById("allocations-radial-bar");
    //   if (viz) {
    //     const svgs = viz.getElementsByTagName("svg");
    //     if (svgs.length > 1) {
    //       const pathElement = document.createElementNS(
    //         "http://www.w3.org/2000/svg",
    //         "path"
    //       );
    //       pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
    //       pathElement.setAttribute("stroke", "#13183F");
    //       pathElement.setAttribute("strokeWidth", "1");

    //       const patternElement = document.createElementNS(
    //         "http://www.w3.org/2000/svg",
    //         "pattern"
    //       );
    //       patternElement.setAttribute("id", "diagonalHatch");
    //       patternElement.setAttribute("patternUnits", "userSpaceOnUse");
    //       patternElement.setAttribute("width", "4");
    //       patternElement.setAttribute("height", "4");
    //       patternElement.appendChild(pathElement);

    //       const defsElement = document.createElementNS(
    //         "http://www.w3.org/2000/svg",
    //         "defs"
    //       );
    //       defsElement.appendChild(patternElement);

    //       svgs[1].appendChild(defsElement);
    //     }
    //   }
    // }, 1000);

    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onClick);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onClick);
    };
  }, []);

  useUnmount(() => setVizDrilldowns([]));

  let vizComponent = <React.Fragment />;

  if (isLoading || isDrilldownLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (vizLevel === 0) {
      vizComponent = (
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
            ref={ref}
            id="allocations-radial-bar"
            css={`
              width: 100%;
            `}
          >
            {total === 0 ? (
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
              />
            )}
          </div>
          {(isMobile || isTouchDevice()) && xsTooltipData && (
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
                    setVizTranslation({ x: -300, y: 0 });
                  }}
                />
              </div>
            </XsContainer>
          )}
        </div>
      );
    } else if (vizLevel === 1) {
      vizComponent = (
        <React.Fragment>
          <span
            css={`
              gap: 40px;
              width: 100%;
              display: flex;
              margin-bottom: 20px;
              flex-direction: row;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 40px;
                  }
                }
              }
            `}
          >
            <DrillDownArrowSelector
              options={[...keys, "Total"]}
              selected={vizSelected || ""}
              onChange={(value: string) => setVizSelected(value)}
            />
          </span>
          <BudgetsTreemap
            data={dataDrilldownLevel}
            tooltipValueLabel="Allocation"
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div
      id="allocations-radial-bar"
      css={`
        width: 100%;

        .apexcharts-radialbar-hollow {
          r: 75;
          z-index: 1;
          cursor: pointer;
          transition: fill 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          fill: ${vizSelected === "Total" ? "#cfd4da" : "transparent"};

          &:hover {
            fill: #cfd4da;
          }
        }
      `}
    >
      <div
        css={`
          display: flex;
          color: #262c34;
          font-size: 14px;
          font-weight: bold;
          align-items: center;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

          > svg {
            margin-left: 10px;
          }
        `}
      >
        Allocations | {selectedPeriod} <InfoIcon />
      </div>
      <div css="font-weight: normal;">{formatFinancialValue(total)}</div>
      <div css="margin-top: 5px;">
        <DrilldownPath />
      </div>
      {vizLevel > 0 && (
        <VizBackBtn
          vizLevel={vizLevel}
          setVizLevel={(value: number) => {
            if (value === 0) {
              setVizSelected(undefined);
            }
            setVizLevel(value);
          }}
        />
      )}
      {vizComponent}
    </div>
  );
}
