import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code?: string;
}

export function GenericInvestmentsDisbursedWrapper(props: Props) {
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.DisbursementsTreemap.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.DisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.DisbursementsTreemap.loading
  );
  const fetchDrilldownData = useStoreActions(
    (store) => store.DisbursementsTreemapDrilldown.fetch
  );
  const drilldownData = useStoreState(
    (state) =>
      get(
        state.DisbursementsTreemapDrilldown.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.DisbursementsTreemapDrilldown.loading
  );

  React.useEffect(() => {
    const params = props.code
      ? {
          filterString: `locations=${props.code}`,
        }
      : {};
    fetchData(params);
  }, [props.code]);

  useUpdateEffect(() => {
    if (vizSelected) {
      const splits = vizSelected.split("-");
      if (splits.length > 0) {
        const params = props.code
          ? {
              filterString: `locations=${props.code}`,
            }
          : {};
        if (params.filterString) {
          params.filterString += `,${splits[0]}`;
        } else {
          params.filterString = `locations=${splits[0]}`;
        }
        fetchDrilldownData(params);
      }
    }
  }, [vizSelected]);

  return (
    <InvestmentsDisbursedModule
      data={data}
      vizLevel={vizLevel}
      isLoading={isLoading}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      drilldownData={drilldownData}
      setVizSelected={setVizSelected}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      isDrilldownLoading={isDrilldownLoading}
    />
  );
}
