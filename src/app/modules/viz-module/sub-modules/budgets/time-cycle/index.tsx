/* third-party */
import React from "react";
import find from "lodash/find";
import { useUnmount } from "react-use";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { TransitionContainer } from "app/components/TransitionContainer";
import { BudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";

interface BudgetsTimeCycleModuleProps {
  data: Record<string, unknown>[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizTranslation: { x: number; y: number };
  setVizTranslation: (obj: { x: number; y: number }) => void;
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  vizCompData: any;
  setVizCompData: (comps: any) => void;
  vizPrevTranslation: { x: number; y: number };
  setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  vizPrevSelected: string | undefined;
  setVizPrevSelected: (vizPrevSelected: string | undefined) => void;
  drilldownPanelOptions: string[];
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
  dataDrilldownLevel2: BudgetsTreemapDataItem[];
  drilldownVizSelected: string | undefined;
  setDrilldownVizSelected: (drilldownVizSelected: string | undefined) => void;
  toolboxOpen?: boolean;
}

export function BudgetsTimeCycleModule(props: BudgetsTimeCycleModuleProps) {
  const history = useHistory();
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([]);
    }
    if (props.vizLevel > 0 && props.vizSelected && props.vizSelected) {
      const newDrilldowns = [{ name: "Dataset" }, { name: props.vizSelected }];
      if (props.vizLevel === 2 && props.drilldownVizSelected) {
        const idSplits = props.drilldownVizSelected.split("-");
        newDrilldowns.push(
          {
            name: idSplits[0],
          },
          {
            name: idSplits[1],
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
      id="budgets-time-cycle"
      css={`
        width: 100%;

        ${!props.vizSelected
          ? `* {
      overflow: visible !important;
    }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={1} vizTranslation={props.vizTranslation}>
        {(props.vizLevel === 0 || props.vizLevel === 1) && (
          <BudgetsTimeCycle
            data={props.data}
            vizCompData={props.vizCompData}
            selectedNodeId={props.vizSelected}
            setVizCompData={props.setVizCompData}
            onNodeClick={(node: string, x: number, y: number) => {
              props.setVizLevel(1);
              props.setVizSelected(node);
              props.setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        )}
        {props.vizLevel === 2 && (
          <BudgetsTreemap
            tooltipValueLabel="Budget"
            data={props.dataDrilldownLevel1}
            onNodeClick={(node: string, x: number, y: number) => {
              props.setVizLevel(2);
              props.setVizPrevSelected(props.vizSelected);
              props.setDrilldownVizSelected(node);
              props.setVizPrevTranslation(props.vizTranslation);
              props.setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={props.vizLevel}
        selected={props.vizSelected}
        toolboxOpen={props.toolboxOpen}
        loading={props.isDrilldownLoading}
        close={() => {
          if (props.vizLevel === 2) {
            props.setDrilldownVizSelected(undefined);
          }
          props.setVizSelected(
            props.vizLevel === 1 ? undefined : props.vizPrevSelected
          );
          props.setVizTranslation(
            props.vizLevel === 1 ? { x: 0, y: 0 } : props.vizPrevTranslation
          );
          props.setVizLevel(props.vizLevel - 1);
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
                options={props.drilldownPanelOptions}
                selected={props.vizSelected as string}
                onChange={(value: string) => {
                  props.setVizSelected(value);
                  const fVizNodeComp = find(
                    props.vizCompData,
                    (item: any) => item.data.indexValue === value
                  ) as any;
                  if (fVizNodeComp) {
                    props.setVizTranslation({
                      x: (fVizNodeComp.x - 100) * -1,
                      y: 0,
                    });
                  }
                }}
              />
            </span>
            <BudgetsTreemap
              tooltipValueLabel="Budget"
              data={props.dataDrilldownLevel1}
              onNodeClick={(node: string, x: number, y: number) => {
                props.setVizLevel(2);
                props.setVizPrevSelected(props.vizSelected);
                props.setDrilldownVizSelected(node);
                props.setVizPrevTranslation(props.vizTranslation);
                props.setVizTranslation({ x: x * -1, y: 0 });
              }}
            />
          </React.Fragment>
        )}
        {props.vizLevel === 2 && (
          <BudgetsTreemap
            tooltipValueLabel="Budget"
            data={props.dataDrilldownLevel2}
            selectedNodeId={props.vizSelected}
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
