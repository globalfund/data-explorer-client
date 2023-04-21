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
import {
  GeoMapPinMarker,
  geomapLegendItems,
} from "app/components/Charts/GeoMap/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export function PledgesContributionsGeoMap() {
  useTitle("The Data Explorer - Pledges & Contributions GeoMap");

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
      <div
        css={`
          gap: 12px;
          display: flex;
          margin-bottom: 20px;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-end;
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
            <b>
              {valueType}
              {appliedFilters.replenishmentPeriods.length === 1
                ? ` | ${appliedFilters.replenishmentPeriods[0]}`
                : ""}
            </b>
          </div>
          <div
            css={`
              gap: 5px;
              display: flex;
              flex-direction: row;
            `}
          >
            {geomapLegendItems.map((item) => (
              <div
                key={item}
                css={`
                  gap: 6px;
                  height: 100%;
                  display: flex;
                  min-width: 24px;
                  font-size: 12px;
                  text-align: center;
                  flex-direction: column;

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-bottom: 6px;
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
                    background: ${item};
                    border: 0.5px solid ${appColors.COMMON.SECONDARY_COLOR_7};
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  `}
                />
              </div>
            ))}
          </div>
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
      </div>
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
    </div>
  );
}
