/* third-party */
import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

interface Props {
  code?: string;
}

export function GenericInvestmentsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Investments/Time cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizPrevTranslation, setVizPrevTranslation] = React.useState({
    x: 0,
    y: 0,
  });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [vizPrevSelected, setVizPrevSelected] = React.useState<
    string | undefined
  >(undefined);

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.DisbursementsTimeCycle.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.DisbursementsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.DisbursementsTimeCycle.loading
  );
  const fetchDrilldownData = useStoreActions(
    (store) => store.DisbursementsTimeCycleDrilldown.fetch
  );
  const drilldownData = useStoreState(
    (state) =>
      get(
        state.DisbursementsTimeCycleDrilldown.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.DisbursementsTimeCycleDrilldown.loading
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
      const params = props.code
        ? {
            filterString: `locations=${props.code}`,
          }
        : {};
      if (params.filterString) {
        params.filterString += `&barPeriod=${vizSelected}`;
      } else {
        params.filterString = `barPeriod=${vizSelected}`;
      }
      fetchDrilldownData(params);
    }
  }, [vizSelected]);

  return (
    <InvestmentsTimeCycleModule
      data={data}
      isDrilldownLoading={isDrilldownLoading}
      drilldownData={drilldownData}
      isLoading={isLoading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      vizPrevSelected={vizPrevSelected}
      setVizPrevSelected={setVizPrevSelected}
      vizPrevTranslation={vizPrevTranslation}
      setVizPrevTranslation={setVizPrevTranslation}
    />
  );
}
