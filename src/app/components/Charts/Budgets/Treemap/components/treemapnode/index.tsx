/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { css } from "styled-components/macro";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BudgetsTreemap } from "../..";
import { isTouchDevice } from "app/utils/isTouchDevice";

const containercss = (hover: boolean, selected: boolean) => css`
  display: flex;
  position: absolute;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #231d2c;
  transition: background 0.2s ease-in-out;
  overflow: ${!hover ? "visible" : "hidden"};

  > div {
    width: 100%;
    padding: 10px;
  }
`;

export function TreeemapNode(props: any) {
  const { node } = props;
  const bigDevice = useMediaQuery("(min-width: 768px)");
  const hasChildren = node.data._children && node.data._children.length > 0;

  let color = "#231d2c";
  if (props.isChildTreemap || (props.invertColors && !bigDevice)) {
    color = "#fff";
  }

  let extraProps = {};

  if (!hasChildren) {
    extraProps = {
      onMouseMove: node.onMouseMove,
      onMouseEnter: node.onMouseEnter,
      onMouseLeave: node.onMouseLeave,
    };
  }

  return (
    <div
      tabIndex={0}
      role="button"
      id={node.id}
      aria-label={node.data.name}
      style={{
        top: node.y,
        left: node.x,
        width: node.width,
        height: node.height,
        fontSize: bigDevice ? 12 : 10,
        border: `0px ${props.isChildTreemap ? "none" : "solid"} #${
          bigDevice || !props.invertColors ? "373D43" : "fff"
        }`,
        cursor: props.isChildTreemap ? "pointer" : "default",
        color,
        background:
          bigDevice || !props.invertColors ? node.data.color : "#595C70",
      }}
      css={containercss(
        !hasChildren,
        props.selectedNodeId === `${node.id}-${node.data.tooltip.header}`
      )}
      {...extraProps}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice() && props.setXsTooltipData) {
          e.stopPropagation();
          props.setXsTooltipData(node);
        } else if (
          props.isChildTreemap &&
          (!props.setXsTooltipData || bigDevice)
        ) {
          props.onNodeClick(
            `${node.id}-${node.data.tooltip.header}`,
            node.x + props.parentNodeCoords.x,
            node.y + props.parentNodeCoords.y
          );
        }
      }}
    >
      {((node.width > 60 && node.height > 60) || hasChildren) && (
        <div
          {...extraProps}
          ref={(el) => {
            if (el) {
              el.style.setProperty("overflow", "hidden", "important");
            }
          }}
        >
          <div
            ref={(el) => {
              if (el) {
                el.style.setProperty("overflow", "hidden", "important");
              }
            }}
            css={`
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-weight: ${hasChildren || node.data._children
                ? "bold"
                : "normal"};
            `}
          >
            {node.data.name}
          </div>
          <div css="width: 100%;height: 5px;" />
          <div
            css={`
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            {formatFinancialValue(node.data.value)}
          </div>
        </div>
      )}
      {hasChildren && (
        <div
          css={`
            height: 100%;
            display: flex;
            padding: 10px;
            width: calc(100% - 10px);

            > div {
              height: calc(100% - 20px);
              overflow: visible !important;
            }
          `}
        >
          <BudgetsTreemap
            isChildTreemap
            data={node.data._children}
            onNodeClick={props.onNodeClick}
            selectedNodeId={props.selectedNodeId}
            tooltipKeyLabel={props.tooltipKeyLabel}
            tooltipValueLabel={props.tooltipValueLabel}
            parentNodeCoords={{ x: node.x, y: node.y }}
            setXsTooltipData={props.setXsTooltipData}
            xsTooltipData={props.xsTooltipData}
          />
        </div>
      )}
    </div>
  );
}
