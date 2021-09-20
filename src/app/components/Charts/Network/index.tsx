import React from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { ResponsiveNetwork } from "@nivo/network";
import { mockdata, NetworkVizProps } from "app/components/Charts/Network/data";
import { NoDataLabel } from "../common/nodatalabel";

export function NetworkViz(props: NetworkVizProps) {
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const viz = document.getElementById("performance-framework-network");
  //     if (viz) {
  //       const svgs = viz.getElementsByTagName("svg");
  //       if (svgs.length > 0) {
  //         const pathElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "path"
  //         );
  //         pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
  //         pathElement.setAttribute("stroke", "#262c34");
  //         pathElement.setAttribute("strokeWidth", "0.5");

  //         const patternElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "pattern"
  //         );
  //         patternElement.setAttribute("id", "diagonalHatch");
  //         patternElement.setAttribute("patternUnits", "userSpaceOnUse");
  //         patternElement.setAttribute("width", "4");
  //         patternElement.setAttribute("height", "4");
  //         patternElement.appendChild(pathElement);

  //         const defsElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "defs"
  //         );
  //         defsElement.appendChild(patternElement);

  //         svgs[0].appendChild(defsElement);
  //       }
  //     }
  //   }, 100);
  // }, []);

  const Nodes = (nodesData: any) => {
    return nodesData.nodes.map((node: any) => {
      const id = node.id.split("|")[0];
      const tSpans = id.split(" ").length > 2 ? id.split(" ") : [id];
      const circlecomp = (
        <circle
          r={node.radius}
          strokeWidth="1"
          fill={node.color}
          stroke={node.borderColor}
          transform={`translate(${node.x}, ${node.y}) scale(1)`}
          // css={
          //   node.color === "#E2E2E2"
          //     ? `fill: url(#diagonalHatch);`
          //     : `fill: ${node.color};`
          // }
        />
      );
      return (
        <g
          key={node.id}
          css={
            node.depth === 2
              ? `
            cursor: pointer;
            ${
              props.selectedNodeId && props.selectedNodeId === node.id
                ? `> circle {
              stroke-width: 2px;
            }
            > text {
              font-weight: bold;
            }`
                : ""
            }
            &:hover {
              > circle {
                stroke-width: 2px;
              }
              > text {
                font-weight: bold;
              }
            }
          `
              : ""
          }
          onClick={() => {
            if (node.depth === 2) {
              props.onNodeClick(node.id, node.x, 0);
            }
          }}
        >
          {(node.depth === 1 || node.depth === 2) && (
            <text
              transform={`translate(${node.x + 20}, ${node.y - 10})`}
              css={`
                font-size: ${node.depth === 2 ? 10 : 12}px;
                font-weight: ${node.depth === 2 ? "normal" : "bold"};
                text-decoration: ${node.depth === 2 ? "underline" : "none"};
              `}
            >
              {node.depth === 2
                ? tSpans.map((text: string, index: number) => (
                    <tspan key={text} x={0} y={index * 10}>
                      {text}
                    </tspan>
                  ))
                : node.id}
            </text>
          )}
          {node.depth === 0 && (
            <text
              transform={`translate(${node.x + 20}, ${node.y})`}
              css={`
                font-size: ${node.depth === 2 ? 10 : 12}px;
                font-weight: ${node.depth === 2 ? "normal" : "bold"};
                text-decoration: ${node.depth === 2 ? "underline" : "none"};
              `}
            >
              {node.id.split(" - ").map((text: string, index: number) => (
                <tspan key={text} x={0} y={index * 15}>
                  {text}
                </tspan>
              ))}
            </text>
          )}
          {node.depth === 3 ? (
            <Tooltip placement="left" title={id}>
              {circlecomp}
            </Tooltip>
          ) : (
            circlecomp
          )}
        </g>
      );
    });
  };
  const Links = (linksData: any) => {
    return linksData.links.map((link: any) => (
      <line
        key={`${link.source.id}-${link.target.id}`}
        strokeWidth="1"
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
        strokeLinecap="round"
        stroke={
          props.selectedNodeId && props.selectedNodeId === link.source.id
            ? "#495057"
            : "#DFE3E6"
        }
      />
    ));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={3}>
        <div
          css={`
            color: #262c34;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
          `}
        >
          Achievement Rate
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 40px;

            > span {
              height: 6px;
              position: relative;
              width: calc(100% / 8);
              border: 0.5px solid #262c34;
              border-style: solid none solid solid;

              &:before {
                left: -4px;
                bottom: -25px;
                color: #495057;
                font-size: 10px;
                position: absolute;
              }

              &:nth-of-type(1) {
                border-radius: 20px 0 0 20px;
              }
              &:nth-of-type(8) {
                border-style: solid;
                border-radius: 0 20px 20px 0;

                &:after {
                  right: -8px;
                  bottom: -25px;
                  color: #495057;
                  font-size: 10px;
                  position: absolute;
                }
              }
            }
          `}
        >
          <span
            css={`
              background: #fa7355;
              &:before {
                content: "0";
              }
            `}
          />
          <span
            css={`
              background: #fa9a55;
              &:before {
                content: "0.2";
              }
            `}
          />
          <span
            css={`
              background: #ffaa46;
              &:before {
                content: "0.4";
              }
            `}
          />
          <span
            css={`
              background: #ffd646;
              &:before {
                content: "0.6";
              }
            `}
          />
          <span
            css={`
              background: #daff46;
              &:before {
                content: "0.8";
              }
            `}
          />
          <span
            css={`
              background: #97ff46;
              &:before {
                content: "1.0";
              }
            `}
          />
          <span
            css={`
              background: #60ff46;
              &:before {
                content: "1.2";
              }
            `}
          />
          <span
            css={`
              background: #11ad6b;
              &:before {
                content: "1.4";
              }
              &:after {
                content: "1.6";
              }
            `}
          />
        </div>
        <div
          css={`
            gap: 40px;
            display: flex;
            flex-direction: row;
          `}
        >
          <div
            css={`
              gap: 10px;
              display: flex;
              font-size: 12px;
              flex-direction: row;
              align-items: center;
            `}
          >
            <span
              css={`
                width: 40px;
                height: 6px;
                border-radius: 20px;
                border: 0.5px solid #262c34;
              `}
            />
            N/A
          </div>
          <div
            css={`
              gap: 10px;
              display: flex;
              font-size: 12px;
              flex-direction: row;
              align-items: center;
            `}
          >
            <span
              css={`
                width: 40px;
                height: 6px;
                border-radius: 20px;
                border: 0.5px solid #262c34;
                background: repeating-linear-gradient(
                  -45deg,
                  #262c34 0 0.5px,
                  #fff 1.5px 2px
                );
              `}
            />
            Not Reported
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        css={`
          position: relative;
        `}
      >
        <div
          id="performance-framework-network"
          css={`
            width: 100%;
            height: 700px;

            ${props.data.links.length === 0
              ? `
              opacity: 0.3;
              pointer-events: none;
              filter: grayscale(1);
            `
              : ""}
          `}
        >
          <ResponsiveNetwork
            repulsivity={200}
            linkThickness={1}
            motionDamping={12}
            linkColor="#DFE3E6"
            nodeBorderWidth={1}
            motionStiffness={160}
            nodes={
              props.data.nodes.length > 0 ? props.data.nodes : mockdata.nodes
            }
            links={
              props.data.links.length > 0 ? props.data.links : mockdata.links
            }
            layers={[Links, Nodes]}
            nodeColor={(e: any) => e.color}
            linkDistance={(e: any) => e.distance}
            nodeBorderColor={(e: any) => e.borderColor}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          />
        </div>
        {props.data.links.length === 0 && <NoDataLabel />}
      </Grid>
    </Grid>
  );
}
