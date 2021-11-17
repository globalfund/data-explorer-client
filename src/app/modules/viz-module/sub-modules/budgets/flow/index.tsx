/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useUnmount } from "react-use";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { Dropdown } from "app/components/Dropdown";
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { TransitionContainer } from "app/components/TransitionContainer";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";

interface BudgetsFlowModuleProps {
  nodes: {
    id: string;
    filterStr: string;
  }[];
  links: {
    value: number;
    source: string;
    target: string;
  }[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizTranslation: { x: number; y: number };
  setVizTranslation: (obj: { x: number; y: number }) => void;
  vizSelected: { id: string | undefined; filterStr: string | undefined };
  setVizSelected: (vizSelected: {
    id: string | undefined;
    filterStr: string | undefined;
  }) => void;
  vizCompData: any;
  setVizCompData: (comps: any) => void;
  vizPrevTranslation: { x: number; y: number };
  // setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
  dataDrilldownLevel2: BudgetsTreemapDataItem[];
  setDrilldownVizSelected: (obj: {
    id: string | undefined;
    filterStr: string | undefined;
  }) => void;
  drilldownPanelOptions: {
    name: string;
    items: string[];
  }[];
  setVizPrevSelected: (vizPrevSelected: string | undefined) => void;
  setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  vizPrevSelected: string | undefined;
  drilldownVizSelected: string | undefined;
  toolboxOpen?: boolean;
}

export function BudgetsFlowModule(props: BudgetsFlowModuleProps) {
  const history = useHistory();
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );
  const [
    xsTooltipData,
    setXsTooltipData,
  ] = React.useState<TreeMapNodeDatum | null>(null);

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([{ name: "Dataset" }]);
    }
    if (props.vizLevel > 0 && props.vizSelected && props.vizSelected.id) {
      const newDrilldowns = [
        { name: "Dataset" },
        { name: props.vizSelected.id },
      ];
      if (props.vizLevel === 2 && props.drilldownVizSelected) {
        const idSplits = props.drilldownVizSelected.split("-");
        newDrilldowns.push(
          {
            name: idSplits[1],
          },
          {
            name: idSplits[0],
          }
        );
      }
      setVizDrilldowns(newDrilldowns);
    }
  }, [props.vizLevel, props.vizSelected, props.drilldownVizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      css={`
        width: 100%;

        ${!props.vizSelected
          ? `* {
        overflow: visible !important;
      }`
          : ""}

        ${props.links.length === 0
          ? `
            > div {
              > div {
                > div {
                  > div {
                    justify-content: center;
                    display: flex !important;
                  }
                }
              }
            }
          `
          : ""}
      `}
    >
      <TransitionContainer vizScale={1} vizTranslation={props.vizTranslation}>
        {(props.vizLevel === 0 || props.vizLevel === 1) && (
          <BudgetsFlow
            data={{
              nodes: props.nodes,
              links: props.links,
            }}
            selectedNodeId={props.vizSelected.id}
            onNodeClick={(
              node: { id: string; filterStr: string },
              x: number,
              y: number
            ) => {
              props.setVizLevel(1);
              props.setVizSelected(node);
              props.setVizTranslation({ x: x * -1, y: 0 });
            }}
            vizCompData={props.vizCompData}
            setVizCompData={props.setVizCompData}
          />
        )}
        {props.vizLevel === 2 && (
          <BudgetsTreemap
            tooltipValueLabel="Budget"
            data={props.dataDrilldownLevel1}
            onNodeClick={(node: string, x: number, y: number) => {
              props.setVizLevel(2);
              props.setVizPrevSelected(props.vizSelected.id);
              props.setDrilldownVizSelected({ id: node, filterStr: undefined });
              props.setVizPrevTranslation(props.vizTranslation);
              props.setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={props.vizLevel}
        selected={props.vizSelected.id}
        toolboxOpen={props.toolboxOpen}
        loading={props.isDrilldownLoading}
        close={() => {
          props.setVizLevel(props.vizLevel - 1);
          props.setVizTranslation({ x: 0, y: 0 });
          if (props.vizLevel - 1 === 0) {
            props.setVizSelected({ id: undefined, filterStr: undefined });
          }
          if (props.vizLevel - 1 === 0) {
            props.setDrilldownVizSelected({
              id: undefined,
              filterStr: undefined,
            });
          }
          props.setVizTranslation(
            props.vizLevel === 1 ? { x: 0, y: 0 } : props.vizPrevTranslation
          );
        }}
      >
        {props.vizLevel === 1 && (
          <React.Fragment>
            <span
              css={`
                gap: 40px;
                width: 100%;
                display: flex;
                margin-bottom: 20px;
                flex-direction: row;
              `}
            >
              <DrillDownArrowSelector
                options={props.drilldownPanelOptions.map(
                  (option: { name: string; items: string[] }) => option.name
                )}
                selected={get(
                  find(
                    props.drilldownPanelOptions,
                    (option: { name: string; items: string[] }) =>
                      option.items.indexOf(props.vizSelected.id as string) > -1
                  ),
                  "name",
                  ""
                )}
                onChange={(value: string) => {
                  const firstOfLevel = get(
                    find(props.drilldownPanelOptions, { name: value }),
                    "items[0]",
                    null
                  );
                  if (firstOfLevel) {
                    const fNode = find(props.nodes, { id: firstOfLevel }) as {
                      id: string;
                      filterStr: string;
                    };
                    if (fNode) {
                      props.setVizSelected(fNode);
                      const fVizNodeComp = find(props.vizCompData, {
                        id: firstOfLevel,
                      }) as any;
                      if (fVizNodeComp) {
                        props.setVizTranslation({
                          x: (fVizNodeComp.x - 200) * -1,
                          y: 0,
                        });
                      }
                    }
                  }
                }}
              />
              <Dropdown
                options={get(
                  find(
                    props.drilldownPanelOptions,
                    (option: { name: string; items: string[] }) =>
                      option.items.indexOf(props.vizSelected.id as string) > -1
                  ),
                  "items",
                  []
                )}
                value={props.vizSelected.id as string}
                handleChange={(value: string) => {
                  const fNode = find(props.nodes, { id: value }) as {
                    id: string;
                    filterStr: string;
                  };
                  if (fNode) {
                    props.setVizSelected(fNode);
                    const fVizNodeComp = find(props.vizCompData, {
                      id: value,
                    }) as any;
                    if (fVizNodeComp) {
                      props.setVizTranslation({
                        x: (fVizNodeComp.x - 200) * -1,
                        y: 0,
                      });
                    }
                  }
                }}
              />
            </span>
            <BudgetsTreemap
              isDrilldownTreemap
              tooltipValueLabel="Budget"
              xsTooltipData={xsTooltipData}
              data={props.dataDrilldownLevel1}
              setXsTooltipData={setXsTooltipData}
              onNodeClick={(node: string, x: number, y: number) => {
                props.setVizLevel(2);
                props.setVizPrevSelected(props.vizSelected.id);
                props.setDrilldownVizSelected({
                  id: node,
                  filterStr: undefined,
                });
                props.setVizPrevTranslation(props.vizTranslation);
                props.setVizTranslation({ x: x * -1, y: 0 });
              }}
            />
          </React.Fragment>
        )}
        {props.vizLevel === 2 && (
          <BudgetsTreemap
            isDrilldownTreemap
            tooltipKeyLabel="Grant"
            tooltipValueLabel="Budget"
            data={props.dataDrilldownLevel2}
            selectedNodeId={props.vizSelected.id}
            onNodeClick={(node: string, x: number, y: number) => {
              if (props.drilldownVizSelected) {
                const idSplits = props.drilldownVizSelected.split("-");
                let code = node.replace(idSplits[0], "");
                code = code.slice(0, code.length - 1);
                history.push(`/grant/${code}`);
              }
            }}
          />
        )}
      </SlideInContainer>
    </div>
  );
}
