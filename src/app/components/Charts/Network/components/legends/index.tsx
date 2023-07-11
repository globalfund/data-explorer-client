import React from "react";
import { css } from "styled-components/macro";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { appColors } from "app/theme";

export function NetworkLegends() {
  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
      <div
        css={`
          color: ${appColors.COMMON.PRIMARY_COLOR_1};
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
            border: 0.5px solid ${appColors.COMMON.PRIMARY_COLOR_1};

            &:before {
              width: 40px;
              left: -15px;
              bottom: -25px;
              color: ${appColors.COMMON.PRIMARY_COLOR_1};
              font-size: 12px;
              position: absolute;
              text-align: center;
            }
          }
        `}
      >
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_1};
            &:before {
              content: "0-0.2";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_2};
            &:before {
              content: "0.2-0.4";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_3};
            &:before {
              content: "0.4-0.6";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_4};
            &:before {
              content: "0.6-0.8";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_5};
            &:before {
              content: "0.8-1.0";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_6};
            &:before {
              content: "1.0-1.2";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_7};
            &:before {
              content: "1.2-1.4";
            }
          `}
        />
        <span
          css={`
            background: ${appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_8};
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
            border: 0.5px solid ${appColors.COMMON.PRIMARY_COLOR_1};

            &:before {
              width: 40px;
              left: -15px;
              bottom: -25px;
              color: ${appColors.COMMON.PRIMARY_COLOR_1};
              font-size: 12px;
              position: absolute;
              text-align: center;
            }
          }
        `}
      >
        <span
          css={`
            background: ${appColors.COMMON.WHITE};
            &:before {
              content: "N/A";
            }
          `}
        />
        <span
          css={`
            background: repeating-linear-gradient(
              -45deg,
              ${appColors.COMMON.PRIMARY_COLOR_1} 0 0.5px,
              ${appColors.COMMON.WHITE} 1.5px 2px
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
    color: appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_1,
  },
  {
    label: "30%",
    color: appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_3,
  },
  {
    label: "60%",
    color: appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_5,
  },
  {
    label: "80%",
    color: appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_7,
  },
  {
    label: "100%",
    color: appColors.NETWORK.ACHIEVEMENT_RATE_COLOR_8,
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
    color: ${appColors.COMMON.PRIMARY_COLOR_1};
    font-size: 12px;
    font-weight: bold;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  `,
  noData: (reported: boolean) => css`
    color: ${appColors.COMMON.PRIMARY_COLOR_1};
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
      border: 0.5px solid ${appColors.COMMON.PRIMARY_COLOR_1};
      background: ${reported
        ? "transparent"
        : `repeating-linear-gradient(
        -45deg,
        ${appColors.COMMON.PRIMARY_COLOR_1} 0 0.5px,
        ${appColors.COMMON.WHITE} 1.5px 2px
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
                  color: color: ${appColors.COMMON.PRIMARY_COLOR_1};
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
