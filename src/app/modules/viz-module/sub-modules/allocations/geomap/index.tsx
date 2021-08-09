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
import { InvestmentsGeoMapPinMarker } from "app/components/Charts/GeoMap/data";
import { Dropdown } from "app/components/Dropdown";

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

  const isLoading = useStoreState(
    (state) =>
      state.AllocationsGeomap.loading ||
      state.DisbursementsGeomapMulticountries.loading
  );

  const fetchPeriodOptionsData = useStoreActions(
    (store) => store.AllocationsPeriods.fetch
  );
  const dataPeriodOptions = useStoreState(
    (state) => get(state.AllocationsPeriods.data, "data", []) as string[]
  );
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    get(dataPeriodOptions, "[0]", "2014 - 2016")
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    fetchPeriodOptionsData({});
  }, []);

  React.useEffect(
    () => setSelectedPeriod(get(dataPeriodOptions, "[0]", "2014 - 2016")),
    [dataPeriodOptions]
  );

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
        filterString: `periods=${selectedPeriod}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
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
      <div
        css={`
          gap: 6px;
          display: flex;
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
      <GeoMap
        allowClickthrough
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
        investmentsPins={geomapView === "multicountries" ? dataMC : []}
        noData={maxValue === 0}
      />
      {geomapView === "countries" && (
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
            `}
          >
            <div
              css={`
                width: 100%;
                height: 6px;
                background: #fff;
                border-radius: 20px;
                border: 0.5px solid #c7cdd1;
              `}
            />
            <div>N/A</div>
          </div>
        </div>
      )}
    </div>
  );
}
