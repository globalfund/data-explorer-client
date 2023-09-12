import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import uniq from "lodash/uniq";
import filter from "lodash/filter";
import * as echarts from "echarts/core";
import { useLocalStorage } from "react-use";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { SVGRenderer } from "echarts/renderers";
import Snackbar from "@material-ui/core/Snackbar";
import { ResetIcon } from "app/assets/icons/Reset";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { TooltipComponent, TooltipComponentOption } from "echarts/components";
import {
  TreemapSeriesOption,
  TreemapChart as EchartsTreemap,
} from "echarts/charts";

interface Props {
  selectedDimension: string;
  flattenLocationOptions: {
    label: string;
    value: string;
    subOptions?: {
      label: string;
      value: string;
    }[];
  }[];
  handleDimensionChange: (dimensionId: string) => () => void;
}

const dimensionFilter = {
  Period: ["periods"],
  Location: ["locations"],
  Component: ["components"],
  PartnerType: ["partnerTypes", "partners"],
  GrantStatus: ["status"],
};

echarts.use([TooltipComponent, EchartsTreemap, SVGRenderer]);

export function DisbursementConceptTreemap(props: Props) {
  const history = useHistory();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [chart, setChart] = React.useState<echarts.ECharts | null>(null);
  const [prevDataNames, setPrevDataNames] = React.useState<string[]>([]);

  const [showZoomSnackbar, setShowZoomSnackbar] = useLocalStorage(
    "showZoomSnackbar",
    true
  );

  const data = useStoreState((state) =>
    get(state.ConceptDisbursementsTreemap, "data.data", [])
  );
  const loadData = useStoreActions(
    (actions) => actions.ConceptDisbursementsTreemap.fetch
  );
  const loading = useStoreState(
    (state) => state.ConceptDisbursementsTreemap.loading
  );
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const setAppliedFilters = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const filtersLabelArray = React.useMemo(() => {
    const array: string[] = [];
    if (
      appliedFilters.periods.length > 0 &&
      props.selectedDimension !== "Period"
    ) {
      array.push(appliedFilters.periods.join(" / "));
    }
    if (
      appliedFilters.locations.length > 0 &&
      props.selectedDimension !== "Location"
    ) {
      const locationsWithSubLocations = filter(
        appliedFilters.locations,
        (option: string) =>
          option.startsWith("Q") &&
          find(props.flattenLocationOptions, (o) => o.value === option)
            ?.subOptions
      ) as string[];
      let allLocationsSubLocations: string[] = [];
      locationsWithSubLocations.forEach((option: string) => {
        const fOption = find(
          props.flattenLocationOptions,
          (o) => o.value === option
        );
        allLocationsSubLocations = [
          ...allLocationsSubLocations,
          ...(fOption?.subOptions?.map((so) => so.value) ?? []),
        ];
      });
      let locations = filter(appliedFilters.locations, (option: string) => {
        return (
          option.startsWith("Q") || !allLocationsSubLocations.includes(option)
        );
      });
      locations = locations.map((option: string) => {
        const fOption = find(
          props.flattenLocationOptions,
          (o) => o.value === option
        );
        return fOption?.label ?? option;
      });
      array.push(locations.join(" / "));
    }
    if (
      appliedFilters.components.length > 0 &&
      props.selectedDimension !== "Component"
    ) {
      array.push(appliedFilters.components.join(" / "));
    }
    if (
      (appliedFilters.partnerTypes.length > 0 ||
        appliedFilters.partners.length > 0) &&
      props.selectedDimension !== "PartnerType"
    ) {
      array.push(
        [...appliedFilters.partners, ...appliedFilters.partnerTypes].join(" / ")
      );
    }
    if (
      appliedFilters.status.length > 0 &&
      props.selectedDimension !== "GrantStatus"
    ) {
      array.push(appliedFilters.status.join(" / "));
    }
    return array;
  }, [appliedFilters, props.selectedDimension]);

  const onItemClick = (
    params: {
      data: {
        id: string;
        name: string;
        children?: {
          id: string;
          name: string;
          children?: {
            id: string;
            name: string;
          }[];
        }[];
      };
      treeAncestors: any;
    },
    dimension: string,
    af: any
  ) => {
    switch (dimension) {
      case "Period":
        if (af.periods.includes(params.data.id)) {
          setAppliedFilters.setPeriods(
            filter(af.periods, (p: string) => p !== params.data.id)
          );
        } else {
          setAppliedFilters.setPeriods([...af.periods, params.data.id]);
        }
        break;
      case "Location":
        let ids = [...af.locations];
        if (af.locations.includes(params.data.id)) {
          ids = filter(af.locations, (p: string) => p !== params.data.id);
        } else {
          ids.push(params.data.id);
        }
        if (params.data.children && params.data.children.length > 0) {
          params.data.children.forEach((c) => {
            if (ids.includes(c.id)) {
              ids = filter(ids, (p: string) => p !== c.id);
            } else {
              ids.push(c.id);
              if (c.children && c.children.length > 0) {
                c.children.forEach((cc) => {
                  if (ids.includes(cc.id)) {
                    ids = filter(ids, (p: string) => p !== cc.id);
                  } else {
                    ids.push(cc.id);
                  }
                });
              }
            }
          });
        }
        setAppliedFilters.setLocations(ids);
        break;
      case "Component":
        if (af.components.includes(params.data.id)) {
          setAppliedFilters.setComponents(
            filter(af.components, (p: string) => p !== params.data.id)
          );
        } else {
          setAppliedFilters.setComponents([...af.components, params.data.id]);
        }
        break;
      case "PartnerType":
        if (params.data.children && params.data.children.length > 0) {
          if (af.partnerTypes.includes(params.data.id)) {
            setAppliedFilters.setPartnerTypes(
              filter(af.partnerTypes, (p: string) => p !== params.data.id)
            );
          } else {
            setAppliedFilters.setPartnerTypes([
              ...af.partnerTypes,
              params.data.id,
            ]);
          }
        } else {
          if (af.partners.includes(params.data.id)) {
            setAppliedFilters.setPartners(
              filter(af.partners, (p: string) => p !== params.data.id)
            );
          } else {
            setAppliedFilters.setPartners([...af.partners, params.data.id]);
          }
        }
        break;
      case "GrantStatus":
        if (af.status.includes(params.data.id)) {
          setAppliedFilters.setStatus(
            filter(af.status, (p: string) => p !== params.data.id)
          );
        } else {
          setAppliedFilters.setStatus([...af.status, params.data.id]);
        }
        break;
      case "Grants":
        if (params.treeAncestors.length === 2) {
          history.push(`/grant/${params.data.id}`);
        }
        if (params.treeAncestors.length === 3) {
          history.push(
            `/grant/${params.treeAncestors[1].name}/${params.data.id}`
          );
        }
        break;
      default:
        break;
    }
  };

  const onResetView = () => {
    if (chart) {
      chart.resize();
    }
  };

  React.useEffect(() => {
    let filterString = "";
    const updatedAppliedFilters = { ...appliedFilters };
    get(dimensionFilter, props.selectedDimension, []).forEach(
      (filterKey: string) => {
        // @ts-ignore
        updatedAppliedFilters[filterKey] = [];
      }
    );
    filterString += getAPIFormattedFilters(updatedAppliedFilters);
    filterString += `${filterString.length > 0 ? "&" : ""}dimension=${
      props.selectedDimension
    }`;
    loadData({ filterString });
  }, [props.selectedDimension, appliedFilters]);

  React.useEffect(() => {
    if (containerRef.current) {
      const newChart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      new ResizeObserver(() => newChart.resize()).observe(containerRef.current);

      const option: echarts.ComposeOption<
        TreemapSeriesOption | TooltipComponentOption
      > = {
        series: {
          data,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          type: "treemap",
          colorBy: "series",
          colorMappingBy: "index",
          id: "disbursements-treemap",
          label: {
            color: "#fff",
            lineHeight: 15,
            fontSize: "8px",
            position: "insideTopLeft",
            fontFamily: "GothamNarrow-Book",
            formatter: (params: any) => {
              return [params.name, formatFinancialValue(params.value)].join(
                "\n"
              );
            },
          },
          upperLabel: {
            show: true,
            height: 40,
            distance: 0,
            color: "#fff",
            lineHeight: 15,
            fontSize: "8px",
            fontFamily: "GothamNarrow-Book",
          },
          select: {
            itemStyle: {
              color: "#000",
            },
          },
          levels: [
            {
              itemStyle: {
                gapWidth: 0,
                borderWidth: 6,
                color: "#595d70",
                borderColor: "#dfe3e5",
              },
              upperLabel: {
                show: false,
              },
              select: {
                itemStyle: {
                  color: "#000",
                  borderColor: "#dfe3e5",
                },
              },
            },
            {
              itemStyle: {
                gapWidth: 0,
                borderWidth: 6,
                color: "#424659",
                borderColor: "#595d70",
              },
              select: {
                itemStyle: {
                  color: "#000",
                  borderColor: "#595d70",
                },
              },
            },
            {
              itemStyle: {
                gapWidth: 0,
                borderWidth: 6,
                color: "#252c34",
                borderColor: "#424659",
              },
              select: {
                itemStyle: {
                  color: "#000",
                  borderColor: "#424659",
                },
              },
            },
          ],
          selectedMode: "multiple",
          nodeClick: "link",
          breadcrumb: {
            show: false,
          },
        },
        tooltip: {
          padding: 0,
          borderWidth: 0,
          trigger: "item",
          borderRadius: 16,
          triggerOn: "mousemove",
          formatter: (params: any) => {
            return (
              `<div class="treemap-tooltip">` +
              `<div class="treemap-tooltip-title">Disbursements 
              ${filtersLabelArray.join(" · ")}${
                filtersLabelArray.length > 0 ? " · " : ""
              }${params.name}</div>` +
              `<div class="treemap-tooltip-value"><b>Total amount</b>${formatFinancialValue(
                params.value
              )}</div>` +
              `</div>`
            );
          },
        },
      };

      newChart.setOption(option);
      setChart(newChart);
    }
  }, [containerRef.current, data]);

  React.useEffect(() => {
    if (chart) {
      chart.off("click");
      chart.on("click", (params: any) => {
        if (props.selectedDimension && props.selectedDimension.length > 0) {
          onItemClick(params, props.selectedDimension, appliedFilters);
        }
      });
    }
  }, [chart, props.selectedDimension, appliedFilters]);

  React.useEffect(() => {
    setPrevDataNames((prev) => {
      const allDataNames: string[] = [];
      data.forEach((d: any) => {
        allDataNames.push(d.name);
        if (d.children && d.children.length > 0) {
          d.children.forEach((c: any) => {
            allDataNames.push(c.name);
            if (c.children && c.children.length > 0) {
              c.children.forEach((cc: any) => {
                allDataNames.push(cc.name);
              });
            }
          });
        }
      });
      return uniq([...prev, ...allDataNames]);
    });
  }, [data]);

  React.useEffect(() => {
    if (chart) {
      let names: string[] = [];
      switch (props.selectedDimension) {
        case "Period":
          names = appliedFilters.periods;
          break;
        case "Location":
          names = appliedFilters.locations.map((l) => getNameFromIso3(l));
          break;
        case "Component":
          names = appliedFilters.components;
          break;
        case "PartnerType":
          names = [...appliedFilters.partners, ...appliedFilters.partnerTypes];
          break;
        case "GrantStatus":
          names = appliedFilters.status;
          break;
        default:
          break;
      }
      chart.dispatchAction({
        type: "unselect",
        seriesId: "disbursements-treemap",
        name: prevDataNames,
      });
      chart.dispatchAction({
        type: "select",
        seriesId: "disbursements-treemap",
        name: names,
      });
    }
  }, [appliedFilters, props.selectedDimension]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      <div
        css={`
          width: 100%;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Button
          onClick={onResetView}
          startIcon={<ResetIcon />}
          css={`
            span {
              text-transform: none;
            }
          `}
        >
          Reset view
        </Button>
      </div>
      <Snackbar
        open={showZoomSnackbar}
        message="Scroll to zoom in to the data blocks"
        action={
          <Button
            onClick={() => setShowZoomSnackbar(false)}
            css={`
              background: #fff;
              span {
                text-transform: none;
                &:hover {
                  color: #fff;
                }
              }
            `}
          >
            Got it
          </Button>
        }
      />
      <div
        ref={containerRef}
        css={`
          width: 100%;
          height: 490px;
          background: #dfe3e5;
        `}
      />
    </React.Fragment>
  );
}
