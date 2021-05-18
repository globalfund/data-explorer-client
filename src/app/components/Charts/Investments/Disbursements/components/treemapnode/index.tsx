/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import useFitText from "use-fit-text";
import { css } from "styled-components/macro";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { DisbursementsTreemap } from "../..";

const containercss = (hover: boolean, selected: boolean) => css`
  display: flex;
  overflow: hidden;
  position: absolute;
  border-style: none;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;

  ${selected
    ? `
  background: repeating-linear-gradient(45deg, #FBAC1B 0 5px, #fff 5px 10px) !important;

  > div {
    background: rgba(255, 255, 255, 0.8);
  }
  `
    : ""}

  ${hover
    ? `&:hover {
        background: repeating-linear-gradient(45deg, #FBAC1B 0 5px, #fff 5px 10px) !important;

        > div {
          background: rgba(255, 255, 255, 0.8);
        }
    }`
    : ""}

  > div {
    width: 100%;
    padding: 10px;
  }
`;

export function TreeemapNode(props: any) {
  const { node } = props;
  const { fontSize, ref } = useFitText({ logLevel: "none" });
  const hasChildren = node.data._children && node.data._children.length > 0;

  return (
    <div
      tabIndex={0}
      role="button"
      id={node.id}
      aria-label={node.data.name}
      ref={ref}
      style={{
        fontSize: props.selectedNodeId ? 12 : fontSize,
        top: node.y,
        left: node.x,
        color: "#262C34",
        width: node.width,
        height: node.height,
        background: node.data.color,
        cursor: node.data.orgs ? "pointer" : "default",
      }}
      css={containercss(
        !hasChildren,
        props.selectedNodeId === `${node.id}-${node.data.tooltip.header}`
      )}
      onMouseMove={!hasChildren ? node.onMouseMove : undefined}
      onMouseEnter={!hasChildren ? node.onMouseEnter : undefined}
      onMouseLeave={!hasChildren ? node.onMouseLeave : undefined}
      onClick={() => {
        if (props.isChildTreemap) {
          props.onNodeClick(
            `${node.id}-${node.data.tooltip.header}`,
            node.x + props.parentNodeCoords.x,
            node.y + props.parentNodeCoords.y
          );
        }
      }}
      //   onKeyPress={node.onClick}
      //   onFocus={node.onMouseEnter}
    >
      {(node.width > 99 || node.height > 99) && (
        <div
          onMouseMove={hasChildren ? node.onMouseMove : undefined}
          onMouseEnter={hasChildren ? node.onMouseEnter : undefined}
          onMouseLeave={hasChildren ? node.onMouseLeave : undefined}
        >
          <div
            css={`
              font-weight: ${hasChildren || node.data._children
                ? "bold"
                : "normal"};
            `}
          >
            {node.data.name}
          </div>
          <div css="width: 100%;height: 5px;" />
          <div>{formatFinancialValue(node.data.value)}</div>
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
              height: 100%;
            }
          `}
        >
          <DisbursementsTreemap
            isChildTreemap
            data={node.data._children}
            onNodeClick={props.onNodeClick}
            selectedNodeId={props.selectedNodeId}
            parentNodeCoords={{ x: node.x, y: node.y }}
          />
        </div>
      )}
    </div>
  );
}
