/* eslint-disable import/no-cycle */
/* third-party */
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ResponsiveTreeMapHtml, TreeMapNodeDatum } from "@nivo/treemap";
/* project */
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { DisbursementsTreemapProps } from "app/components/Charts/Investments/Disbursements/data";
import { NoDataTreemap } from "app/components/Charts/Investments/Disbursements/components/nodata";
import { TreemapTooltip } from "app/components/Charts/Investments/Disbursements/components/tooltip";
import { TreeemapNode } from "app/components/Charts/Investments/Disbursements/components/treemapnode";

export function DisbursementsTreemap(props: DisbursementsTreemapProps) {
  const matches = useMediaQuery("(max-width: 767px)");

  return (
    <div
      css={`
        width: 100%;
        height: 600px;
        overflow: hidden;

        ${!props.isChildTreemap
          ? `
        > div {
          > div {
            > div:first-of-type {
              background: #373d43;
            }
          }
        }
        `
          : ""}
      `}
      data-cy="investments-disbursements-treemap"
    >
      {props.data.length === 0 ? (
        <React.Fragment>
          <NoDataTreemap />
          <NoDataLabel height="600px" />
        </React.Fragment>
      ) : (
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
          innerPadding={props.isChildTreemap ? 2 : 1}
          outerPadding={props.isChildTreemap ? 0 : 1}
          // @ts-ignore
          nodeComponent={(nodeProps: TreeMapNodeDatum) => (
            <TreeemapNode
              {...nodeProps}
              onNodeClick={props.onNodeClick}
              selectedNodeId={props.selectedNodeId}
              isChildTreemap={props.isChildTreemap}
              parentNodeCoords={props.parentNodeCoords}
            />
          )}
          // @ts-ignore
          tooltip={TreemapTooltip}
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
      )}
    </div>
  );
}
