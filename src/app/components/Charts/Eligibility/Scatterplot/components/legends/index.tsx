import React from "react";
import { css } from "styled-components/macro";
import { backCircleRadius } from "app/components/Charts/Eligibility/Scatterplot/components/node";
import {
  incomeLevels,
  diseaseBurdens,
  DiseaseBurdenType,
  IncomeLevelType,
  EligibilityType,
} from "app/components/Charts/Eligibility/Scatterplot/data";

interface Props {
  hoveredEligibilityLegend: EligibilityType | null;
  setHoveredEligibilityLegend: (l: EligibilityType | null) => void;
  showExtraLegends: boolean;
  hoveredBurdenLegend: DiseaseBurdenType | null;
  hoveredIncomeLegend: IncomeLevelType | null;
  setHoveredBurdenLegend: (l: DiseaseBurdenType | null) => void;
  setHoveredIncomeLegend: (l: IncomeLevelType | null) => void;
}

const styles = {
  Eligible: css`
    background: #11ad6b;
    border: 1px solid #1b2127;
  `,
  "Not Eligible": css`
    background: #fa7355;
    border: 1px dotted #1b2127;
  `,
  "Transition Funding": css`
    background: #ffd646;
    border: 1px dashed #1b2127;
  `,
};

const EligibilityLegend = (props: {
  value: EligibilityType;
  activeValue: EligibilityType | null;
  onHover: (l: EligibilityType | null) => void;
}) => {
  return (
    <div
      css={`
        gap: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        opacity: ${!props.activeValue || props.activeValue === props.value
          ? 1
          : 0.3};

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 5px;
            }
          }
        }
      `}
      onMouseLeave={() => props.onHover(null)}
      onMouseEnter={() => props.onHover(props.value)}
    >
      <div
        css={`
          width: 16px;
          height: 16px;
          border-radius: 50%;
          ${styles[props.value]}
        `}
      />
      {props.value}
    </div>
  );
};

const BurdenLegend = (props: {
  value: DiseaseBurdenType;
  activeValue:
    | "Extreme"
    | "Severe"
    | "High"
    | "Not High"
    | "Moderate"
    | "Low"
    | "None"
    | null;
  onHover: (
    l:
      | "Extreme"
      | "Severe"
      | "High"
      | "Not High"
      | "Moderate"
      | "Low"
      | "None"
      | null
  ) => void;
}) => {
  return (
    <span
      css={`
        opacity: ${!props.activeValue || props.activeValue === props.value
          ? 1
          : 0.3};
      `}
      onMouseLeave={() => props.onHover(null)}
      onMouseEnter={() => props.onHover(props.value)}
    />
  );
};

const IncomeLegend = (props: {
  value: IncomeLevelType;
  activeValue: IncomeLevelType | null;
  onHover: (l: IncomeLevelType | null) => void;
}) => {
  return (
    <span
      css={`
        opacity: ${!props.activeValue || props.activeValue === props.value
          ? 1
          : 0.3};
      `}
      onMouseLeave={() => props.onHover(null)}
      onMouseEnter={() => props.onHover(props.value)}
    />
  );
};

