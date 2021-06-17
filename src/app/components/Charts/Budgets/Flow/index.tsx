import React from "react";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { ResponsiveSankey } from "@nivo/sankey";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BudgetsFlowProps } from "app/components/Charts/Budgets/Flow/data";
import { BudgetsFlowTooltip } from "app/components/Charts/Budgets/Flow/components/tooltip";

const container = css`
  width: 100%;
  height: 900px;

  linearGradient {
    stop {
      &:nth-child(1) {
        stop-color: rgb(199, 205, 209);
      }
      &:nth-child(2) {
        stop-color: rgba(199, 205, 209, 0.1);
      }
    }
  }

  text {
    user-select: none;
  }
`;

const header = css`
  > div {
    color: #262c34;
    font-size: 14px;
    font-weight: bold;
  }
`;

const getNodeLabel = (label: string, matchesSm: boolean): string => {
  if (matchesSm) {
    if (label.length > 13) {
      return `${label.slice(0, 10)}...`;
    }
    return label;
  }
  if (label.length > 33) {
    return `${label.slice(0, 30)}...`;
  }
  return label;
};

export function BudgetsFlow(props: BudgetsFlowProps) {
  const matches = useMediaQuery("(max-width: 767px)");
  //   const [xsTooltipData, setXsTooltipData] = React.useState(null);
  const totalBudget = sumBy(
    filter(props.data.links, { source: "Budgets" }),
    "value"
  );

  React.useEffect(() => {
    const node = document.getElementById("sankey");
    if (node) {
      const nodes = [...node.getElementsByTagName("linearGradient")];
      nodes.forEach((lg) => {
        const elems = lg.getElementsByTagName("stop");
        if (elems && elems.length === 2) {
          elems[0].setAttribute("stop-color", "rgb(199, 205, 209)");
          elems[1].setAttribute("stop-color", "rgba(199, 205, 209, 0.1)");
        }
      });
    }
  }, []);

  const Nodes = (nProps: any) => {
    return nProps.nodes.map((node: any) => (
      <rect
        x={node.x}
        y={node.y}
        key={node.id}
        width={node.width}
        height={node.height}
        data-cy="bf-sankey-bar-comp"
        fill={node.id === props.selectedNodeId ? "#2E4DF9" : "#373D43"}
        css={`
          cursor: pointer;
          &:hover {
            fill: #2e4df9;
          }
        `}
        onClick={() => {
          props.onNodeClick(node.id, node.x - 200, node.y);
        }}
      />
    ));
  };

  return (
    <div css={container} data-cy="budgets-flow" id="sankey">
      <Grid container alignItems="center" spacing={4} css={header}>
        <Grid item xs={3}>
          <div
            css={`
              display: flex;
              align-items: center;

              > svg {
                margin-left: 10px;
              }
            `}
          >
            Budget <InfoIcon />
          </div>
          <div css="font-weight: normal;">
            {formatFinancialValue(totalBudget)}
          </div>
        </Grid>
        <Grid item xs={3}>
          Investment Landscape Level 1
        </Grid>
        <Grid item xs={3} css="text-align: right;">
          Investment Landscape Level 2
        </Grid>
        <Grid item xs={3} css="text-align: right;">
          Cost category
        </Grid>
      </Grid>
      <ResponsiveSankey
        data={props.data}
        colors={["#373D43"]}
        // @ts-ignore
        layers={["links", Nodes, "labels"]}
        margin={{ top: 40, right: 0, bottom: 50, left: 0 }}
        nodeOpacity={1}
        nodeSpacing={34}
        nodeThickness={15}
        nodeInnerPadding={5}
        linkOpacity={1}
        enableLinkGradient
        linkBlendMode="normal"
        linkHoverOthersOpacity={0.1}
        linkTooltip={(tProps: any) =>
          !matches && (
            <BudgetsFlowTooltip
              value={tProps.value}
              source={tProps.source.id}
              target={tProps.target.id}
            />
          )
        }
        //   labelTextColor={(l: any) => {
        //     if (selectedNode) {
        //       return selectedNode.id === l.id ? "#fff" : "#757575";
        //     }
        //     return "#fff";
        //   }}
        labelFormat={(text: string | number) =>
          getNodeLabel(text as string, matches)
        }
        animate
        motionDamping={13}
        motionStiffness={140}
        nodeTooltip={(tProps: any) => tProps.id}
        theme={{
          tooltip: {
            container: {
              borderRadius: 20,
              padding: "16px 25px",
              position: "relative",
              backgroundColor: "#f5f5f7",
              display: matches ? "none" : "inherit",
            },
          },
        }}
      />
      {/* {matchesSm && xsTooltipData && !props.selectedNode && (
          <XsContainer>
            <ClickAwayListener onClickAway={() => setXsTooltipData(null)}>
              <Tooltip minWidth="150px" dataCy="sankey-popup">
                <div css="width: 80vw;">
                  <LinkTooltip
                    {...xsTooltipData}
                    close={() => setXsTooltipData(null)}
                  />
                </div>
              </Tooltip>
            </ClickAwayListener>
          </XsContainer>
        )} */}
    </div>
  );
}
