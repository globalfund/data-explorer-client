/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

interface Props {
  code: string;
  implementationPeriod: string;
}

export function GrantDetailInvestmentsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Grant Investments/Time cycle");
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
    (store) => store.GrantDetailDisbursementsTimeCycle.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.GrantDetailDisbursementsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailDisbursementsTimeCycle.loading
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod]);

  return (
    <InvestmentsTimeCycleModule
      data={data}
      isDrilldownLoading={false}
      drilldownData={[]}
      isLoading={isLoading}
      vizLevel={0}
      setVizLevel={setVizLevel}
      vizSelected={undefined}
      vizTranslation={{ x: 0, y: 0 }}
      setVizTranslation={setVizTranslation}
      setVizSelected={setVizSelected}
      vizPrevSelected={vizPrevSelected}
      setVizPrevSelected={setVizPrevSelected}
      vizPrevTranslation={vizPrevTranslation}
      setVizPrevTranslation={setVizPrevTranslation}
    />
  );
}
