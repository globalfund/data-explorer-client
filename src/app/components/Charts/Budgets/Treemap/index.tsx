/* third-party */
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ResponsiveTreeMapHtml, TreeMapNodeDatum } from "@nivo/treemap";
/* project */
import { isTouchDevice } from "app/utils/isTouchDevice";
import {
  TooltipButton,
  XsContainer,
} from "app/components/Charts/common/styles";
import { BudgetsTreemapProps } from "app/components/Charts/Budgets/Treemap/data";
import { TreemapTooltip } from "app/components/Charts/Budgets/Treemap/components/tooltip";
import { TreeemapNode } from "app/components/Charts/Budgets/Treemap/components/treemapnode";

export function BudgetsTreemap(props: BudgetsTreemapProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <React.Fragment>
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

              @media (max-width: 767px) {
                background: #fff;
              }
            }
          }
        }
        `
            : ""}
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
          innerPadding={0}
          outerPadding={0}
          // @ts-ignore
          nodeComponent={(nodeProps: TreeMapNodeDatum) => {
            // @ts-ignore
            if (!nodeProps.node.data.value) {
              return <React.Fragment />;
            }
            return (
              <TreeemapNode
                {...nodeProps}
                onNodeClick={props.onNodeClick}
                invertColors={props.invertColors}
                xsTooltipData={props.xsTooltipData}
                selectedNodeId={props.selectedNodeId}
                isChildTreemap={props.isChildTreemap}
                tooltipKeyLabel={props.tooltipKeyLabel}
                setXsTooltipData={props.setXsTooltipData}
                parentNodeCoords={props.parentNodeCoords}
                tooltipValueLabel={props.tooltipValueLabel}
              />
            );
          }}
          // @ts-ignore
          tooltip={(tProps: any) => (
            <TreemapTooltip
              {...tProps}
              tooltipValueLabel={props.tooltipValueLabel}
              tooltipKeyLabel={
                props.isChildTreemap ? props.tooltipKeyLabel : undefined
              }
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
                display: isMobile ? "none" : "inherit",
              },
            },
          }}
        />
      </div>
      {(isMobile || isTouchDevice()) &&
        props.xsTooltipData &&
        !props.selectedNodeId &&
        !props.isChildTreemap && (
          <XsContainer id="mobile-tooltip-container">
            <div
              css={`
                width: 100%;

                ${props.setXsTooltipData
                  ? `
                height: 100%;
                display: flex;
                padding: 0 16px;
                flex-direction: column;
                justify-content: center;
              `
                  : ""}
              `}
            >
              <div
                css={`
                  padding: 16px;
                  background: #fff;
                  position: relative;
                  border-radius: 20px;
                  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);

                  > div {
                    background: #fff !important;
                  }
                `}
              >
                <IconButton
                  css={`
                    top: 1px;
                    right: 10px;
                    position: absolute;
                  `}
                  onClick={() =>
                    props.setXsTooltipData && props.setXsTooltipData(null)
                  }
                >
                  <CloseIcon color="primary" />
                </IconButton>
                <TreemapTooltip node={props.xsTooltipData} />
                {props.isDrilldownTreemap && (
                  <div
                    css={`
                      display: flex;
                      margin-top: 10px;
                      flex-direction: row;
                      justify-content: flex-end;
                    `}
                  >
                    <TooltipButton
                      type="button"
                      onClick={() => {
                        if (props.xsTooltipData) {
                          props.onNodeClick(
                            `${props.xsTooltipData.id}-${props.xsTooltipData.data.tooltip.header}`,
                            0,
                            0
                          );
                        }
                      }}
                    >
                      {props.setXsTooltipData ? "Drill down" : "Detail page"}
                    </TooltipButton>
                  </div>
                )}
              </div>
            </div>
          </XsContainer>
        )}
    </React.Fragment>
  );
}
