import React from "react";
import { css } from "styled-components/macro";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

export function NetworkLegends() {
  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
      <div
        css={`
          color: #231d2c;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "componentsChartsNetwork.achievementRate", "")}
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
            border: 0.5px solid #231d2c;

            &:before {
              width: 40px;
              left: -15px;
              bottom: -25px;
              color: #231d2c;
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

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 40px;
              }
            }
          }

          > span {
            width: 12px;
            height: 12px;
            margin: 0 20px;
            position: relative;
            border-radius: 50%;
            border: 0.5px solid #231d2c;

            &:before {
              width: 40px;
              left: -15px;
              bottom: -25px;
<<<<<<< HEAD
              color: #231d2c;
=======
              color: #262c34;
>>>>>>> 26f3485bf722b77cb35efc4928b6bc98505ccb74
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
              #231d2c 0 0.5px,
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

const legendItems = [
  {
    label: "0%",
    color: "#fa7355",
  },
  {
    label: "30%",
    color: "#ffaa46",
  },
  {
    label: "60%",
    color: "#daff46",
  },
  {
    label: "80%",
    color: "#60ff46",
  },
  {
    label: "100%",
    color: "#11ad6b",
  },
  {
    label: "> 100%",
    color: "",
  },
];

const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  top: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  title: css`
    color: #231d2c;
    font-size: 12px;
    font-weight: bold;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  `,
  noData: (reported: boolean) => css`
    color: #231d2c;
    font-size: 12px;
    padding-left: 20px;
    position: relative;
    white-space: nowrap;

    @media (max-width: 767px) {
      margin-left: 0;
    }

    &:before {
      left: 0;
      top: 5px;
      content: "";
      width: 13px;
      height: 13px;
      position: absolute;
      border-radius: 50%;
      border: 0.5px solid #231d2c;
      background: ${reported
        ? "transparent"
        : `repeating-linear-gradient(
        -45deg,
        #231d2c 0 0.5px,
        #fff 1.5px 2px
      )`};
    }
  `,
  noDataLegendContainer: css`
    width: 100%;
    display: flex;
    margin-top: 40px;
    flex-direction: row;
    justify-content: flex-start;

    > div:nth-of-type(2) {
      width: 40px;
      height: 100%;
    }
  `,
  spacer: css`
    width: 100%;
    height: 10px;
  `,
  legendContainer: css`
    width: 600px;

    @media (max-width: 767px) {
      width: 100%;
    }
  `,
  legends: css`
    width: 100%;
    display: flex;
    font-size: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
};

export function AchievementRateLegend() {
  const cmsData = useCMSData({ returnData: true });

  return (
    <div css={styles.container}>
      <div css={styles.legendContainer}>
        <div css={styles.top}>
          <div css={styles.title}>
            {get(cmsData, "componentsChartsNetwork.achievementRate", "")}
          </div>
        </div>
        <div css={styles.spacer} />
        <div css={styles.legends}>
          {legendItems.map((item: { label: string; color: string }) => (
            <div
              key={item.label}
              css={`
                height: 10px;
                border-radius: 10px;
                width: calc(100% / 5);
                background: ${item.color};

                &:before {
                  top: 20px;
                  left: -5px;
                  position: relative;
                  color: color: #231d2c;
                  content: "${item.label}";
                }
              `}
            />
          ))}
        </div>
      </div>
      <div css={styles.noDataLegendContainer}>
        <div css={styles.noData(true)}>
          {get(cmsData, "componentsChartsNetwork.notAvailable", "")}
        </div>
        <div css={styles.spacer} />
        <div css={styles.noData(false)}>
          {get(cmsData, "componentsChartsNetwork.notReported", "")}
        </div>
      </div>
    </div>
  );
}
