import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import { useCMSData } from "app/hooks/useCMSData";
import { ResponsiveNetwork } from "@nivo/network";
import { useMediaQuery, Tooltip } from "@material-ui/core";
import { NetworkVizProps } from "app/components/Charts/Network/data";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { AchievementRateLegend } from "app/components/Charts/Network/components/legends";

export function NetworkViz(props: NetworkVizProps) {
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  React.useEffect(() => {
    setTimeout(() => {
      const viz = document.getElementById("performance-framework-network");
      if (viz) {
        const svgs = viz.getElementsByTagName("svg");
        if (svgs.length > 0) {
          const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
          pathElement.setAttribute("stroke", "#231d2c");
          pathElement.setAttribute("strokeWidth", "0.5");

          const patternElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "pattern"
          );
          patternElement.setAttribute("id", "diagonalHatch");
          patternElement.setAttribute("patternUnits", "userSpaceOnUse");
          patternElement.setAttribute("width", "4");
          patternElement.setAttribute("height", "4");
          patternElement.appendChild(pathElement);

          const defsElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
          );
          defsElement.appendChild(patternElement);

          svgs[0].appendChild(defsElement);
        }
      }
    }, 100);
  }, []);

  const Nodes = (nodesData: any) => {
    return nodesData.nodes.map((node: any) => {
      const id = node.id.split("|")[0];
      const circlecomp = (
        <circle
          r={node.radius}
          strokeWidth="1"
          // fill={node.color}
          stroke={node.borderColor}
          transform={`translate(${node.x}, ${node.y}) scale(1)`}
          css={
            node.color === "#E2E2E2"
              ? `fill: url(#diagonalHatch);`
              : `fill: ${node.color};`
          }
        />
      );
      const isModule = node.depth === 2;
      const isIndicatorSet = node.depth === 1;
      return (
        <Tooltip placement="left" title={id}>
          <g
            key={node.id}
            css={
              isModule
                ? `
            cursor: pointer;
            ${
              props.selectedNodeId && props.selectedNodeId === node.id
                ? `> circle {
              strokeWidth: 2px;
            }
            > text {
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }`
                : ""
            }
            &:hover {
              > circle {
                strokeWidth: 2px;
              }
              > text {
                font-weight: bold;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              }
            }
          `
                : ""
            }
            onClick={() => {
              if (isModule) {
                props.onNodeClick(node.id, node.x, 0);
              }
            }}
            onTouchStart={() => {
              if (isModule) {
                props.onNodeClick(node.id, node.x, 0);
              }
            }}
          >
            {(isIndicatorSet || isModule) && (
              <text
                transform={`translate(${node.x + 10}, ${
                  node.y + (isModule ? 15 : -15)
                })`}
                css={`
                  font-size: ${isModule ? 10 : 12}px;
                  font-weight: ${isModule ? "normal" : "bold"};
                  text-decoration: ${isModule ? "underline" : "none"};
                `}
              >
                {isModule && id.length > 15 ? `${id.substring(0, 15)}...` : id}
              </text>
            )}
            {node.depth === 0 && (
              <text
                transform={`translate(${node.x + 20}, ${node.y})`}
                css={`
                  font-size: 12px;
                  font-weight: bold;
                  text-decoration: none;
                `}
              >
                {node.id.split(" - ").map((text: string, index: number) => (
                  <tspan key={text} x={0} y={index * 15}>
                    {text}
                  </tspan>
                ))}
              </text>
            )}
            {circlecomp}
          </g>
        </Tooltip>
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
            ? "#231d2c"
            : "#DFE3E6"
        }
      />
    ));
  };

  return (
    <Grid container spacing={2}>
      {!isMobile && (
        <Grid item xs={12}>
          <div
            css={`
              color: #231d2c;
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {get(cmsData, "componentsChartsNetwork.performanceFramework", "")}
          </div>
        </Grid>
      )}
      {isSmallScreen && (
        <Grid item xs={12} css="padding-bottom: 0 !important;">
          <AchievementRateLegend />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        css={`
          position: relative;
        `}
      >
        <div
          id="performance-framework-network"
          css={`
            width: 100%;
            height: calc(100vh - 400px);

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
            iterations={150}
            linkThickness={1}
            motionDamping={12}
            linkColor="#DFE3E6"
            nodeBorderWidth={1}
            motionStiffness={160}
            nodes={props.data.nodes.length > 0 ? props.data.nodes : []}
            links={props.data.links.length > 0 ? props.data.links : []}
            layers={[Links, Nodes]}
            nodeColor={(e: any) => e.color}
            linkDistance={(e: any) => e.distance}
            nodeBorderColor={(e: any) => e.borderColor}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          />
        </div>
        {props.data.links.length === 0 && <NoDataLabel />}
      </Grid>
      {!isSmallScreen && (
        <Grid item xs={12} css="padding-bottom: 0 !important;">
          <AchievementRateLegend />
        </Grid>
      )}
    </Grid>
  );
}
