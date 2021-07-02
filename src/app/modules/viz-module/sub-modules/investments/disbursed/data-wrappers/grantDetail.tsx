/* third-party */
import React from "react";
import get from "lodash/get";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code: string;
  implementationPeriod: string;
}

export function GrantDetailInvestmentsDisbursedWrapper(props: Props) {
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.GrantDetailDisbursementsTreemap.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.GrantDetailDisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailDisbursementsTreemap.loading
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod]);

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <InvestmentsDisbursedModule
      data={data}
      drilldownData={[]}
      vizLevel={0}
      isLoading={isLoading}
      vizSelected={undefined}
      setVizLevel={setVizLevel}
      isDrilldownLoading={false}
      vizTranslation={{ x: 0, y: 0 }}
      setVizSelected={setVizSelected}
      setVizTranslation={setVizTranslation}
    />
  );
}
