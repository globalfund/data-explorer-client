import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import {
  ResponsiveSankey,
  SankeyLinkDatum,
  SankeyNodeDatum,
} from "@nivo/sankey";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { BudgetsFlowProps } from "app/components/Charts/Budgets/Flow/data";
import { getNodes } from "app/components/Charts/Budgets/Flow/components/node";
import { NoDataBudgetsFlow } from "app/components/Charts/Budgets/Flow/components/nodata";
import { BudgetsFlowTooltip } from "app/components/Charts/Budgets/Flow/components/tooltip";

const container = css`
  width: 100%;
  padding-top: 40px;
  position: relative;
  height: ${window.innerHeight - 300}px;

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

  path {
    cursor: pointer;
    ${/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      ? "fill: rgb(199, 205, 209);"
      : ""};
  }

  > svg {
    width: 100%;
    height: 600px;
  }
`;

const header = css`
  > div {
    color: #262c34;
    font-size: 14px;
    font-weight: bold;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  }
`;

function getLegendItems(data: any) {
  const legends: { name: string; color: string }[] = [];
  data.forEach((item: any) => {
    item?.components.forEach((component: any) => {
      legends.push({
        name: component.id,
        color: component.color,
      });
    });
  });
  return uniqBy(legends, "name");
}

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
  const legends = getLegendItems(props.data.nodes);
  //   const [xsTooltipData, setXsTooltipData] = React.useState(null);
  const totalBudget = sumBy(
    filter(props.data.links, { source: "Budgets" }),
    "value"
  );

  // React.useEffect(() => {
  //   const node = document.getElementById("sankey");
  //   if (node) {
  //     const vizsvgelem = node.querySelector("svg > g");
  //     if (vizsvgelem) {
  //       vizsvgelem
  //         .querySelector("linearGradient")
  //         ?.setAttribute("id", "genericlineargradient");
  //     const paths = [...node.querySelectorAll("path")];
  //     paths.forEach((path) => {
  //       path.setAttribute("fill", "rgb(199, 205, 209)");
  //     });
  //     [...vizsvgelem.querySelectorAll("linearGradient")].forEach(
  //       (lg, index) => {
  //         if (index > 0) {
  //           lg.remove();
  //         }
  //       }
  //     );
  //     }
  //     const nodes = [...node.querySelectorAll("linearGradient")];
  //     nodes.forEach((lg) => {
  //       const elems = lg.getElementsByTagName("stop");
  //       if (elems && elems.length === 2) {
  //         elems[0].setAttribute("stop-color", "rgb(199, 205, 209)");
  //         elems[1].setAttribute("stop-color", "rgba(199, 205, 209, 0.1)");
  //       }
  //     });
  //   }
  // }, [props.data]);

  const Nodes = (nProps: any) => {
    if (props.vizCompData.length !== nProps.nodes.length) {
      props.setVizCompData(nProps.nodes);
    }
    return getNodes(nProps.nodes, props.selectedNodeId, props.onNodeClick);
  };

  return (
    <div data-cy="budgets-flow" id="sankey">
      <Grid container alignItems="center" spacing={4} css={header}>
        <Grid item xs={12}>
          <div
            css={`
              gap: 24px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
            `}
          >
            {legends.map((legend: any) => (
              <div
                key={legend.name}
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 12px;
                  align-items: center;
                  flex-direction: row;
                  font-weight: normal;
                `}
              >
                <div
                  css={`
                    width: 12px;
                    height: 12px;
                    background: ${legend.color};
                  `}
                />
                <div>{legend.name}</div>
              </div>
            ))}
          </div>
        </Grid>
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
      {props.data.links.length === 0 ? (
        <React.Fragment>
          <NoDataBudgetsFlow />
          <NoDataLabel height="600px" />
        </React.Fragment>
      ) : (
        <div css={container} id="sankeyviz">
          <ResponsiveSankey
            data={props.data}
            colors={["#373D43"]}
            // @ts-ignore
            layers={["links", Nodes, "labels"]}
            margin={{ top: 0, right: 0, bottom: 10, left: 0 }}
            nodeOpacity={1}
            nodeSpacing={34}
            nodeThickness={25}
            nodeInnerPadding={5}
            linkOpacity={1}
            onClick={(
              data: SankeyNodeDatum | SankeyLinkDatum,
              event: React.MouseEvent
            ) => {
              const linkTarget = get(data, "target", null);
              if (linkTarget) {
                props.onNodeClick(
                  {
                    id: linkTarget.id.toString(),
                    filterStr: linkTarget.filterStr.toString(),
                  },
                  linkTarget.x - 200,
                  linkTarget.y
                );
              }
            }}
            enableLinkGradient
            linkBlendMode="normal"
            linkHoverOthersOpacity={0.15}
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
      )}
    </div>
  );
}
