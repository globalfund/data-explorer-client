import React from "react";
import { css } from "styled-components/macro";

export const styles = {
  spacer: css`
    width: 10px;
    height: 100%;
  `,
  activeNode: css`
    z-index: 2;
    cursor: pointer;
  `,
  nodeStyle: css`
    cursor: pointer;
    &:hover {
      stroke: #13183f;
      strokewidth: 3px;
    }
  `,
};

function getInnerNodes(
  node: any,
  _selectedNode: any,
  onNodeClick: any,
  setXsTooltipData: any
) {
  const totHeight = node.y1 - node.y0;
  let prevY = node.y;
  const selectedNode = _selectedNode === node.id;
  const nodes = node.components.map((item: any) => {
    const height = (item.height * totHeight) / 100;
    const localPrevY = prevY;
    prevY += height;
    return (
      <rect
        x={node.x}
        y={localPrevY}
        height={height}
        strokeWidth={1}
        stroke="#252C34"
        fill={item.color}
        width={node.width}
        css={_selectedNode && !selectedNode ? "opacity: 0.3;" : ""}
        key={Math.random().toString(36).substring(7)}
      />
    );
  });
  if (node.id !== "") {
    nodes.push(
      <rect
        x={node.x}
        y={node.y}
        height={node.height}
        fill="transparent"
        width={node.width}
        onClick={() => {
          onNodeClick(
            { id: node.id.toString(), filterStr: node.filterStr.toString() },
            node.x - 200,
            node.y
          );
        }}
        onTouchStart={() => {
          // onNodeClick(
          //   { id: node.id.toString(), filterStr: node.filterStr.toString() },
          //   node.x - 200,
          //   node.y
          // );
          setXsTooltipData({
            value: node.value,
            id: node.id.toString(),
            components: node.components,
            filterStr: node.filterStr.toString(),
          });
        }}
        css={_selectedNode && selectedNode ? "" : styles.nodeStyle}
        key={Math.random().toString(36).substring(7)}
        data-cy="bf-sankey-bar-comp"
      />
    );
  }
  return nodes;
}

export function getNodes(
  nodes: any,
  selectedNode: any,
  onNodeClick: any,
  setXsTooltipData: any
) {
  let resultNodes: any = [];

  nodes.forEach((node: any) => {
    resultNodes = [
      ...resultNodes,
      ...getInnerNodes(node, selectedNode, onNodeClick, setXsTooltipData),
    ];
  });

  return resultNodes;
}
