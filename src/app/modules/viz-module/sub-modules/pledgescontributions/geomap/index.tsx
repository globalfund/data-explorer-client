/* third-party */
import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { FeatureCollection } from "geojson";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { GeoMap } from "app/components/Charts/GeoMap";
import { PageLoader } from "app/modules/common/page-loader";
import {
  GeoMapPinMarker,
  NO_DATA_COLOR,
} from "app/components/Charts/GeoMap/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export function PledgesContributionsGeoMap() {
  useTitle("The Data Explorer - Pledges & Contributions GeoMap");
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
              background: linear-gradient(90deg, #cdd4df 0%, #252c34 100%);
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
              border: 0.5px solid #c7cdd1;
              background: ${NO_DATA_COLOR};
            `}
          />
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            N/A
          </div>
        </div>
      </div>
    </div>
  );
}