export function ScatterplotLegends(props: Props) {
  const {
    showExtraLegends,
    hoveredBurdenLegend,
    hoveredIncomeLegend,
    setHoveredBurdenLegend,
    setHoveredIncomeLegend,
    hoveredEligibilityLegend,
    setHoveredEligibilityLegend,
  } = props;

  return (
    <React.Fragment>
      <div
        css={`
          font-size: 14px;
          margin-bottom: 40px;

          @media (max-width: 960px) {
            margin-right: 80px;
          }
        `}
      >
        <div
          css={`
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Eligibility
        </div>
        <EligibilityLegend
          value="Eligible"
          activeValue={hoveredEligibilityLegend}
          onHover={setHoveredEligibilityLegend}
        />
        <EligibilityLegend
          value="Not Eligible"
          activeValue={hoveredEligibilityLegend}
          onHover={setHoveredEligibilityLegend}
        />
        <EligibilityLegend
          value="Transition Funding"
          activeValue={hoveredEligibilityLegend}
          onHover={setHoveredEligibilityLegend}
        />
      </div>
      {showExtraLegends && (
        <div
          css={`
            font-size: 14px;
            @media (max-width: 960px) {
              width: 300px;
            }
          `}
        >
          <div
            css={`
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 5px;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            Disease Burden
          </div>
          <div
            css={`
              display: flex;
              position: relative;
              margin-bottom: 40px;
              justify-content: center;
              width: ${backCircleRadius[6]}px;
              height: ${backCircleRadius[6]}px;

              > span {
                bottom: 0;
                position: absolute;
                border-radius: 50%;
                border: 1px solid #231d2c;

                &:nth-of-type(1) {
                  width: ${backCircleRadius[6]}px;
                  height: ${backCircleRadius[6]}px;

                  &:after {
                    right: -70px;
                    content: "Extreme";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 35px;
                    height: 1px;
                    opacity: 0.2;
                    right: -15px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
                &:nth-of-type(2) {
                  width: ${backCircleRadius[5]}px;
                  height: ${backCircleRadius[5]}px;

                  &:after {
                    right: -68px;
                    content: "Severe";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 37px;
                    height: 1px;
                    opacity: 0.2;
                    right: -22px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
                &:nth-of-type(3) {
                  width: ${backCircleRadius[4]}px;
                  height: ${backCircleRadius[4]}px;

                  &:after {
                    right: -63px;
                    content: "High";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 40px;
                    height: 1px;
                    opacity: 0.2;
                    right: -29px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
                &:nth-of-type(4) {
                  width: ${backCircleRadius[3]}px;
                  height: ${backCircleRadius[3]}px;

                  &:after {
                    right: -96px;
                    content: "Not High";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 44px;
                    height: 1px;
                    opacity: 0.2;
                    right: -37px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
                &:nth-of-type(5) {
                  width: ${backCircleRadius[2]}px;
                  height: ${backCircleRadius[2]}px;

                  &:after {
                    right: -106px;
                    content: "Moderate";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 47px;
                    height: 1px;
                    opacity: 0.2;
                    right: -44px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
                &:nth-of-type(6) {
                  width: ${backCircleRadius[1]}px;
                  height: ${backCircleRadius[1]}px;

                  &:after {
                    right: -81px;
                    content: "Low";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 53px;
                    height: 1px;
                    opacity: 0.2;
                    right: -52px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
                &:nth-of-type(7) {
                  width: ${backCircleRadius[0]}px;
                  height: ${backCircleRadius[0]}px;

                  &:after {
                    right: -95px;
                    content: "None";
                    position: absolute;
                  }
                  &:before {
                    top: 12px;
                    content: "";
                    width: 58px;
                    height: 1px;
                    opacity: 0.2;
                    right: -59px;
                    position: absolute;
                    background: #231d2c;
                  }
                }
              }
            `}
          >
            <BurdenLegend
              value={diseaseBurdens[6]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
            <BurdenLegend
              value={diseaseBurdens[5]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
            <BurdenLegend
              value={diseaseBurdens[4]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
            <BurdenLegend
              value={diseaseBurdens[3]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
            <BurdenLegend
              value={diseaseBurdens[2]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
            <BurdenLegend
              value={diseaseBurdens[1]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
            <BurdenLegend
              value={diseaseBurdens[0]}
              activeValue={hoveredBurdenLegend}
              onHover={setHoveredBurdenLegend}
            />
          </div>
          <div
            css={`
              font-size: 14px;
            `}
          >
            <div
              css={`
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 5px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              Income Level
            </div>
            <div
              css={`
                width: 90%;
                height: 6px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                > span {
                  position: relative;
                  width: calc(100% / 6);

                  &:nth-of-type(1) {
                    background: #231d2c;
                    border: 0.5px solid #231d2c;
                    border-radius: 20px 0 0 20px;

                    &:after {
                      bottom: -45px;
                      content: "None";
                      position: absolute;
                      display: inline-block;
                      transform:rotate(90deg);
                      @media (max-width: 960px) {
                        transform: none;
                      };
                    }
                  }
                  &:nth-of-type(2) {
                    background: #70777e;
                    border: 0.5px solid #231d2c;

                    &:after {
                      bottom: -45px;
                      content: "Low";
                      position: absolute;
                      display: inline-block;
                      transform: rotate(90deg);
                      @media (max-width: 960px) {
                        transform: none;
                      };
                    }
                  }
                  &:nth-of-type(3) {
                    background: #98a1aa;
                    border: 0.5px solid #231d2c;
                  }
                  &:nth-of-type(4) {
                    background: #c7cdd1;
                    border: 0.5px solid #868e96;
                  }
                  &:nth-of-type(5) {
                    background: #dfe3e6;
                    border: 0.5px solid #adb5bd;
                  }
                  &:nth-of-type(6) {
                    background: #f4f4f4;
                    border: 0.5px solid #dfe3e6;
                  }
                  &:nth-of-type(7) {
                    border: 0.5px solid #dfe3e6;
                    border-radius: 0 20px 20px 0;

                    &:after {
                      bottom: -45px;
                      content: "High";
                      position: absolute;
                      display: inline-block;
                      transform: rotate(90deg);
                      @media (max-width: 960px) {
                        transform: none;
                      };
                  }
                }
              `}
            >
              <IncomeLegend
                value={incomeLevels[6]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
              <IncomeLegend
                value={incomeLevels[5]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
              <IncomeLegend
                value={incomeLevels[4]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
              <IncomeLegend
                value={incomeLevels[3]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
              <IncomeLegend
                value={incomeLevels[2]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
              <IncomeLegend
                value={incomeLevels[1]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
              <IncomeLegend
                value={incomeLevels[0]}
                activeValue={hoveredIncomeLegend}
                onHover={setHoveredIncomeLegend}
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
