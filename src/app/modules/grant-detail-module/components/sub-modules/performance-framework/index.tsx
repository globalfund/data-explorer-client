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
import { SlideInContainer } from "app/components/SlideInPanel";
import { TransitionContainer } from "app/components/TransitionContainer";
import { PerformanceFrameworkExpandedView } from "app/components/PerformanceFrameworkExpandedView";
import {
  PFIndicator,
  PFIndicatorResultIntervention,
} from "app/components/PerformanceFrameworkExpandedView/data";

interface Props {
  code: string;
  toolboxOpen?: boolean;
  implementationPeriod: string;
}

export function PerformanceFrameworkModule(props: Props) {
  useTitle("The Data Explorer - Grant Performance Framework");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
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
      setVizDrilldowns([{ name: "Dataset" }]);
    }
    if (vizLevel === 1 && vizSelected) {
      setVizDrilldowns([{ name: "Dataset" }, { name: vizSelected }]);
    }
  }, [vizLevel, vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
            overflow: visible !important;
          }`
          : ""}

        #zoom-in-level {
          > div {
            background-color: #f5f5f7;
          }
        }
      `}
    >
      <TransitionContainer
        vizScale={1}
        enableMobilePan
        vizTranslation={vizTranslation}
      >
        <NetworkViz
          data={{ nodes, links }}
          selectedNodeId={vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            setVizLevel(1);
            setVizSelected(node);
            setVizTranslation({ x: x * -1, y: y * -1 });
          }}
        />
      </TransitionContainer>
      <SlideInContainer
        bigHeader
        enableOverflow
        vizLevel={vizLevel}
        selected={vizSelected}
        loading={isExpandLoading}
        toolboxOpen={props.toolboxOpen}
        close={() => {
          setVizLevel(0);
          setVizSelected(undefined);
          setVizTranslation({ x: 0, y: 0 });
        }}
      >
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
      </SlideInContainer>
    </div>
  );
}
