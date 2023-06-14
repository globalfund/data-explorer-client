import { css } from "styled-components/macro";

export const headerBlockcss = {
  container: (backgroundColor: string, titleColor: string) => css`
    width: 100%;
    height: 215px;
    padding: 35px 0;
    position: relative;
    background: ${backgroundColor};

    input {
      width: 100%;
      color: ${titleColor};
      height: 100%;
      border: none;
      outline: none;
      font-size: 28.9px;
      font-weight: 700;
      line-height: 48px;
      background: inherit;

      &:focus {
        &::placeholder {
          opacity: 0.5;
        }
      }

      ::placeholder {
        color: ${titleColor};
      }
    }
  `,
  innerContainer: css`
    width: 100%;
  `,
  date: (dateColor: string) => css`
    gap: 0.7rem;
    display: flex;
    font-size: 8.66898px;
    line-height: 14px;
    color: ${dateColor};
    align-items: center;

    svg {
      path {
        fill: ${dateColor};
      }
    }
  `,
};
