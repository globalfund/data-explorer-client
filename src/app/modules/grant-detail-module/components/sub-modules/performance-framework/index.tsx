/* third-party */
import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { InputNode, InputLink } from "@nivo/network";
import { useTitle, useUnmount, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { NetworkViz } from "app/components/Charts/Network";
import { PageLoader } from "app/modules/common/page-loader";
import { PerformanceFrameworkExpandedView } from "app/components/PerformanceFrameworkExpandedView";
import {
  PFIndicator,
  PFIndicatorResultIntervention,
} from "app/components/PerformanceFrameworkExpandedView/data";

interface Props {
  code: string;
  toolboxOpen?: boolean;
  implementationPeriod: string;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function PerformanceFrameworkModule(props: Props) {
  useTitle("The Data Explorer - Grant Targets and Results");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.GrantDetailPerformanceFramework.fetch
  );
  const nodes = useStoreState(
    (state) =>
      get(
        state.GrantDetailPerformanceFramework.data,
        "data.nodes",
        []
      ) as InputNode[]
  );
  const links = useStoreState(
    (state) =>
      get(
        state.GrantDetailPerformanceFramework.data,
        "data.links",
        []
      ) as InputLink[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailPerformanceFramework.loading
  );
  const fetchExpandData = useStoreActions(
    (store) => store.GrantDetailPerformanceFrameworkExpand.fetch
  );
  const clearExpandData = useStoreActions(
    (store) => store.GrantDetailPerformanceFrameworkExpand.clear
  );
  const expandIndicators = useStoreState(
    (state) =>
      get(
        state.GrantDetailPerformanceFrameworkExpand.data,
        "indicators",
        []
      ) as PFIndicator[]
  );
  const expandInterventions = useStoreState(
    (state) =>
      get(
        state.GrantDetailPerformanceFrameworkExpand.data,
        "interventions",
        []
      ) as PFIndicatorResultIntervention[]
  );
  const isExpandLoading = useStoreState(
    (state) => state.GrantDetailPerformanceFrameworkExpand.loading
  );
  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelPFPeriodState.value
  );
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId=${props.code}&IPnumber=${props.implementationPeriod}&timeframeIndex=${selectedPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod, selectedPeriod]);

  useUpdateEffect(() => {
    if (vizSelected) {
      fetchExpandData({
        filterString: `grantId=${props.code}&IPnumber=${
          props.implementationPeriod
        }&indicatorSet=${vizSelected.split("|")[1]}&moduleName=${
          vizSelected.split("|")[0]
        }`,
      });
    } else {
      clearExpandData();
    }
  }, [vizSelected]);

  React.useEffect(() => {
    if (vizLevel === 0) {
      setVizDrilldowns([{ name: "Targets and Results-network" }]);
    }
    if (vizLevel === 1 && vizSelected) {
      setVizDrilldowns([
        { name: "Targets and Results-network" },
        { name: vizSelected },
      ]);
    }
  }, [vizLevel, vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  let vizComponent = <React.Fragment />;

  if (isLoading || isExpandLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (vizLevel === 0) {
      vizComponent = (
        <NetworkViz
          data={{ nodes, links }}
          onNodeClick={(node: string) => {
            setVizLevel(1);
            setVizSelected(node);
          }}
        />
      );
    } else if (vizLevel === 1) {
      vizComponent = (
        <PerformanceFrameworkExpandedView
          indicators={expandIndicators}
          setSelectedModule={setVizSelected}
          interventions={expandInterventions}
          selectedModule={vizSelected?.split("|")[0]}
          allModules={filter(nodes, { depth: 2 }).map((node: InputNode) => ({
            module: node.id.split("|")[0],
            filterValue: node.id,
          }))}
        />
      );
    }
  }

  return (
    <div
      css={`
        width: 100%;

        * {
          overflow: visible !important;
        }
      `}
    >
      {vizComponent}
    </div>
  );
}
