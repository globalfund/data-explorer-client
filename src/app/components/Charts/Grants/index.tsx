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

export function GrantsViz() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const lYear = minBy(mockdata, "years[0]")?.years[0] || 2002;
  const hYear = maxBy(mockdata, "years[1]")?.years[1] || 2020;
  const datayears: number[] = [];
  for (let i = hYear; i >= lYear; i--) {
    datayears.push(i);
  }
  const components = uniq(mockdata.map((item: any) => item.component));
  const yearItemWidth = width / 2 / datayears.length;
  const allValues: number[] = [];
  mockdata.forEach((item: any) => {
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
      {components.map((component: string, index: number) => {
        const rotate = (180 / components.length) * (index + 1);

        return (
          <hr
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
      {components.map((component: string, index: number) => {
        const items = filter(mockdata, { component });

        return (
          <ComponentRadarThingie
            index={index}
            width={width}
            items={items}
            key={component}
            datayears={datayears}
            yearItemWidth={yearItemWidth}
            rotateDeg={180 / components.length}
            maxDisbursementValue={maxDisbursementValue}
          />
        );
      })}
    </div>
  );
}

export function ComponentRadarThingie(props: any) {
  return (
    <div
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

              &:after {
                left: -15px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                position: absolute;
                content: ${show ? `"${year}"` : ""};
              }

              &:before {
                right: -15px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                position: absolute;
                content: ${show ? `"${year}"` : ""};
              }

              ${index + 1 === props.datayears.length
                ? `
              bottom: -1px;
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
                return (
                  <div
                    key={subItem.name}
                    css={`
                      width: 100%;
                      height: 100%;
                      position: absolute;
                      // bottom: ${(props.datayears.length - index - 1) * 10}px;
                    `}
                  >
                    <div
                      css={`
                        width: 100%;
                        height: 100%;
                        position: relative;
                      `}
                    >
                      <div
                        css={`
                          bottom: 0;
                          // left: -3px;
                          position: absolute;
                          height: ${itemHeight}px;
                          transform-origin: bottom;
                          transform: rotate(${-80 + itemIndex * 10}deg);
                        `}
                      >
                        <hr
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
                          <div
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
