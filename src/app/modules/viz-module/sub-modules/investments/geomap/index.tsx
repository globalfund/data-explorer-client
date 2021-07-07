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

interface Props {
  code?: string;
}

export function InvestmentsGeoMap(props: Props) {
  useTitle("The Data Explorer - Investments/Geomap");
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
  const isLoading = useStoreState((state) => state.DisbursementsGeomap.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters]);

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
        type="investments"
        data={data}
        pins={[]}
        noData={maxValue === 0}
      />
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
            <b>Disbursements</b>
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
    </div>
  );
}
