/* third-party */
import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";
import { Feature, FeatureCollection } from "geojson";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { GeoMapPinMarker } from "app/components/Charts/GeoMap/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

function getTableData(
  data: {
    layers: FeatureCollection;
    pins: GeoMapPinMarker[];
  },
  mapView: string
): SimpleTableRow[] {
  const updatedTableData: SimpleTableRow[] = [];
  if (mapView === "Public Sector") {
    filter(
      data.layers.features,
      (feature: Feature) =>
        get(feature.properties, "data.amounts[0].value", 0) > 0
    ).forEach((feature: Feature) => {
      updatedTableData.push({
        name: get(feature.properties, "name", feature.id),
        value: formatFinancialValue(
          get(feature.properties, "data.amounts[0].value", 0),
          true
        ),
      });
    });
  } else {
    filter(data.pins, {
      subType: mapView,
    }).forEach((pin: GeoMapPinMarker) => {
      updatedTableData.push({
        name: pin.geoName,
        value: formatFinancialValue(pin.amounts[0].value, true),
      });
    });
  }
  return orderBy(updatedTableData, "name", "asc");
}

export function PledgesContributionsTable() {
  useTitle("The Data Explorer - Pledges & Contributions Table");

  const layers = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.PledgesContributionsGeomap.data, "layers", []),
      } as FeatureCollection)
  );
  const pins = useStoreState(
    (state) =>
      get(
        state.PledgesContributionsGeomap.data,
        "pins",
        []
      ) as GeoMapPinMarker[]
  );

  const valueType = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );

  const view = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );

  const [tableData, setTableData] = React.useState<SimpleTableRow[]>([]);

  const fetchData = useStoreActions(
    (store) => store.PledgesContributionsGeomap.fetch
  );

  const data = useStoreState((state) => state.PledgesContributionsGeomap.data);

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

  React.useEffect(() => {
    setTableData(getTableData({ layers, pins }, view));
  }, [data, view]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <SimpleTable
      rows={tableData}
      columns={[
        { name: "Donor", key: "name" },
        { name: `${valueType} (USD)`, key: "value" },
      ]}
    />
  );
}
