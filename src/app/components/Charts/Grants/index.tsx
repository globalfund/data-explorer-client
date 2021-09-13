import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import uniq from "lodash/uniq";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import filter from "lodash/filter";
import { useMeasure } from "react-use";
import { useHistory } from "react-router-dom";
import useMousePosition from "app/hooks/useMousePosition";
import {
  GrantsVizProps,
  ratingColor,
  statusBorderStyle,
} from "app/components/Charts/Grants/data";
import { css } from "styled-components/macro";
import { GrantsRadialTooltip } from "./components/tooltip";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

// TODO: clean up component
// TODO: discuss with Dafei what should happen when only 1 component is in the data.
// TODO: the labels are a bit iffy when there are 5 components. -> create an algorithm that calculates the middle of the pie.
export function GrantsViz(props: GrantsVizProps) {
  const { data } = props;
  const { x, y } = useMousePosition();
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const lYear = get(minBy(data, "years[0]"), "years[0]", 2002);
  const hYear = get(maxBy(data, "years[1]"), "years[1]", 2020);
  const datayears: number[] = [];
  for (let i = hYear; i >= lYear; i--) {
    datayears.push(i);
  }
  const [hoveredNode, setHoveredNode] = React.useState<{
    name: number;
    title: string;
    value: number;
    status: string;
    years: number[];
    component: string;
    rating: string | null;
  } | null>(null);
  const components = uniq(data.map((item: any) => item.component));
  const yearItemWidth = (width - 120) / 2 / datayears.length;
  const allValues: number[] = [];
  data.forEach((item: any) => {
    if (item.implementationPeriods) {
      item.implementationPeriods.forEach((period: any) =>
        allValues.push(period.value)
      );
    } else {
      allValues.push(item.value);
    }
  });
  const maxDisbursementValue = max(allValues);

  return (
    <React.Fragment>
      {hoveredNode && (
        <div
          css={`
            z-index: 101;
            width: 320px;
            padding: 20px;
            color: #262c34;
            top: ${y + 12}px;
            left: ${x + 12}px;
            position: absolute;
            background: #f5f5f7;
            border-radius: 20px;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
          `}
        >
          <GrantsRadialTooltip {...hoveredNode} />
        </div>
      )}
      <div
        id="rc-radial-chart"
        ref={ref}
        css={`
          width: 100%;
          height: ${width / 2}px;
          margin-top: 100px;
          position: relative;
          //border-bottom: 1px solid #c7cdd1;
          border-top-left-radius: ${width * 2}px;
          border-top-right-radius: ${width * 2}px;
        `}
      >
        <div
          id="rc-outline"
          css={`
            //top: -60px;
            //left: -60px;
            position: absolute;
            width: ${width}px;
            //width: ${width + 120}px;
            border: 1px solid #60647e;
            border-bottom-style: none;
            border-bottom: none;
            // height: ${(width + 120) / 2}px;
            height: ${width / 2}px;
            border-top-left-radius: ${width * 2}px;
            border-top-right-radius: ${width * 2}px;
          `}
        />

        <ComponentDividers width={width} components={components} />

        <div id="rc-components">
          {components.map((component: any, index: number) => {
            const items = filter(data, { component });
            return (
              <ComponentRadarThingies
                index={index}
                width={width}
                items={items}
                name={component}
                key={component}
                datayears={datayears}
                components={components}
                hoveredNode={hoveredNode}
                yearItemWidth={yearItemWidth}
                setHoveredNode={setHoveredNode}
                rotateDeg={180 / components.length}
                maxDisbursementValue={maxDisbursementValue}
              />
            );
          })}
          <hr
            css={`
              bottom: 0;
              margin: 0;
              width: 100%;
              z-index: 100;
              position: absolute;
              background-color: #c7cdd1;
            `}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export function ComponentRadarThingies(props: any) {
  const history = useHistory();

  // let nOfImplementationPeriodsInComponent = 0;
  // for (let i = 0; i < props.items.length; i++) {
  //   nOfImplementationPeriodsInComponent +=
  //     props.items[i].implementationPeriods.length;
  // }

  /*
     These are the degrees we take into consideration with upcoming calculations.
     Only the 180 to 270 range matters to us since we're dealing with the top left quarter of the circle,
     this half is also divided by a minumum of 2 (only one component for this chart wouldn't make sense,
     we might have to write some code for this edge case.)

                        270 deg
                   , - ~ ~ ~ - ,
               , '       |       ' ,
             ,           |           ,
            ,            |            ,
           ,             |             ,
  180 deg  ,---------------------------, 0 deg
           ,             |0            ,
            ,            |            ,
             ,           |           ,
               ,         |        , '
                 ' - , _ _ _ ,  '
                        90 deg
     * */
  const angleRange = {
    start: 180,
    end: 180 + 180 / props.components.length,
  };

  function getAngles() {
    const nOfPossibleAnglesOnCircleWithinRange =
      angleRange.end - angleRange.start;
    const angles = [];
    const addition =
      nOfPossibleAnglesOnCircleWithinRange / (props.items.length + 1);

    for (let i = 1; i < props.items.length + 1; i++) {
      angles.push(angleRange.start + addition * i);
    }

    return angles.reverse();
  }

  const angles = getAngles();

  return (
    <div
      id={`rc-${props.name}`}
      css={`
        width: calc(100% - 120px);
        left: 60px;
        bottom: 0;
        position: absolute;
        transform-origin: bottom;
        z-index: ${1 + props.index};
        height: ${(props.width - 120) / 2}px;
        border-top-left-radius: ${props.width * 2}px;
        border-top-right-radius: ${props.width * 2}px;
        transform: rotate(${props.index * props.rotateDeg}deg);
        border-bottom: 1px ${props.index === 0 ? "solid" : "none"} #c7cdd1;
      `}
    >
      {props.datayears.map((year: number, index: number) => {
        const showGrid = props.index === 0;
        const showLabel = props.index === 0 && year % 2 === 0;

        const itemwidth =
          props.width -
          120 -
          ((props.width - 120) / props.datayears.length) * index;
        const yearItems = filter(
          props.items,
          (item: any) => item.years[0] === year
        );

        return (
          <div
            id={`rc-${props.name}-${year}`}
            key={year}
            css={`
              bottom: 0;
              display: flex;
              font-weight: bold;
              position: absolute;
              align-items: baseline;
              width: ${itemwidth}px;
              justify-content: center;
              border: 1px solid #c7cdd1;
              height: ${itemwidth / 2}px;
              border-top-left-radius: ${itemwidth * 2}px;
              border-top-right-radius: ${itemwidth * 2}px;
              border-style: ${showGrid ? "solid" : "none"};
              border-bottom-style: none;
              left: ${(((props.width - 120) / props.datayears.length) * index) /
              2}px;

              // Left axis label
              &:before {
                right: -12px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                position: absolute;
                content: ${showLabel ? `"${year}"` : ""};
              }

              // Right axis label
              &:after {
                left: -12px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                position: absolute;
                content: ${showLabel ? `"${year}"` : ""};
              }

              ${index + 1 === props.datayears.length
                ? `
              // bottom: -1px;
              background: #fff;
              border-bottom: 1px solid #fff;
              border-style: ${showGrid ? "solid" : "none"};
              `
                : ""}
            `}
          >
            {yearItems.map((item: any, itemIndex: number) => {
              let prevItemHeight = 0;
              const subItems = item.implementationPeriods || [item];

              const angle = angles[angles.length - 1];
              angles.pop();

              return subItems.map((subItem: any, subItemIndex: number) => {
                const startHeight = prevItemHeight;
                const itemHeight =
                  props.yearItemWidth * (subItem.years[1] - subItem.years[0]) +
                  (subItemIndex > 0 ? prevItemHeight : 0) +
                  itemIndex * 2;
                prevItemHeight = itemHeight;
                let size = (subItem.value * 50) / props.maxDisbursementValue;
                size = size < 6 ? 6 : size;

                const radius = itemwidth / 2;

                function pointsOnCircle(
                  radius: number,
                  angle: number
                ): { x: number; y: number } {
                  angle *= Math.PI / 180; // Convert from Degrees to Radians
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  return { x, y };
                }

                const points = pointsOnCircle(radius, angle);

                return (
                  <div
                    key={subItem.name}
                    id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}`}
                    css={`
                      width: 100%;
                      height: 100%;
                      position: absolute;
                      //bottom: ${(props.datayears.length - index - 1) * 10}px;
                      opacity: ${props.hoveredNode &&
                      props.hoveredNode.title !== item.title
                        ? 0.4
                        : 1};
                    `}
                  >
                    <div
                      css={`
                        width: 100%;
                        height: 100%;
                        position: relative;
                        top: ${points.y}px;
                        left: ${radius + points.x}px;
                      `}
                    >
                      <div
                        css={`
                          bottom: 0;
                          // left: -3px;
                          position: absolute;
                          height: ${itemHeight}px;
                          transform-origin: bottom;
                          // Without default 90deg addition, we would have our starting point on top of the circle.
                          // This is not what we want, see angleRange comment.
                          transform: rotate(${90 + angle}deg);
                        `}
                      >
                        <hr
                          id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}-line`}
                          css={`
                            margin: 0;
                            z-index: 1;
                            left: -1px;
                            height: 100%;
                            border-width: 1px;
                            position: absolute;
                            border-color: #13183f;
                            border-style: none none none
                              ${get(
                                statusBorderStyle,
                                subItem.status,
                                statusBorderStyle["Administratively Closed"]
                              )};
                          `}
                        />
                        <div
                          id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}-implementation`}
                          css={`
                            z-index: 2;
                            height: 100%;
                            position: relative;

                            * {
                              z-index: 2;
                            }
                          `}
                        >
                          <div
                            id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}-implementation-start`}
                            css={`
                              left: -2px;
                              width: 4px;
                              height: 4px;
                              border-radius: 50%;
                              position: absolute;
                              background: #495057;
                              bottom: ${startHeight}px;
                            `}
                          />
                          <div
                            onClick={() =>
                              history.push(
                                `/grant/${item.name}/${subItem.name}/investments/disbursements`
                              )
                            }
                            onMouseLeave={() => props.setHoveredNode(null)}
                            onMouseEnter={() =>
                              props.setHoveredNode({
                                ...subItem,
                                component: item.component,
                                title: item.title || item.name,
                              })
                            }
                            id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}-implementation-end`}
                            css={`
                              top: 0;
                              cursor: pointer;
                              width: ${size}px;
                              background: #fff;
                              height: ${size}px;
                              border-radius: 50%;
                              position: absolute;
                              left: -${size / 2}px;
                              border: 1px solid #495057;
                            `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        );
      })}
    </div>
  );
}

export function ComponentDividers(props: any) {
  const { components, width } = props;
  return (
    <div
      id="rc-divider-container"
      css={`
        position: absolute;
        bottom: 0px;
      `}
    >
      {components.map((component: string, index: number) => {
        const rotate = (180 / components.length) * (index + 1);

        return (
          <hr
            id={`rc-divider-${component}`}
            key={component}
            css={`
              margin: 0;
              left: 60px;
              bottom: -25px;
              border-width: 1px;
              overflow: inherit;
              position: absolute;
              // width: ${(width - 120) / 2 + 70}px;
              width: ${(width - 120) / 2}px;
              transform-origin: top right;
              transform: rotate(${rotate}deg);
              border-style: solid none none none;
              border-color: ${index + 1 === components.length
                ? "transparent"
                : "#c7cdd1"};

              &:after {
                //left: ${width / 2}px;
                font-size: 13px;
                font-weight: bold;
                position: relative;
                display: inline-block;
                content: "${component}";
                right: 70px;
                transform: rotate(-115deg);
                top: ${(width - 240) / components.length}px;
              }
            `}
          />
        );
      })}
    </div>
  );
}

export const RadialChartLegend = (props: any) => {
  const header = css`
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  `;

  const body = css`
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  `;

  const note = css`
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.5px;
    margin-bottom: 19px;
  `;

  const implementationPeriodContainer = css`
    margin-top: 7px;
    margin-bottom: 9px;
    height: 155px;
    display: flex;
  `;

  const implementationPeriod = css`
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 100%;
    align-items: center;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 17px;
    padding-left: 5px;
  `;

  const content = css`
    padding-left: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  const end = css`
    height: 38px;
    width: 38px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid black;

    ::after {
      content: " ";
      display: block;
      height: 0.5px;
      border-top: 0.5px solid #262c34;
      transform: translate(17px, -1px);
      opacity: 0.2;
    }

    ::before {
      content: " ";
      display: block;
      height: 0.5px;
      border-top: 0.5px solid #262c34;
      transform: translate(-5px, 17px);
      width: 59px;
      opacity: 0.3;
    }
  `;

  const line = css`
    border: 1px solid #262c34;
    margin: 0;
    height: calc(100% - 38px);
  `;

  const start = css`
    height: 3px;
    width: 3px;
    background-color: white;
    border-radius: 50%;
    border: 3px solid black;

    ::after {
      content: " ";
      display: block;
      height: 0.5px;
      width: 35px;
      border-top: 0.5px solid #262c34;
      opacity: 0.2;
    }
  `;

  const solid = css`
    max-width: 83px;
    margin: 0;
    border: 1px solid #262c34;
    margin-bottom: 7px;
  `;

  const dashed = css`
    max-width: 83px;
    margin: 0;
    border: 1px dashed #262c34;
    margin-bottom: 7px;
  `;

  const dotted = css`
    max-width: 83px;
    margin: 0;
    border: 1px dotted #262c34;
    margin-bottom: 7px;
  `;

  return (
    <div
      id="rc-legend"
      css={`
        width: 100%;
        height: 100%;
        padding-right: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <div css={header}>Implementation Period</div>
      <div css={implementationPeriodContainer}>
        <div css={implementationPeriod}>
          <div css={end} />
          <hr css={line} />
          <div css={start} />
        </div>
        <div css={content}>
          <div>
            <div
              css={`
                transform: translateY(-8px);
              `}
            >
              Implementation End
            </div>

            <div
              css={`
                transform: translateY(-11px);
                white-space: pre-line;
                line-height: normal;
              `}
            >
              Size of the circle: {`\n`} Disbursements {`\n`} (Max value{" "}
              {formatFinancialValue(props.maxValue)})
            </div>
          </div>
          <div
            css={`
              transform: translateY(6px);
            `}
          >
            Implementation Start
          </div>
        </div>
      </div>
      <div css={note}>
        *One grant could contains Multiple Implementation Periods
      </div>
      <div css={header}>Grant Status</div>
      <hr css={solid} />
      <div css={body}>Active</div>
      <hr css={dashed} />
      <div css={body}>In closure</div>
      <hr css={dotted} />
      <div css={body}>Administratly Closed</div>
    </div>
  );
};
