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
// import { isTouchDevice } from "app/utils/isTouchDevice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { XsContainer } from "app/components/Charts/common/styles";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { getNodes } from "app/components/Charts/Budgets/Flow/components/node";
import { NoDataBudgetsFlow } from "app/components/Charts/Budgets/Flow/components/nodata";
import {
  BudgetsFlowProps,
  MobileBudgetsFlowTooltipProps,
} from "app/components/Charts/Budgets/Flow/data";
import {
  BudgetsFlowTooltip,
  MobileBudgetsFlowTooltip,
} from "app/components/Charts/Budgets/Flow/components/tooltip";
import { useCMSData } from "app/hooks/useCMSData";

const container = css`
  width: 100%;
  padding-top: 40px;
  position: relative;
  height: ${window.innerHeight - 300}px;

  @media (max-height: 800px) {
    height: 650px;
  }

  @media (max-width: 767px) {
    padding-top: 10px;
    height: ${window.innerHeight - 200}px;
  }

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
    color: #231d2c;
    font-size: 14px;
    font-weight: bold;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

    @media (max-width: 767px) {
      font-size: 10px;
      font-weight: normal;
      font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
    }
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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const legends = getLegendItems(props.data.nodes);
  const [xsTooltipData, setXsTooltipData] =
    React.useState<MobileBudgetsFlowTooltipProps | null>(null);
  const totalBudget = sumBy(
    filter(props.data.links, { source: "Budgets" }),
    "value"
  );
  const cmsData = useCMSData({ returnData: true });

  const Nodes = (nProps: any) => {
    return getNodes(
      nProps.nodes,
      props.selectedNodeId,
      props.onNodeClick,
      setXsTooltipData
    );
  };

  return (
    <div
      data-cy="budgets-flow"
      id="sankey"
      css={`
        position: relative;
      `}
    >
      <Grid
        container
        css={header}
        alignItems="baseline"
        spacing={!isMobile ? 4 : undefined}
      >
        <Grid item xs={12} sm={2} css="font-size: 14px !important;">
          <b>{formatFinancialValue(totalBudget)}</b>
        </Grid>
        {!isMobile && (
          <Grid item xs={12} sm={10}>
            <div
              css={`
                gap: 24px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 24px;
                    }
                  }
                }
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

                    > * {
                      @supports (-webkit-touch-callout: none) and
                        (not (translate: none)) {
                        &:not(:last-child) {
                          margin-right: 6px;
                        }
                      }
                    }
                  `}
                >
                  <div
                    css={`
                      width: 12px;
                      height: 12px;
                      border: 1px solid #231d2c;
                      background: ${legend.color};
                    `}
                  />
                  <div>{legend.name}</div>
                </div>
              ))}
            </div>
          </Grid>
        )}
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
            {get(cmsData, "componentsChartsBudgets.budget", "")} <InfoIcon />
          </div>
        </Grid>
        <Grid item xs={3}>
          {get(cmsData, "componentsChartsBudgets.flowLandscapeLevel1", "")}
        </Grid>
        <Grid item xs={3} css="text-align: center;">
          {get(cmsData, "componentsChartsBudgets.flowLandscapeLevel2", "")}
        </Grid>
        <Grid item xs={3} css="text-align: right;">
          {get(cmsData, "componentsChartsBudgets.flowCostCategory", "")}
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
              // if (isTouchDevice()) {
              //   setXsTooltipData(data as SankeyLinkDatum);
              // } else {
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
              // }
            }}
            enableLinkGradient
            linkBlendMode="normal"
            linkHoverOthersOpacity={0.15}
            linkTooltip={
              (tProps: any) => (
                // !isMobile && (
                <BudgetsFlowTooltip
                  value={tProps.value}
                  source={tProps.source.id}
                  target={tProps.target.id}
                />
              )
              // )
            }
            labelFormat={(text: string | number) =>
              getNodeLabel(text as string, isMobile)
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
                  display: isMobile ? "none" : "inherit",
                },
              },
              labels: {
                text: {
                  display: !isMobile ? "inherit" : "none",
                },
              },
            }}
          />
          {isMobile && xsTooltipData && !props.selectedNodeId && (
            <XsContainer id="mobile-tooltip-container">
              <div
                css={`
                  width: 100%;
                `}
              >
                <MobileBudgetsFlowTooltip
                  {...xsTooltipData}
                  onClose={() => setXsTooltipData(null)}
                  drilldown={(id: string, filterStr: string) => {
                    props.onNodeClick(
                      {
                        id,
                        filterStr,
                      },
                      0,
                      0
                    );
                  }}
                />
              </div>
            </XsContainer>
          )}
        </div>
      )}
    </div>
  );
}
