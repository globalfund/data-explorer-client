import React from "react";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { InfoIcon, InfoIconSmall } from "app/assets/icons/Info";
import useMousePosition from "app/hooks/useMousePosition";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import {
  DotChartProps,
  DotChartModel,
} from "app/components/Charts/Eligibility/DotChart/data";
import { useMediaQuery } from "@material-ui/core";

const styles = {
  Eligible: css`
    background: #11ad6b;
    border: 1px solid #1b2127;
  `,
  "Not Eligible": css`
    background: #fa7355;
    border: 1px dotted #1b2127;
  `,
  "Transition Funding": css`
    background: #ffd646;
    border: 1px dashed #1b2127;
  `,
};

export function DotChart(props: DotChartProps) {
  const { x, y } = useMousePosition();
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const [hoveredNode, setHoveredNode] = React.useState<{
    name: string;
    status: "Eligible" | "Not Eligible" | "Transition Funding";
  } | null>(null);
  const [hoveredLegend, setHoveredLegend] = React.useState<
    "Eligible" | "Not Eligible" | "Transition Funding" | null
  >(null);

  return (
    <React.Fragment>
      {hoveredNode && (
        <div
          css={`
            padding: 12px;
            color: #262c34;
            position: fixed;
            top: ${y + 12}px;
            left: ${x + 12}px;
            background: #f5f5f7;
            border-radius: 20px;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.1);
          `}
        >
          <div>
            {hoveredNode.name}: {hoveredNode.status}
          </div>
        </div>
      )}
      <Grid container spacing={2}>
        <Grid
          item
          container
          sm={12}
          md={2}
          css={`
            display: flex;
            position: relative;
            flex-direction: ${isSmallScreen ? "row" : "column"};
            justify-content: ${isSmallScreen ? "none" : "space-between"};
          `}
        >
          <div
            css={`
              gap: 6px;
              display: flex;
              align-items: center;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: column;
                align-self: flex-start;
                margin-right: 30px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {isSmallScreen && (
                <div css="display:flex;font-weight: bold;width:90px;justify-content:space-between;">
                  Eligibility <InfoIconSmall />
                </div>
              )}
              <div
                css={`
                  font-weight: ${isSmallScreen ? "none" : "bold"};
                `}
              >
                Year {props.selectedYear}
              </div>
            </div>
            {isSmallScreen || (
              <div
                css={`
                  display: flex;
                  margin-left: 0px;
                  margin-right: 10px;
                `}
              >
                <InfoIcon />
              </div>
            )}
          </div>
          <div
            css={`
              bottom: 25px;
              font-size: 14px;
              position: sticky;
            `}
          >
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 5px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              Eligibility
            </div>
            <div
              css={`
                gap: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                transition: opacity 0.2s ease-in-out;
                opacity: ${!hoveredLegend || hoveredLegend === "Eligible"
                  ? 1
                  : 0.3};
              `}
              onMouseEnter={() => setHoveredLegend("Eligible")}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div
                css={`
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  ${styles.Eligible}
                `}
              />
              Eligible
            </div>
            <div
              css={`
                gap: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                transition: opacity 0.2s ease-in-out;
                opacity: ${!hoveredLegend || hoveredLegend === "Not Eligible"
                  ? 1
                  : 0.3};
              `}
              onMouseEnter={() => setHoveredLegend("Not Eligible")}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div
                css={`
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  ${styles["Not Eligible"]}
                `}
              />
              Not Eligible
            </div>
            <div
              css={`
                gap: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                transition: opacity 0.2s ease-in-out;
                opacity: ${!hoveredLegend ||
                hoveredLegend === "Transition Funding"
                  ? 1
                  : 0.3};
              `}
              onMouseEnter={() => setHoveredLegend("Transition Funding")}
              onMouseLeave={() => setHoveredLegend(null)}
            >
              <div
                css={`
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  ${styles["Transition Funding"]}
                `}
              />
              Transition Funding
            </div>
            {props.aggregateBy === "geographicAreaName" && (
              <React.Fragment>
                <div
                  css={`
                    font-size: 14px;
                    margin-top: 50px;
                    font-weight: bold;
                    margin-bottom: 24px;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  `}
                >
                  Country Name
                </div>
                <div
                  css={`
                    gap: 24px;
                    display: flex;
                    flex-direction: row;

                    > div {
                      position: relative;
                    }
                  `}
                >
                  <div>
                    <div
                      css={`
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        ${styles.Eligible}
                      `}
                    />
                    <div
                      css={`
                        font-size: 12px;
                        position: absolute;
                      `}
                    >
                      HIV
                    </div>
                  </div>
                  <div>
                    <div
                      css={`
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        ${styles["Not Eligible"]}
                      `}
                    />
                    <div
                      css={`
                        top: -24px;
                        left: -8px;
                        font-size: 12px;
                        position: absolute;
                      `}
                    >
                      Malaria
                    </div>
                  </div>
                  <div>
                    <div
                      css={`
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        ${styles.Eligible}
                      `}
                    />
                    <div
                      css={`
                        font-size: 12px;
                        position: absolute;
                      `}
                    >
                      RSSH
                    </div>
                  </div>
                  <div>
                    <div
                      css={`
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        ${styles["Transition Funding"]}
                      `}
                    />
                    <div
                      css={`
                        top: -24px;
                        font-size: 12px;
                        position: absolute;
                      `}
                    >
                      Tuberculosis
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </Grid>
        <Grid
          item
          container
          sm={12}
          md={10}
          spacing={4}
          css={`
            padding-bottom: 50px !important;
          `}
        >
          {props.data.length === 0 ? (
            <React.Fragment>
              <NoDataLabel />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {props.aggregateBy === "componentName" &&
                props.data.map((group: DotChartModel) => (
                  <Grid item key={group.name} xs={12} sm={6}>
                    <div
                      css={`
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 12px;
                        font-family: "GothamNarrow-Bold", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {group.name}
                    </div>
                    <div
                      css={`
                        gap: 24px;
                        display: flex;
                        flex-wrap: wrap;
                        padding-left: 5px;
                        border-left: 1px solid #acafbc;
                      `}
                    >
                      {group.items.map(
                        (
                          item: {
                            name: string;
                            status:
                              | "Eligible"
                              | "Not Eligible"
                              | "Transition Funding";
                          },
                          index: number
                        ) => (
                          <div
                            css={`
                              width: 10px;
                              height: 10px;
                              border-radius: 50%;
                              ${styles[item.status]}
                              transition: opacity 0.2s ease-in-out;
                              opacity: ${!hoveredLegend ||
                              hoveredLegend === item.status
                                ? 1
                                : 0.3};
                            `}
                            key={item.name + index}
                            onMouseEnter={() => setHoveredNode(item)}
                            onMouseLeave={() => setHoveredNode(null)}
                          />
                        )
                      )}
                    </div>
                  </Grid>
                ))}
              {props.aggregateBy === "geographicAreaName" &&
                props.data.map((group: DotChartModel, index: number) => (
                  <Grid
                    item
                    key={`${group.name}${index}`}
                    xs={4}
                    sm={2}
                    css={`
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                    `}
                  >
                    <div
                      css={`
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 12px;
                        font-family: "GothamNarrow-Bold", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {group.name}
                    </div>
                    <div
                      css={`
                        gap: 24px;
                        display: flex;
                        flex-wrap: wrap;
                        padding: 5px 0 5px 5px;
                        border-left: 1px solid #acafbc;
                      `}
                    >
                      {group.items.map(
                        (
                          item: {
                            name: string;
                            status:
                              | "Eligible"
                              | "Not Eligible"
                              | "Transition Funding";
                          },
                          index: number
                        ) => (
                          <div
                            css={`
                              width: 10px;
                              height: 10px;
                              border-radius: 50%;
                              ${styles[item.status]}
                              transition: opacity 0.2s ease-in-out;
                              opacity: ${!hoveredLegend ||
                              hoveredLegend === item.status
                                ? 1
                                : 0.3};
                            `}
                            key={item.name + index}
                            onMouseEnter={() => setHoveredNode(item)}
                            onMouseLeave={() => setHoveredNode(null)}
                          />
                        )
                      )}
                    </div>
                  </Grid>
                ))}
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
