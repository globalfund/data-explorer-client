/* third-party */
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ResponsiveTreeMapHtml, TreeMapNodeDatum } from "@nivo/treemap";
/* project */
import { BudgetsTreemapProps } from "app/components/Charts/Budgets/Treemap/data";
import { TreemapTooltip } from "app/components/Charts/Budgets/Treemap/components/tooltip";
import { TreeemapNode } from "app/components/Charts/Budgets/Treemap/components/treemapnode";

export function BudgetsTreemap(props: BudgetsTreemapProps) {
  const matches = useMediaQuery("(max-width: 767px)");

  return (
    <div
      css={`
        width: 100%;
        height: 600px;
      `}
      data-cy="budgets-drilldown-treemap"
    >
      <ResponsiveTreeMapHtml
        value="value"
        tile="binary"
        identity="name"
        data={{
          name: "",
          color: "",
          children: props.data,
        }}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        leavesOnly
        labelSkipSize={12}
        innerPadding={props.isChildTreemap ? 2 : 0}
        // @ts-ignore
        nodeComponent={(nodeProps: TreeMapNodeDatum) => (
          <TreeemapNode
            {...nodeProps}
            onNodeClick={props.onNodeClick}
            selectedNodeId={props.selectedNodeId}
            isChildTreemap={props.isChildTreemap}
            parentNodeCoords={props.parentNodeCoords}
            tooltipValueLabel={props.tooltipValueLabel}
          />
        )}
        // @ts-ignore
        tooltip={(tProps: any) => (
          <TreemapTooltip
            {...tProps}
            tooltipValueLabel={props.tooltipValueLabel}
          />
        )}
        colors={(node: any) => node.data.color}
        theme={{
          tooltip: {
            container: {
              zIndex: 100,
              borderRadius: 20,
              padding: "16px 25px",
              position: "relative",
              backgroundColor: "#f5f5f7",
              display: matches ? "none" : "inherit",
            },
          },
        }}
      />
    </div>
  );
}
