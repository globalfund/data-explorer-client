/* eslint-disable import/no-cycle */
/* third-party */
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ResponsiveTreeMapHtml, TreeMapNodeDatum } from "@nivo/treemap";
/* project */
import { isTouchDevice } from "app/utils/isTouchDevice";
import {
  TooltipButton,
  XsContainer,
} from "app/components/Charts/common/styles";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { DisbursementsTreemapProps } from "app/components/Charts/Investments/Disbursements/data";
import { NoDataTreemap } from "app/components/Charts/Investments/Disbursements/components/nodata";
import { TreemapTooltip } from "app/components/Charts/Investments/Disbursements/components/tooltip";
import { TreeemapNode } from "app/components/Charts/Investments/Disbursements/components/treemapnode";

export function DisbursementsTreemap(props: DisbursementsTreemapProps) {
  const matches = useMediaQuery("(max-width: 767px)");
  const [
    xsTooltipData,
    setXsTooltipData,
  ] = React.useState<TreeMapNodeDatum | null>(null);

  function closeXsTooltip() {
    if (props.isChildTreemap && props.setXsTooltipData) {
      props.setXsTooltipData(null);
    } else if (!props.isChildTreemap) {
      setXsTooltipData(null);
    }
  }

  const actualXsTooltipData = props.isChildTreemap
    ? props.xsTooltipData
    : xsTooltipData;
  const actualSetXsTooltipData = props.isChildTreemap
    ? props.setXsTooltipData
    : setXsTooltipData;

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
                xsTooltipData={actualXsTooltipData}
                selectedNodeId={props.selectedNodeId}
                isChildTreemap={props.isChildTreemap}
                setXsTooltipData={actualSetXsTooltipData}
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
                  display: matches || isTouchDevice() ? "none" : "inherit",
                },
              },
            }}
          />
        )}
      </div>
      {(matches || isTouchDevice()) &&
        actualXsTooltipData &&
        !props.selectedNodeId &&
        !props.isChildTreemap && (
          <XsContainer>
            <ClickAwayListener onClickAway={closeXsTooltip}>
              <div
                css={`
                  padding: 16px 25px;
                  position: relative;
                  background: #f5f5f7;
                  border-radius: 20px;

                  > div {
                    background: #f5f5f7 !important;
                  }
                `}
              >
                <IconButton
                  css={`
                    top: 1px;
                    right: 10px;
                    position: absolute;
                  `}
                  onTouchStart={closeXsTooltip}
                >
                  <CloseIcon color="primary" />
                </IconButton>
                <TreemapTooltip node={actualXsTooltipData} />
                {!actualXsTooltipData.data._children && (
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
                      onTouchStart={() => {
                        props.onNodeClick(
                          `${
                            actualXsTooltipData.data.code ||
                            actualXsTooltipData.id
                          }-${actualXsTooltipData.data.tooltip.header}`,
                          actualXsTooltipData.x +
                            (props.parentNodeCoords
                              ? props.parentNodeCoords.x
                              : 0),
                          actualXsTooltipData.y +
                            (props.parentNodeCoords
                              ? props.parentNodeCoords.y
                              : 0),
                          actualXsTooltipData.data.code
                        );
                      }}
                    >
                      Drilldown
                    </TooltipButton>
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </XsContainer>
        )}
    </React.Fragment>
  );
}
