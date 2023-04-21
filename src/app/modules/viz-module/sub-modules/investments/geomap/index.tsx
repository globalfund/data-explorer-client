/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { appColors } from "app/theme";
import uniqueId from "lodash/uniqueId";
import { FeatureCollection } from "geojson";
import useTitle from "react-use/lib/useTitle";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { GeoMap } from "app/components/Charts/GeoMap";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import {
  InvestmentsGeoMapPinMarker,
  geomapLegendItems,
} from "app/components/Charts/GeoMap/data";

interface Props {
  code?: string;
  detailFilterType?: string;
  type?: "Disbursed" | "Signed" | "Committed";
}

export function InvestmentsGeoMap(props: Props) {
  useTitle("The Data Explorer - Investments/Map");

  const history = useHistory();

  // api call & data
  const fetchData = useStoreActions((store) => store.DisbursementsGeomap.fetch);
  const data = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.DisbursementsGeomap.data, "data", []),
      } as FeatureCollection)
  );
  const maxValue = useStoreState((state) =>
    get(state.DisbursementsGeomap.data, "maxValue", 0)
  );
  const fetchMCData = useStoreActions(
    (store) => store.DisbursementsGeomapMulticountries.fetch
  );
  const dataMC = useStoreState(
    (state) =>
      get(
        state.DisbursementsGeomapMulticountries,
        "data.pins",
        []
      ) as InvestmentsGeoMapPinMarker[]
  );
  const geomapView = useStoreState(
    (state) => state.ToolBoxPanelInvestmentsMapViewState.value
  );
  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  const isLoading = useStoreState(
    (state) =>
      state.DisbursementsGeomap.loading ||
      state.DisbursementsGeomapMulticountries.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, { name: `Grant Implementation: ${props.type}` })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: `Grant Implementation: ${props.type}`,
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (
      (history.location.search.length > 0 &&
        appliedFilters.appliedFiltersCount > 0) ||
      (history.location.search.length === 0 &&
        appliedFilters.appliedFiltersCount === 0)
    ) {
      const filterString = getAPIFormattedFilters(
        props.code && props.detailFilterType
          ? {
              ...appliedFilters,
              [props.detailFilterType]: [
                ...get(appliedFilters, props.detailFilterType, []),
                props.code,
              ],
            }
          : appliedFilters
      );
      if (geomapView === "countries") {
        fetchData({
          filterString:
            filterString.length > 0
              ? `${filterString}&aggregationField=${
                  props.type ? props.type.toLowerCase() : "disbursed"
                }`
              : `aggregationField=${
                  props.type ? props.type.toLowerCase() : "disbursed"
                }`,
        });
      } else if (geomapView === "multicountries") {
        fetchMCData({
          filterString:
            filterString.length > 0
              ? `${filterString}&aggregationField=${
                  props.type ? props.type.toLowerCase() : "disbursed"
                }`
              : `aggregationField=${
                  props.type ? props.type.toLowerCase() : "disbursed"
                }`,
        });
      }
    }
  }, [
    props.code,
    appliedFilters,
    geomapView,
    props.type,
    history.location.search,
  ]);

  let clickthroughPath = "signed/treemap";
  if (props.type === "Committed") {
    clickthroughPath = "commitment/treemap";
  } else if (props.type === "Disbursed") {
    clickthroughPath = "disbursements/treemap";
  }

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
      {geomapView === "countries" && (
        <div
          css={`
            gap: 12px;
            display: flex;
            margin-bottom: 20px;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-end;

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
              <b>{props.type || "Disbursements"}</b>
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
      )}
      <GeoMap
        allowClickthrough
        clickthroughPath={clickthroughPath}
        type="investments"
        data={
          geomapView === "countries"
            ? data
            : {
                type: "FeatureCollection",
                features: [],
              }
        }
        pins={[]}
        allocationsPins={[]}
        noData={maxValue === 0}
        investmentSubType={props.type}
        investmentsPins={geomapView === "multicountries" ? dataMC : []}
      />
    </div>
  );
}
