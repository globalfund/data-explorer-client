/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import uniq from "lodash/uniq";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import filter from "lodash/filter";
import { useMeasure } from "react-use";
import { useHistory } from "react-router-dom";
import { css } from "styled-components/macro";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { isTouchDevice } from "app/utils/isTouchDevice";
import useMousePosition from "app/hooks/useMousePosition";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { GrantsRadialTooltip } from "app/components/Charts/Grants/components/tooltip";
import {
  circleLegendPositions,
  GrantsVizProps,
  ratingColor,
  statusBorderStyle,
} from "app/components/Charts/Grants/data";
import { useCMSData } from "app/hooks/useCMSData";

// TODO: clean up component
// TODO: discuss with Dafei what should happen when only 1 component is in the data.
// TODO: the labels are a bit iffy when there are 5 components. -> create an algorithm that calculates the middle of the pie.
export function GrantsViz(props: GrantsVizProps) {
  const cmsData = useCMSData({ returnData: true });
  const { data } = props;
  const history = useHistory();
  const { x, y } = useMousePosition();
  const isMobile = useMediaQuery("(max-width: 767px)");
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
    number: number;
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
            color: #231d2c;
            top: ${y + 12}px;
            left: ${x + 12}px;
            position: absolute;
            background: #f4f4f4;
            border-radius: 20px;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);

            @media (max-width: 767px) {
              top: 30vh;
              left: 16px;
              position: fixed;
              background: #fff;
              width: calc(100vw - 32px);
            }
          `}
        >
          {(isMobile || isTouchDevice()) && (
            <div
              css={`
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
              `}
            >
              <IconButton
                onTouchStart={() => setHoveredNode(null)}
                css={`
                  padding: 0;
                `}
              >
                <CloseIcon />
              </IconButton>
            </div>
          )}
          <GrantsRadialTooltip {...hoveredNode} />
          {/* {(isMobile || isTouchDevice()) && (
            <Button
              onTouchStart={() => {
                history.push(
                  `/grant/${hoveredNode.number}/${hoveredNode.name}/overview`
                );
              }}
              css={`
                width: 100%;
                margin-top: 20px;
                background: #dfe3e6;
                border-radius: 22px;

                &:hover {
                  background: #dfe3e6;
                }

                > span {
                  color: #231d2c;
                  font-size: 14px;
                  font-weight: bold;
                  text-transform: none;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                }
              `}
            >
              {get(cmsData, "componentsChartsGrants.grantsDetailPage", "")}
            </Button>
          )} */}
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

          @media (max-width: 767px) {
            margin-top: 0;
          }
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

        {components.map((component: any, index: number) => (
          <div
            key={component}
            css={`
              font-size: 13px;
              font-weight: bold;
              position: absolute;
            `}
            style={{ ...circleLegendPositions[components.length - 1][index] }}
          >
            {component}
          </div>
        ))}

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
              z-index: 15;
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
  const isMobile = useMediaQuery("(max-width: 767px)");

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
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              left: ${(((props.width - 120) / props.datayears.length) * index) /
              2}px;

              // Left axis label
              &:before {
                right: -12px;
                bottom: -35px;
                color: #231d2c;
                font-size: 10px;
                position: absolute;
                content: ${showLabel ? `"${year}"` : ""};
              }

              // Right axis label
              &:after {
                left: -12px;
                bottom: -35px;
                color: #231d2c;
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
                              background: #231d2c;
                              bottom: ${startHeight}px;
                            `}
                          />
                          <div
                            onClick={() => {
                              // if (!isMobile && !isTouchDevice()) {
                              //   history.push(
                              //     `/grant/${item.name}/${subItem.name}/overview`
                              //   );
                              // }
                            }}
                            onMouseLeave={() => {
                              if (!isMobile && !isTouchDevice()) {
                                props.setHoveredNode(null);
                              }
                            }}
                            onMouseEnter={() => {
                              if (!isMobile && !isTouchDevice()) {
                                props.setHoveredNode({
                                  ...subItem,
                                  component: item.component,
                                  title: item.title || item.name,
                                  number: item.name,
                                });
                              }
                            }}
                            onTouchStart={(
                              e: React.TouchEvent<HTMLDivElement>
                            ) => {
                              e.stopPropagation();
                              props.setHoveredNode({
                                ...subItem,
                                component: item.component,
                                title: item.title || item.name,
                                number: item.name,
                              });
                            }}
                            id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}-implementation-end`}
                            css={`
                              top: 0;
                              cursor: pointer;
                              width: ${size}px;
                              height: ${size}px;
                              border-radius: 50%;
                              position: absolute;
                              left: -${size / 2}px;
                              border: 1px solid #231d2c;
                              background: ${get(
                                ratingColor,
                                subItem.rating,
                                ratingColor.None
                              )};
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
                content: " ";
                right: 70px;
                transform: rotate(-115deg);
                top: ${(width - 240) / components.length}px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              }
            `}
          />
        );
      })}
    </div>
  );
}

export const RadialChartLegend = (props: any) => {
  const cmsData = useCMSData({ returnData: true });

  const header = css`
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
    border-radius: 50%;
    border: 1px solid #000;
    background-color: #ffc107;

    ::after {
      content: " ";
      display: block;
      height: 0.5px;
      border-top: 0.5px solid #231d2c;
      transform: translate(17px, -1px);
      opacity: 0.2;
    }

    ::before {
      content: " ";
      display: block;
      height: 0.5px;
      border-top: 0.5px solid #231d2c;
      transform: translate(-5px, 17px);
      width: 59px;
      opacity: 0.3;
    }
  `;

  const line = css`
    border: 1px solid #231d2c;
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
      border-top: 0.5px solid #231d2c;
      opacity: 0.2;
    }
  `;

  const solid = css`
    max-width: 83px;
    margin: 0;
    border: 1px solid #231d2c;
    margin-bottom: 7px;
  `;

  const dashed = css`
    max-width: 83px;
    margin: 0;
    border: 1px dashed #231d2c;
    margin-bottom: 7px;
  `;

  const dotted = css`
    max-width: 83px;
    margin: 0;
    border: 1px dotted #231d2c;
    margin-bottom: 7px;
  `;

  return (
    <div
      id="rc-legend"
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        padding-right: 24px;
        flex-direction: column;
        justify-content: center;

        @media (max-width: 1200px) {
          flex-direction: row;
          justify-content: space-evenly;
        }

        @media (max-width: 767px) {
          flex-direction: column;
        }
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <div css={header}>
          {get(cmsData, "componentsChartsGrants.implementationPeriod", "")}
        </div>
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
                {get(cmsData, "componentsChartsGrants.implementationEnd", "")}
              </div>

              <div
                css={`
                  transform: translateY(-11px);
                  white-space: pre-line;
                  line-height: normal;
                `}
              >
                {get(cmsData, "componentsChartsGrants.circleSize", "")} {`\n`}{" "}
                {get(cmsData, "componentsChartsGrants.circleContent", "")}{" "}
                {`\n`} (
                {get(cmsData, "componentsChartsGrants.circleMaxValue", "")}{" "}
                {formatFinancialValue(props.maxValue)})
              </div>
            </div>
            <div
              css={`
                transform: translateY(6px);
              `}
            >
              {get(cmsData, "componentsChartsGrants.implementationStart", "")}
            </div>
          </div>
        </div>
        <div css={note}>{get(cmsData, "componentsChartsGrants.note", "")}</div>
      </div>
      <div
        css={`
          display: flex;
          flex-direction: column;
          justify-content: center;

          @media (max-width: 767px) {
            flex-direction: row;
            justify-content: space-between;
          }
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <div css={header}>
            L{get(cmsData, "componentsChartsGrants.latestRatingColor", "")}
          </div>
          <div
            css={`
              width: 100%;
              display: flex;
              margin-left: -10px;
              flex-direction: row;
              margin-bottom: 30px;
              justify-content: space-evenly;

              @media (max-width: 767px) {
                gap: 10px;
                margin-left: 0px;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 10px;
                    }
                  }
                }
              }

              > div {
                width: 10px;
                height: 10px;
                position: relative;
                border-radius: 50%;
                border: 0.5px solid #231d2c;

                &:before {
                  width: 40px;
                  left: -16px;
                  bottom: -25px;
                  color: #231d2c;
                  font-size: 12px;
                  position: absolute;
                  text-align: center;
                }
              }
            `}
          >
            <div
              css={`
                background: #fff;
                &:before {
                  content: "None";
                }
              `}
            />
            <div
              css={`
                background: #3b873e;
                &:before {
                  content: "A1";
                }
              `}
            />
            <div
              css={`
                background: #7bc67e;
                &:before {
                  content: "A2";
                }
              `}
            />
            <div
              css={`
                background: #ffab00;
                &:before {
                  content: "B1";
                }
              `}
            />
            <div
              css={`
                background: #ff6d00;
                &:before {
                  content: "B2";
                }
              `}
            />
            <div
              css={`
                background: #e57373;
                &:before {
                  content: "C";
                }
              `}
            />
          </div>
        </div>
        <div
          css={`
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <div css="width: 100%;height: 15px;" />
          <div css={header}>
            {get(cmsData, "componentsChartsGrants.grantStatus", "")}
          </div>
          <hr css={solid} />
          <div css={body}>
            {get(cmsData, "componentsChartsGrants.active", "")}
          </div>
          <hr css={dashed} />
          <div css={body}>
            {get(cmsData, "componentsChartsGrants.closure", "")}
          </div>
          <hr css={dotted} />
          <div css={body}>
            {get(cmsData, "componentsChartsGrants.closed", "")}
          </div>
        </div>
      </div>
    </div>
  );
};
