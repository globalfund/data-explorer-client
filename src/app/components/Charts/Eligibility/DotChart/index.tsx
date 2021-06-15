import React from "react";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { InfoIcon } from "app/assets/icons/Info";
import useMousePosition from "app/hooks/useMousePosition";
import {
  DotChartProps,
  DotChartModel,
  mockdata,
  mockdata2,
} from "app/components/Charts/Eligibility/DotChart/data";

const styles = {
  Eligible: css`
    background: #262c34;
    border: 1px solid #adb5bd;
  `,
  "Not Eligible": css`
    background: #adb5bd;
    border: 1px solid #262c34;
  `,
  "Transition Funding": css`
    border: 1px dashed #262c34;
  `,
};

export function DotChart(props: DotChartProps) {
  const { x, y } = useMousePosition();
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
            top: ${y + 12}px;
            left: ${x + 12}px;
            position: absolute;
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
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              gap: 6px;
              display: flex;
              font-weight: bold;
              align-items: center;
            `}
          >
            Year 2020 <InfoIcon />
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
                  width: 8px;
                  height: 8px;
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
                  width: 8px;
                  height: 8px;
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
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  ${styles["Transition Funding"]}
                `}
              />
              Transition Funding
            </div>
            {props.aggregateBy === "country" && (
              <React.Fragment>
                <div
                  css={`
                    font-size: 14px;
                    margin-top: 50px;
                    font-weight: bold;
                    margin-bottom: 24px;
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
                        width: 8px;
                        height: 8px;
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
                        width: 8px;
                        height: 8px;
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
                      Tuberculosis
                    </div>
                  </div>
                  <div>
                    <div
                      css={`
                        width: 8px;
                        height: 8px;
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
                      Malaria
                    </div>
                  </div>
                  <div>
                    <div
                      css={`
                        width: 8px;
                        height: 8px;
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
                      RSSH
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </Grid>
        <Grid item container sm={12} md={10} spacing={4}>
          {props.aggregateBy === "component"
            ? mockdata.map((group: DotChartModel) => (
                <Grid item key={group.name} xs={12} sm={6}>
                  <div
                    css={`
                      font-size: 14px;
                      font-weight: bold;
                      margin-bottom: 12px;
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
                            width: 8px;
                            height: 8px;
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
              ))
            : mockdata2.map((group: DotChartModel, index: number) => (
                <Grid item key={`${group.name}${index}`} xs={4} sm={2}>
                  <div
                    css={`
                      font-size: 14px;
                      font-weight: bold;
                      margin-bottom: 12px;
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
                            width: 8px;
                            height: 8px;
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
