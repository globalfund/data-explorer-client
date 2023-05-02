/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { DisbursementsTreemap } from "../..";
import { isTouchDevice } from "app/utils/isTouchDevice";

const containercss = (
  hover: boolean,
  selected: boolean,
  bgcolor: string,
  isChildTreemap: boolean
) => css`
  display: flex;
  color: #231d2c;
  font-size: 12px;
  position: absolute;
  box-sizing: border-box;
  flex-direction: column;
  background: ${bgcolor};
  align-items: flex-start;
  border: 1px solid #231d2c;
  transition: background 0.2s ease-in-out;
  overflow: ${!hover ? "visible" : "hidden"};
  cursor: ${isChildTreemap ? "pointer" : "default"};

  > div {
    width: 100%;
    padding: 10px;
  }

  @media (max-width: 767px) {
    color: #fff;
    font-size: 10px;
    background: #595c70;
  }
`;

export function TreeemapNode(props: any) {
  const { node } = props;
  const bigDevice = useMediaQuery("(min-width: 768px)");
  const hasChildren = node.data._children && node.data._children.length > 0;

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
      }}
      css={containercss(
        !hasChildren,
        props.selectedNodeId ===
          `${node.data.code || node.id}-${node.data.tooltip.header}`,
        node.data.color,
        props.isChildTreemap
      )}
      onMouseMove={!hasChildren ? node.onMouseMove : undefined}
      onMouseEnter={!hasChildren ? node.onMouseEnter : undefined}
      onMouseLeave={!hasChildren ? node.onMouseLeave : undefined}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice()) {
          e.stopPropagation();
          props.setXsTooltipData(node);
        } else if (props.isChildTreemap) {
          props.onNodeClick(
            `${node.data.code || node.id}-${node.data.tooltip.header}`,
            node.x + props.parentNodeCoords.x,
            node.y + props.parentNodeCoords.y,
            node.data.code
          );
        }
      }}
      //   onKeyPress={node.onClick}
      //   onFocus={node.onMouseEnter}
    >
      {(node.width > 80 || node.height > 80 || hasChildren) && (
        <div
          onMouseMove={hasChildren ? node.onMouseMove : undefined}
          onMouseEnter={hasChildren ? node.onMouseEnter : undefined}
          onMouseLeave={hasChildren ? node.onMouseLeave : undefined}
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
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family: "GothamNarrow-${hasChildren || node.data._children
                  ? "Bold"
                  : "Book"}",
                "Helvetica Neue", sans-serif;
              font-weight: ${hasChildren || node.data._children
                ? "bold"
                : "normal"};
            `}
          >
            {node.data.name}
          </div>
          {bigDevice && <div css="width: 100%;height: 5px;" />}
          <div
            ref={(el) => {
              if (el) {
                el.style.setProperty("overflow", "hidden", "important");
              }
            }}
            css={`
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            {formatFinancialValue(get(node, "data.value", 0))}
          </div>
        </div>
      )}
      {hasChildren && bigDevice && (
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
          <DisbursementsTreemap
            isChildTreemap
            data={node.data._children}
            onNodeClick={props.onNodeClick}
            selectedNodeId={props.selectedNodeId}
            parentNodeCoords={{ x: node.x, y: node.y }}
            setXsTooltipData={props.setXsTooltipData}
            xsTooltipData={props.xsTooltipData}
          />
        </div>
      )}
    </div>
  );
}
