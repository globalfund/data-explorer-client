/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import { useUpdateEffect } from "react-use";
import { useMediaQuery } from "@material-ui/core";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import BreadCrumbs from "app/components/Charts/common/breadcrumbs";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { DisbursementConceptDimensions } from "app/modules/concept-module/components/dimensions";
import { DisbursementConceptTreemap } from "app/modules/concept-module/disbursements/charts/treemap";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export interface LabelValue {
  label: string;
  value: string;
  subOptions?: LabelValue[];
}

export function traverseOptions(options: LabelValue[], arr: LabelValue[]) {
  options.forEach((option) => {
    arr.push({
      label: option.label,
      value: option.value,
      subOptions: option.subOptions,
    });
    if (option.subOptions) {
      traverseOptions(option.subOptions, arr);
    }
  });
}

export default function DisbursementsConceptModule() {
  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ vizType: string; subType?: string }>();
  const [selectedDimension, setSelectedDimension] = React.useState("");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  const dimensions = useStoreState(
    (state) =>
      get(state.ConceptDisbursementsDimensions, "data.dimensions", []) as {
        id: string;
        name: string;
      }[]
  );
  const loadDimensions = useStoreActions(
    (actions) => actions.ConceptDisbursementsDimensions.fetch
  );
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const locationFilterOptions = useStoreState(
    (state) =>
      get(state.LocationFilterOptions, "data.options", []) as LabelValue[]
  );
  const data = useStoreState((state) =>
    get(state.ConceptDisbursementsTreemap, "data.data", [])
  );
  const total = useStoreState((state) =>
    get(state.ConceptDisbursementsTotal, "data.total", 0)
  );
  const loadTotal = useStoreActions(
    (actions) => actions.ConceptDisbursementsTotal.fetch
  );

  const dataTotal = React.useMemo(() => {
    let dimensionFilters: string[] = [];
    switch (selectedDimension) {
      case "Period":
        dimensionFilters = appliedFilters.periods;
        break;
      case "Location":
        dimensionFilters = appliedFilters.locations;
        break;
      case "Component":
        dimensionFilters = appliedFilters.components;
        break;
      case "PartnerType":
        dimensionFilters = [
          ...appliedFilters.partnerTypes,
          ...appliedFilters.partners,
        ];
        break;
      case "Status":
        dimensionFilters = appliedFilters.status;
        break;
      default:
        dimensionFilters = [];
    }
    if (dimensionFilters.length === 0) {
      return sumBy(data, "value");
    }
    return sumBy(
      data.filter((item: any) => dimensionFilters.includes(item.id)),
      "value"
    );
  }, [data, appliedFilters, selectedDimension]);

  const totalPercentage = React.useMemo(() => {
    if (total === 0) return 0;
    return ((dataTotal / total) * 100).toFixed(2).replace(".00", "");
  }, [dataTotal, total]);

  const flattenLocationOptions = React.useMemo(() => {
    const arr: LabelValue[] = [];
    traverseOptions(locationFilterOptions, arr);
    return arr;
  }, [locationFilterOptions]);

  const filtersLabelArray = React.useMemo(() => {
    const array: string[] = [];
    if (appliedFilters.periods.length > 0) {
      array.push(appliedFilters.periods.join(" / "));
    }
    if (appliedFilters.locations.length > 0) {
      const locationsWithSubLocations = filter(
        appliedFilters.locations,
        (option: string) =>
          option.startsWith("Q") &&
          find(flattenLocationOptions, (o) => o.value === option)?.subOptions
      ) as string[];
      let allLocationsSubLocations: string[] = [];
      locationsWithSubLocations.forEach((option: string) => {
        const fOption = find(flattenLocationOptions, (o) => o.value === option);
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
        const fOption = find(flattenLocationOptions, (o) => o.value === option);
        return fOption?.label ?? option;
      });
      array.push(locations.join(" / "));
    }
    if (appliedFilters.components.length > 0) {
      array.push(appliedFilters.components.join(" / "));
    }
    if (
      appliedFilters.partnerTypes.length > 0 ||
      appliedFilters.partners.length > 0
    ) {
      array.push(
        [...appliedFilters.partners, ...appliedFilters.partnerTypes].join(" / ")
      );
    }
    if (appliedFilters.status.length > 0) {
      array.push(appliedFilters.status.join(" / "));
    }
    return array;
  }, [appliedFilters]);

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_1;
    loadDimensions({});
    loadTotal({});
  }, []);

  React.useEffect(() => {
    if (!isMobile && !openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [location.pathname]);

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

  useUpdateEffect(() => setSelectedDimension(dimensions[0]?.id), [dimensions]);

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 450 - widthThreshold;
  }

  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  function isToolboxOvervlayVisible() {
    if (isSmallScreen) return 0;
    if (openToolboxPanel && widthThreshold < 0) return 1;
    return 0;
  }

  function handleDimensionChange(dimensionId: string) {
    return () => {
      setSelectedDimension(dimensionId);
    };
  }

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <BreadCrumbs />
      <PageHeader title={params.vizType.replace("-", " & ")} />
      <div
        css={`
          width: 100%;
          height: 50px;
        `}
      />
      {isMobile && (
        <React.Fragment>
          <MobileViewControl />
          <div
            css={`
              width: 100%;
              height: 15px;
            `}
          />
        </React.Fragment>
      )}
      <div
        id="export-view-div"
        css={`
          height: 100%;
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - ${pushValue}px)` : "100%"};
        `}
        ref={vizWrapperRef}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            margin-bottom: 15px;
            flex-direction: column;
          `}
        >
          <div
            css={`
              font-family: "GothamNarrow-Bold";
            `}
          >
            Investments - Disbursements
            {filtersLabelArray.length > 0 ? ": " : ""}
            {filtersLabelArray.join(" · ")}
          </div>
          <div>
            {formatFinancialValue(dataTotal)} out of{" "}
            {formatFinancialValue(total)} | {totalPercentage}%
          </div>
        </div>
        <DisbursementConceptDimensions
          dimensions={dimensions}
          selectedDimension={selectedDimension}
          handleDimensionChange={handleDimensionChange}
        />
        <Switch>
          <Route path="/concept/disbursements/treemap">
            <DisbursementConceptTreemap
              selectedDimension={selectedDimension}
              handleDimensionChange={handleDimensionChange}
              flattenLocationOptions={flattenLocationOptions}
            />
          </Route>
        </Switch>
      </div>
      <div
        css={`
          @media (max-width: 767px) {
            width: 100%;
            height: 140px;
          }
        `}
      />
      <ToolBoxPanel
        open={openToolboxPanel}
        vizWrapperRef={vizWrapperRef}
        onCloseBtnClick={(value?: boolean) =>
          setOpenToolboxPanel(value ?? !openToolboxPanel)
        }
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname,
          filtergroups
        )}
        css={`
          z-index: 1;
        `}
      />
      <div
        css={`
          left: 0;
          top: 45px;
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${isToolboxOvervlayVisible()};
          visibility: ${isToolboxOvervlayVisible() === 1
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
