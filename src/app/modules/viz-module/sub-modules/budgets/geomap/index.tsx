/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { appColors } from "app/theme";
import uniqueId from "lodash/uniqueId";
import { FeatureCollection } from "geojson";
import useTitle from "react-use/lib/useTitle";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { GeoMap } from "app/components/Charts/GeoMap";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import {
  AllocationsGeoMapPinMarker,
  geomapLegendItems,
} from "app/components/Charts/GeoMap/data";

interface Props {
  code?: string;
  grantCode?: string;
  grantPeriod?: string;
  detailFilterType?: string;
}

export function BudgetsGeoMap(props: Props) {
  useTitle(`The Data Explorer -${props.code ? ` ${props.code}` : ""} Budgets`);

  const history = useHistory();

  const isMobile = useMediaQuery("(max-width: 767px)");

  // api call & data
  const fetchData = useStoreActions((store) => store.BudgetsGeomap.fetch);
  const data = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.BudgetsGeomap.data, "data", []),
      } as FeatureCollection)
  );
  const maxValue = useStoreState((state) =>
    get(state.BudgetsGeomap.data, "maxValue", 0)
  );
  const fetchMCData = useStoreActions((store) => store.BudgetsMCGeomap.fetch);
  const dataMC = useStoreState(
    (state) =>
      get(
        state.BudgetsMCGeomap,
        "data.pins",
        []
      ) as AllocationsGeoMapPinMarker[]
  );
  const geomapView = useStoreState(
    (state) => state.ToolBoxPanelInvestmentsMapViewState.value
  );
  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  const isLoading = useStoreState(
    (state) => state.BudgetsGeomap.loading || state.BudgetsMCGeomap.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, { name: "Grant Implementation: Budgets" })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Grant Implementation: Budgets",
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
      let filterString = getAPIFormattedFilters(
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
      if (props.grantCode && props.grantPeriod) {
        filterString = `grantId='${props.grantCode}'&IPnumber=${props.grantPeriod}`;
      }
      if (geomapView === "countries") {
        fetchData({ filterString });
      } else if (geomapView === "multicountries") {
        fetchMCData({ filterString });
      }
    }
  }, [
    props.code,
    props.grantCode,
    props.grantPeriod,
    appliedFilters,
    geomapView,
    history.location.search,
  ]);

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
      {!isMobile && geomapView === "countries" && (
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
              <b>Budgets</b>
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
        clickthroughPath="budgets/flow"
        type="budgets"
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
    </div>
  );
}
