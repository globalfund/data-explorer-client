/* third-party */
import React from "react";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import { ApexOptions } from "apexcharts";
import Grid from "@material-ui/core/Grid";
import ReactApexCharts from "react-apexcharts";
import { useTitle, useMeasure } from "react-use";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { TransitionContainer } from "app/components/TransitionContainer";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import {
  getKeysPercentages,
  AllocationsTreemapDataItem,
} from "app/modules/viz-module/sub-modules/allocations/data";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { NoDataAllocations } from "./components/nodata";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { Dropdown } from "app/components/Dropdown";

interface AllocationsModuleProps {
  code?: string;
}

export function AllocationsModule(props: AllocationsModuleProps) {
  useTitle(`The Data Explorer -${props.code ?? " Location"} Allocations`);

  const dataPeriodOptions = useStoreState(
    (state) => get(state.AllocationsPeriods.data, "data", []) as string[]
  );

  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    get(dataPeriodOptions, "[0]", "2014 - 2016")
  );

  // api call & data
  const fetchData = useStoreActions((store) => store.Allocations.fetch);
  const total = useStoreState(
    (state) => get(state.Allocations.data, "total", []) as number
  );
  const keys = useStoreState(
    (state) => get(state.Allocations.data, "keys", []) as string[]
  );
  // const colors = useStoreState(
  //   (state) => get(state.Allocations.data, "colors", []) as string[]
  // );
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

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

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
    if (e.target && e.target.parentNode && !vizSelected) {
      // @ts-ignore
      const key = e.target.parentNode.getAttribute("seriesName");
      if (key) {
        // @ts-ignore
        const keySelected = e.target.getAttribute("selected");
        if (keySelected === "true") {
          setVizLevel(1);
          setVizScale(0.4);
          setVizSelected(key);
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
      const filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      fetchDrilldownLevelData({
        filterString: `levelParam=component/componentName eq '${vizSelected}'&periods=${selectedPeriod}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      [...items].forEach((item: Element) => {
        const paths = item.getElementsByTagName("path");
        if (paths.length > 0) {
          paths[0].style.stroke = "";
        }
      });
      clearDrilldownLevelData();
    }
  }, [vizSelected, selectedPeriod]);

  React.useEffect(() => {
    fetchPeriodOptionsData({});

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

  React.useEffect(
    () => setSelectedPeriod(get(dataPeriodOptions, "[0]", "2014 - 2016")),
    [dataPeriodOptions]
  );

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
      // overflow: visible !important;
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
          <div
            css={`
              display: flex;
              color: #262c34;
              font-size: 14px;
              font-weight: bold;
              align-items: center;

              > svg {
                margin-left: 10px;
              }
            `}
          >
            Allocations <InfoIcon />
          </div>
          <div css="font-weight: normal;">{formatFinancialValue(total)}</div>
          <div
            css={`
              gap: 6px;
              display: flex;
              margin-top: 15px;
              align-items: center;
              flex-direction: row;
            `}
          >
            <div
              css={`
                color: #262c34;
                font-size: 14px;
                font-weight: bold;
                margin-right: 10px;
              `}
            >
              Period
            </div>
            <Dropdown
              enablePortal
              value={selectedPeriod}
              options={dataPeriodOptions}
              handleChange={setSelectedPeriod}
            />
          </div>
          {total === 0 ? (
            <div css="display: flex;justify-content: center;">
              <NoDataLabel />
              <NoDataAllocations />
            </div>
          ) : (
            <ReactApexCharts
              height={580}
              type="radialBar"
              options={options}
              series={keysPercentagesColors.percentages}
            />
          )}
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
        loading={isDrilldownLoading}
        close={() => {
          setVizLevel(0);
          setVizScale(1);
          setVizSelected(undefined);
          setVizTranslation({ x: 0, y: 0 });
        }}
      >
        <span
          css={`
            gap: 40px;
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            flex-direction: row;
          `}
        >
          <DrillDownArrowSelector
            options={keys}
            selected={vizSelected as string}
            onChange={(value: string) => setVizSelected(value)}
          />
        </span>
        <BudgetsTreemap
          data={dataDrilldownLevel}
          tooltipValueLabel="Allocation"
          onNodeClick={(node: string, x: number, y: number) => {}}
        />
      </SlideInContainer>
    </div>
  );
}
