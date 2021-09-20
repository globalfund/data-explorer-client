import React from "react";

export function NetworkLegends() {
  return (
    <React.Fragment>
      <div
        css={`
          color: #262c34;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
        `}
      >
        Achievement Rate
      </div>
      <div
        css={`
          width: 100%;
          display: flex;
          margin-left: -10px;
          flex-direction: row;
          margin-bottom: 30px;

          > span {
            width: 12px;
            height: 12px;
            margin: 0 20px;
            position: relative;
            border-radius: 50%;
            border: 0.5px solid #262c34;

            &:before {
              width: 40px;
              left: -15px;
              bottom: -25px;
              color: #495057;
              font-size: 12px;
              position: absolute;
              text-align: center;
            }
          }
        `}
      >
        <span
          css={`
            background: #fa7355;
            &:before {
              content: "0-0.2";
            }
          `}
        />
        <span
          css={`
            background: #fa9a55;
            &:before {
              content: "0.2-0.4";
            }
          `}
        />
        <span
          css={`
            background: #ffaa46;
            &:before {
              content: "0.4-0.6";
            }
          `}
        />
        <span
          css={`
            background: #ffd646;
            &:before {
              content: "0.6-0.8";
            }
          `}
        />
        <span
          css={`
            background: #daff46;
            &:before {
              content: "0.8-1.0";
            }
          `}
        />
        <span
          css={`
            background: #97ff46;
            &:before {
              content: "1.0-1.2";
            }
          `}
        />
        <span
          css={`
            background: #60ff46;
            &:before {
              content: "1.2-1.4";
            }
          `}
        />
        <span
          css={`
            background: #11ad6b;
            &:before {
              content: "1.4-1.6";
            }
          `}
        />
      </div>
      <div
        css={`
          gap: 40px;
          display: flex;
          margin-left: -10px;
          flex-direction: row;

          > span {
            width: 12px;
            height: 12px;
            margin: 0 20px;
            position: relative;
            border-radius: 50%;
            border: 0.5px solid #262c34;

            &:before {
              width: 40px;
              left: -15px;
              bottom: -25px;
              color: #495057;
              font-size: 12px;
              position: absolute;
              text-align: center;
            }
          }
        `}
      >
        <span
          css={`
            background: #fff;
            &:before {
              content: "N/A";
            }
          `}
        />
        <span
          css={`
            background: repeating-linear-gradient(
              -45deg,
              #262c34 0 0.5px,
              #fff 1.5px 2px
            );
            &:before {
              left: -40px !important;
              width: 100px !important;
              content: "Not Reported";
            }
          `}
        />
      </div>
    </React.Fragment>
  );
}
