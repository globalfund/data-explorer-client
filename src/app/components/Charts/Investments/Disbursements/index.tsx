/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
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
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { DisbursementsTreemapProps } from "app/components/Charts/Investments/Disbursements/data";
import { NoDataTreemap } from "app/components/Charts/Investments/Disbursements/components/nodata";
import { TreemapTooltip } from "app/components/Charts/Investments/Disbursements/components/tooltip";
import { TreeemapNode } from "app/components/Charts/Investments/Disbursements/components/treemapnode";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

export function DisbursementsTreemap(props: DisbursementsTreemapProps) {
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

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
          position: relative;

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
            innerPadding={0}
            outerPadding={0}
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
                  display: isMobile || isTouchDevice() ? "none" : "inherit",
                },
              },
            }}
          />
        )}
      </div>
      {(isMobile || isTouchDevice()) &&
        actualXsTooltipData &&
        !props.selectedNodeId &&
        !props.isChildTreemap && (
          <XsContainer id="mobile-tooltip-container">
            <div
              css={`
                width: 100%;

                ${props.isDrilldownTreemap
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
                  padding: 16px 25px;
                  position: relative;
                  background: #f4f4f4;
                  border-radius: 20px;

                  > div {
                    background: #f5f5f7 !important;
                  }

                  @media (max-width: 767px) {
                    padding: 16px;
                    background: #fff;
                    box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);

                    > div {
                      background: #fff !important;
                    }
                  }
                `}
              >
                <IconButton
                  css={`
                    top: 1px;
                    right: 10px;
                    position: absolute;
                  `}
                  onClick={closeXsTooltip}
                >
                  <CloseIcon color="primary" />
                </IconButton>
                <TreemapTooltip node={actualXsTooltipData} />
                {!props.isDrilldownTreemap && (
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
                      {get(
                        cmsData,
                        "componentsChartsInvestments.drilldown",
                        ""
                      )}
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
