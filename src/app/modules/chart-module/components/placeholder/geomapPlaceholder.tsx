import React from "react";
import { ReactComponent as GeomapChartPlaceholderImage } from "app/modules/chart-module/assets/geomapPlaceholder.svg";

export default function GeomapPlaceholder(props: { datasetName: string }) {
  const getLabel = (index: number) => {
    if (index === 0 || index === 4) {
      return "--USD";
    }
    if (index === 5) {
      return "N/A";
    }
  };
  return (
    <>
      <div
        css={`
          svg {
            width: 100%;
            height: 100%;
          }
        `}
      >
        <div>
          <p
            css={`
              font-family: "Gotham Narrow", sans-serif;
              font-size: 12px;
              margin-bottom: 6px;
            `}
          >
            <b>{props.datasetName}</b>
          </p>
          <div
            css={`
              display: flex;
              gap: 4px;
              width: 265px;
              align-items: center;
              p {
                margin: 0;
              }
            `}
          >
            {[...Array(6).keys()].map((_, index) => (
              <div
                key={`${"index" + index}`}
                css={`
                  height: 30px;
                  font-family: "Gotham Narrow", sans-serif;
                  font-size: 12px;
                  color: #262c34;
                  ${index === 5 && "margin-left: 15px;"}
                  text-align: ${(() => {
                    if (index === 5) {
                      return "left";
                    }
                    if (index === 0) {
                      return "right";
                    }
                    return "center";
                  })()};
                `}
              >
                <div
                  css={`
                    border-radius: 20px;
                    background: ${index !== 5
                        ? "linear-gradient(0deg, #e8eef5 0%, #e8eef5 100%)"
                        : "#fff"},
                      #343a40;
                    width: 47px;
                    height: 6px;
                    ${index === 5 && "border: 0.5px solid #C7CDD1;"}
                  `}
                ></div>
                <p>{getLabel(index)}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          css={`
            height: 20px;
          `}
        />
        <div />
        <GeomapChartPlaceholderImage />
      </div>
    </>
  );
}
