/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import uniqueId from "lodash/uniqueId";
import { FeatureCollection } from "geojson";
import { useHistory } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { GeoMap } from "app/components/Charts/GeoMap";
import { PageLoader } from "app/modules/common/page-loader";
import { GeoMapPinMarker } from "app/components/Charts/GeoMap/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { useCMSData } from "app/hooks/useCMSData";

export function PledgesContributionsGeoMap() {
  useTitle("The Data Explorer - Pledges & Contributions GeoMap");
  const cmsData = useCMSData({ returnData: true });
  const history = useHistory();

  const valueType = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );
  const view = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.PledgesContributionsGeomap.fetch
  );
  const layers = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.PledgesContributionsGeomap.data, "layers", []),
      } as FeatureCollection)
  );
  const maxValue = useStoreState((state) =>
    get(state.PledgesContributionsGeomap.data, "maxValue", 0)
  );
  const pins = useStoreState(
    (state) =>
      get(
        state.PledgesContributionsGeomap.data,
        "pins",
        []
      ) as GeoMapPinMarker[]
  );
  const isLoading = useStoreState(
    (state) => state.PledgesContributionsGeomap.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, {
        name: "Resource Mobilization: Pledges & Contributions",
      })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Resource Mobilization: Pledges & Contributions",
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters);
    fetchData({
      filterString: `valueType=${valueType}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [valueType, appliedFilters]);

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
        data={
          view === "Public Sector"
            ? layers
            : {
                type: "FeatureCollection",
                features: [],
              }
        }
        type="donors"
        pins={
          view === "Public Sector"
            ? []
            : filter(pins, {
                subType: view,
              })
        }
        noData={
          view === "Public Sector"
            ? maxValue === 0
            : filter(pins, {
                subType: view,
              }).length === 0
        }
        investmentsPins={[]}
        allocationsPins={[]}
      />
      <div
        css={`
          gap: 12px;
          display: flex;
          margin-top: 20px;
          flex-direction: row;
          align-items: flex-end;
          visibility: ${view === "Public Sector" ? "visible" : "hidden"};

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
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
            <b>{valueType}</b>
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
            <div>{get(cmsData, "componentsChartsGeomap.minRange")}</div>
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
            font-weight: bold;
            text-align: center;
            flex-direction: column;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

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
              border-radius: 20px;
              border: 0.5px solid ${appColors.COMMON.SECONDARY_COLOR_7};
              background: ${appColors.GEOMAP.NO_DATA_LAYER_COLOR};
            `}
          />
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {get(cmsData, "componentsChartsGeomap.notAvailable")}
          </div>
        </div>
      </div>
    </div>
  );
}
