import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import uniq from "lodash/uniq";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import filter from "lodash/filter";
import { useMeasure } from "react-use";
import {
  mockdata,
  ratingColor,
  statusBorderStyle,
} from "app/components/Charts/Grants/data";
import { nigeriaGrants } from "./NigeriaGrants";
import { getMockData } from "./countryGrants";
import { indiaGrants } from "./IndiaGrants";

export function GrantsViz() {
  // const data = mockdata;
  const data = indiaGrants;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const lYear = minBy(data, "years[0]")?.years[0] || 2002;
  const hYear = maxBy(data, "years[1]")?.years[1] || 2020;
  const datayears: number[] = [];
  for (let i = hYear; i >= lYear; i--) {
    datayears.push(i);
  }
  const components = uniq(data.map((item: any) => item.component));
  const yearItemWidth = width / 2 / datayears.length;
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
    <div
      id={"rc-radial-chart"}
      ref={ref}
      css={`
        width: 100%;
        margin-top: 100px;
        position: relative;
        height: ${width / 2}px;
        border-bottom: 1px solid #c7cdd1;
        border-top-left-radius: ${width * 2}px;
        border-top-right-radius: ${width * 2}px;
      `}
    >
      <div
        id={"rc-outline"}
        css={`
          top: -60px;
          left: -60px;
          position: absolute;
          width: ${width + 120}px;
          border: 1px solid #60647e;
          border-bottom-style: none;
          height: ${(width + 120) / 2}px;
          border-top-left-radius: ${width * 2}px;
          border-top-right-radius: ${width * 2}px;
        `}
      />

      <ComponentDividers width={width} components={components} />

      {components.map((component: string, index: number) => {
        const items = filter(data, { component });
        return (
          <ComponentRadarThingie
            index={index}
            width={width}
            items={items}
            name={component}
            key={component}
            datayears={datayears}
            yearItemWidth={yearItemWidth}
            rotateDeg={180 / components.length}
            maxDisbursementValue={maxDisbursementValue}
            components={components}
          />
        );
      })}
    </div>
  );
}

export function ComponentDividers(props: any) {
  const { components, width } = props;
  return (
    <>
      {components.map((component: string, index: number) => {
        const rotate = (180 / components.length) * (index + 1);

        return (
          <hr
            id={`rc-divider-${component}`}
            key={component}
            css={`
              margin: 0;
              left: -70px;
              bottom: -25px;
              border-width: 1px;
              overflow: inherit;
              position: absolute;
              width: ${width / 2 + 70}px;
              transform-origin: top right;
              transform: rotate(${rotate}deg);
              border-style: solid none none none;
              border-color: ${index + 1 === components.length
                ? "transparent"
                : "#c7cdd1"};

              &:after {
                left: 0;
                font-size: 13px;
                font-weight: bold;
                position: relative;
                display: inline-block;
                content: "${component}";
                transform: rotate(245deg);
                top: ${width / components.length}px;
              }
            `}
          />
        );
      })}
    </>
  );
}

export function ComponentRadarThingie(props: any) {
  let nOfImplementationPeriodsInComponent = 0;
  for (let i = 0; i < props.items.length; i++) {
    nOfImplementationPeriodsInComponent +=
      props.items[i].implementationPeriods.length;
  }

  /*
     These are the degrees we take into consideration with upcoming calculations.
     Only the 180 to 270 range matters to us since we're dealing with the top half of the circle,
     this half is also divided by a minumum of 2 (only one component for this chart wouldn't make sense,
     we might have to wright some code for this edge case.)

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
      nOfPossibleAnglesOnCircleWithinRange /
      (nOfImplementationPeriodsInComponent + 1);

    for (let i = 1; i < nOfImplementationPeriodsInComponent + 1; i++) {
      angles.push(angleRange.start + addition * i);
    }

    return angles.reverse();
  }

  const angles = getAngles();

  return (
    <div
      id={`rc-${props.name}`}
      css={`
        width: 100%;
        position: absolute;
        transform-origin: bottom;
        z-index: ${4 - props.index};
        height: ${props.width / 2}px;
        border-top-left-radius: ${props.width * 2}px;
        border-top-right-radius: ${props.width * 2}px;
        transform: rotate(${props.index * props.rotateDeg}deg);
        border-bottom: 1px ${props.index === 0 ? "solid" : "none"} #c7cdd1;
      `}
    >
      {props.datayears.map((year: number, index: number) => {
        const show = props.index === 0;
        // const show = props.index === 0 && year % 2 === 0;
        const itemwidth =
          props.width - (props.width / props.datayears.length) * index;
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
              border-style: ${show ? "solid" : "none"};
              border-bottom-style: none;
              left: ${((props.width / props.datayears.length) * index) / 2}px;

              // Left axis label
              &:before {
                right: -15px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                position: absolute;
                content: ${show ? `"${year}"` : ""};
              }

              // Right axis label
              &:after {
                left: -15px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                position: absolute;
                content: ${show ? `"${year}"` : ""};
              }

              ${index + 1 === props.datayears.length
                ? `
              // bottom: -1px;
              background: #fff;
              border-bottom: 1px solid #fff;
              border-style: ${show ? "solid" : "none"};
              `
                : ""}
            `}
          >
            {yearItems.map((item: any, itemIndex: number) => {
              let prevItemHeight = 0;
              const subItems = item.implementationPeriods || [item];

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
                const angle = angles[angles.length - 1];
                angles.pop();

                function pointsOnCircle(
                  radius: number,
                  angle: number
                ): { x: number; y: number } {
                  angle = angle * (Math.PI / 180); // Convert from Degrees to Radians
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
                            id={`rc-${props.name}-${year}-grant${itemIndex}-period${subItemIndex}-implementation-end`}
                            css={`
                              top: 0;
                              width: ${size}px;
                              background: #fff;
                              height: ${size}px;
                              border-radius: 50%;
                              position: absolute;
                              left: -${size / 2}px;
                              border: 1px solid #495057;
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
