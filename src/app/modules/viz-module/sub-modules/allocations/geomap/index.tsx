/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { FeatureCollection } from "geojson";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { GeoMap } from "app/components/Charts/GeoMap";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { AllocationsGeoMapPinMarker } from "app/components/Charts/GeoMap/data";

interface Props {
  code?: string;
}

export function AllocationsGeoMap(props: Props) {
  useTitle(
    `The Data Explorer -${props.code ? ` ${props.code}` : ""} Allocations`
  );
  // api call & data
  const fetchData = useStoreActions((store) => store.AllocationsGeomap.fetch);
  const data = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.AllocationsGeomap.data, "data", []),
      } as FeatureCollection)
  );
  const maxValue = useStoreState((state) =>
    get(state.AllocationsGeomap.data, "maxValue", 0)
  );
  const fetchMCData = useStoreActions(
    (store) => store.AllocationsMCGeomap.fetch
  );
  const dataMC = useStoreState(
    (state) =>
      get(
        state.AllocationsMCGeomap,
        "data.pins",
        []
      ) as AllocationsGeoMapPinMarker[]
  );
  const geomapView = useStoreState(
    (state) => state.ToolBoxPanelInvestmentsMapViewState.value
  );

  const isLoading = useStoreState(
    (state) =>
      state.AllocationsGeomap.loading || state.AllocationsMCGeomap.loading
  );

  const fetchPeriodOptionsData = useStoreActions(
    (store) => store.AllocationsPeriods.fetch
  );
  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelAllocationsPeriodState.value
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    fetchPeriodOptionsData({});
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    if (geomapView === "countries") {
      fetchData({
        filterString:
          selectedPeriod !== "All"
            ? `periods=${selectedPeriod}${
                filterString.length > 0 ? `&${filterString}` : ""
              }`
            : "",
      });
    } else if (geomapView === "multicountries") {
      fetchMCData({ filterString });
    }
  }, [props.code, appliedFilters, geomapView, selectedPeriod]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <GeoMap
        allowClickthrough
        clickthroughPath="allocations"
        type="allocations"
        data={
          geomapView === "countries"
            ? data
            : {
                type: "FeatureCollection",
                features: [],
              }
        }
        pins={[]}
        investmentsPins={[]}
        noData={maxValue === 0}
        allocationsPins={geomapView === "multicountries" ? dataMC : []}
      />
      {geomapView === "countries" && (
        <div
          css={`
            gap: 12px;
            display: flex;
            margin-top: 20px;
            flex-direction: row;
            align-items: flex-end;

            > * {
              @supports (-webkit-touch-callout: none) and
                (not (translate: none)) {
                &:not(:last-child) {
                  margin-right: 12px;
                }
              }
            }
          `}
        >
          <div
            css={`
              gap: 6px;
              width: 250px;
              display: flex;
              font-size: 12px;
              flex-direction: column;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 6px;
                  }
                }
              }
            `}
          >
            <div>
              <b>Allocations | {selectedPeriod}</b>
            </div>
            <div
              css={`
                width: 100%;
                height: 6px;
                border-radius: 20px;
                background: linear-gradient(
                  90deg,
                  ${appColors.GEOMAP.DATA_LAYER_COLOR_1} 0%,
                  ${appColors.GEOMAP.DATA_LAYER_COLOR_12} 100%
                );
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
              <div>{formatFinancialValue(maxValue)}</div>
            </div>
          </div>
          <div
            css={`
              gap: 6px;
              width: 43px;
              height: 100%;
              display: flex;
              font-size: 12px;
              text-align: center;
              flex-direction: column;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 6px;
                  }
                }
              }
            `}
          >
            <div
              css={`
                width: 100%;
                height: 6px;
                font-weight: bold;
                border-radius: 20px;
                border: 0.5px solid ${appColors.COMMON.SECONDARY_COLOR_7};
                background: ${appColors.GEOMAP.NO_DATA_LAYER_COLOR};
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            />
            <div>N/A</div>
          </div>
        </div>
      )}
    </div>
  );
}
