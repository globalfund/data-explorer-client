/* third-party */
import React from "react";
import find from "lodash/find";
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
  // setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  vizPrevSelected: string | undefined;
  // setVizPrevSelected: (vizPrevSelected: string | undefined) => void;
  drilldownPanelOptions: string[];
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
}

export function BudgetsTimeCycleModule(props: BudgetsTimeCycleModuleProps) {
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
          <DisbursementsTreemap
            data={mockdata2}
            selectedNodeId={props.vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={props.vizLevel}
        selected={props.vizSelected}
        loading={props.isDrilldownLoading}
        close={() => {
          props.setVizLevel(props.vizLevel - 1);
          props.setVizSelected(undefined);
          props.setVizSelected(
            props.vizLevel === 1 ? undefined : props.vizPrevSelected
          );
          props.setVizTranslation(
            props.vizLevel === 1 ? { x: 0, y: 0 } : props.vizPrevTranslation
          );
        }}
      >
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
            // setVizLevel(2);
            // setVizPrevSelected(vizSelected);
            // setVizSelected(node);
            // setVizPrevTranslation(vizTranslation);
            // setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      </SlideInContainer>
    </div>
  );
}
