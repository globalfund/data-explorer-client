import { css } from "styled-components/macro";

export const themeCarouselContainerCss = (isSmallScreen: boolean) => css`
  width: 100%;

  > div {
    > div:nth-of-type(2) {
      margin: 0;
    }
    > div:nth-of-type(3) {
      padding-top: ${isSmallScreen ? "10px" : 0};
    }
  }
`;

export const arrowLeftCss = css`
  width: 30px;
  left: -40px;
  height: 30px;
  display: flex;
  position: absolute;
  align-items: center;
  top: calc(50% - 15px);
  justify-content: center;

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background: #98a1aa;
  }

  > svg {
    transform: rotate(-180deg);
  }
`;

export const arrowRightCss = css`
  width: 30px;
  height: 30px;
  right: -40px;
  display: flex;
  position: absolute;
  align-items: center;
  top: calc(50% - 15px);
  justify-content: center;

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background: #98a1aa;
  }
`;

export const gridItemCss = css`
  padding: 20px;
  height: 260px;
  color: #262c34;
  background: #fff;
  border-radius: 20px;
  border: 2px solid #fff;

  @media (max-width: 767px) {
    height: 205px;
  }

  > div {
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "Inter", "Helvetica Neue", sans-serif;
  }

  > svg {
    width: 100%;
    height: calc(100% - 30px);
  }

  &:hover {
    border-color: #13183f;
  }
`;
