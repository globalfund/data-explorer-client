import React from "react";
import { useMeasure } from "react-use";

const itemock = [
  {
    name: "Grant A",
    years: [2002, 2006],
    value: 10000000,
    component: "HIV",
  },
  {
    name: "Grant B",
    years: [2006, 2012],
    value: 10000000,
    component: "Malaria",
  },
  {
    name: "Grant C",
    years: [2012, 2016],
    value: 10000000,
    component: "RSSH",
  },
  {
    name: "Grant D",
    years: [2016, 2020],
    value: 10000000,
    component: "Tuberculosis",
  },
];

export function GrantsViz() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const datayears = [
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ].reverse();
  const components = ["HIV", "Malaria", "RSSH", "Tuberculosis"];

  const yearItemWidth = width / 2 / datayears.length;

  function calcRotate(component: string) {
    const componentRotate = 180 / components.length / 2;
    const fIndex = components.indexOf(component);
    let res = 0;
    if (fIndex > -1) {
      if (fIndex < components.length / 2) {
        res = -90 + componentRotate * (fIndex + 1);
      } else {
        res = componentRotate * fIndex;
      }
    }
    return `${res}deg`;
  }

  function getCSSDirectionProperties(component: string) {
    const fIndex = components.indexOf(component) + 1;
    if (fIndex > 0) {
      if (fIndex === 1) {
        return "bottom: 0;";
      }
      if (fIndex === 2) {
        return "left: 0;bottom: 0;";
      }
      if (fIndex === 3) {
        return "top: 0;";
      }
      return "right: 0;";
    }
  }

  return (
    <div
      ref={ref}
      css={`
        width: 100%;
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
                top: ${width / components.length}px;
                transform: rotate(${360 - rotate}deg);
              }
            `}
          />
        );
      })}
      {datayears.map((year: number, index: number) => {
        const itemwidth = width - (width / datayears.length) * index;

        return (
          <div
            key={year}
            css={`
              bottom: 0;
              display: flex;
              font-weight: bold;
              position: absolute;
              align-items: center;
              width: ${itemwidth}px;
              justify-content: center;
              border: 1px solid #c7cdd1;
              border-bottom-style: none;
              height: ${itemwidth / 2}px;
              border-top-left-radius: ${itemwidth * 2}px;
              border-top-right-radius: ${itemwidth * 2}px;
              left: ${((width / datayears.length) * index) / 2}px;

              &:after {
                left: -15px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                content: "${year}";
                position: absolute;
              }

              &:before {
                right: -15px;
                bottom: -25px;
                color: #262c34;
                font-size: 10px;
                content: "${year}";
                position: absolute;
              }

              ${index + 1 === datayears.length
                ? `
              bottom: -1px;
              background: #fff;
              border-bottom: 1px solid #fff;
              `
                : ""}
            `}
          >
            {/* {index + 1 === datayears.length && "Grants"} */}
            {itemock.map((item: any) => {
              if (year === item.years[0]) {
                return (
                  <div
                    key={item.name}
                    css={`
                      width: 100%;
                      height: 50px;
                      position: absolute;
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
                          ${getCSSDirectionProperties(item.component)}
                          position: absolute;
                          transform-origin: bottom;
                          transform: rotate(${calcRotate(item.component)});
                          height: ${yearItemWidth *
                          (item.years[1] - item.years[0])}px;
                        `}
                      >
                        <hr
                          css={`
                            margin: 0;
                            height: 100%;
                            border-width: 1px;
                            position: absolute;
                            border-color: #13183f;
                            border-style: none none none solid;
                          `}
                        />
                        <div
                          css={`
                            height: 100%;
                            position: relative;
                          `}
                        >
                          <div
                            css={`
                              top: 0;
                              left: -3px;
                              width: 6px;
                              height: 6px;
                              border-radius: 50%;
                              position: absolute;
                              background: #495057;
                            `}
                          />
                          <div
                            css={`
                              top: 6px;
                              left: -10px;
                              width: 20px;
                              height: 20px;
                              background: #fff;
                              border-radius: 50%;
                              position: absolute;
                              border: 1px solid #495057;
                            `}
                          />
                          <div
                            css={`
                              bottom: 0;
                              left: -1px;
                              width: 4px;
                              height: 4px;
                              border-radius: 50%;
                              position: absolute;
                              background: #495057;
                            `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}
