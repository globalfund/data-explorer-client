/* third-party */
import React from "react";
import { ResponsiveTreeMapHtml } from "@nivo/treemap";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import { DisbursementsTreemapProps } from "app/components/Charts/Investments/Disbursements/data";
import { TreemapTooltip } from "app/components/Charts/Investments/Disbursements/components/tooltip";
import { TreeemapNode } from "app/components/Charts/Investments/Disbursements/components/treemapnode";

export function DisbursementsTreemap(props: DisbursementsTreemapProps) {
  const matches = useMediaQuery("(max-width: 767px)");

  return (
    <div
      css={`
        width: 100%;
        height: 600px;
      `}
      data-cy="investments-disbursements-treemap"
    >
      <ResponsiveTreeMapHtml
        value="value"
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
        innerPadding={2}
        labelSkipSize={12}
        // @ts-ignore
        nodeComponent={TreeemapNode}
        // @ts-ignore
        tooltip={TreemapTooltip}
        colors={(node: any) => node.data.color}
        theme={{
          tooltip: {
            container: {
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
