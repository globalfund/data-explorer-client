/* third-party */
import React from "react";
import get from "lodash/get";
import { FeatureCollection } from "geojson";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { GeoMap } from "app/components/Charts/GeoMap";
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { AllocationsGeoMapPinMarker } from "app/components/Charts/GeoMap/data";
import { useMediaQuery } from "@material-ui/core";

interface Props {
  code?: string;
  grantCode?: string;
  grantPeriod?: string;
  detailFilterType?: string;
}

export function BudgetsGeoMap(props: Props) {
  useTitle(`The Data Explorer -${props.code ? ` ${props.code}` : ""} Budgets`);
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

  const isLoading = useStoreState(
    (state) => state.BudgetsGeomap.loading || state.BudgetsMCGeomap.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  React.useEffect(() => {
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
  }, [
    props.code,
    props.grantCode,
    props.grantPeriod,
    appliedFilters,
    geomapView,
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
      {geomapView === "countries" && isSmallScreen && (
        <div>
          <div>
            <b>Budgets</b>
          </div>
          <div>{formatFinancialValue(maxValue)}</div>
        </div>
      )}
      <GeoMap
        allowClickthrough
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
      {geomapView === "countries" && !isSmallScreen && (
        <div
          css={`
            gap: 12px;
            display: flex;
            margin-top: 20px;
            flex-direction: row;
            align-items: flex-end;
          `}
        >
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
              <b>Budgets</b>
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
              text-align: center;
              flex-direction: column;
            `}
          >
            <div
              css={`
                width: 100%;
                height: 6px;
                background: #fff;
                font-weight: bold;
                border-radius: 20px;
                border: 0.5px solid #c7cdd1;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
      )}
    </div>
  );
}
