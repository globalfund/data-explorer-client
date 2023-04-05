import { css } from "styled-components/macro";

export const headerBlockcss = {
  container: (backgroundColor: string, titleColor: string) => css`
    width: 100%;
    padding: 60px 0;
    position: relative;
    background: ${backgroundColor};

    input {
      width: 100%;
      color: ${titleColor};
      height: 100%;
      border: none;
      outline: none;
      font-size: 40px;
      font-weight: 700;
      line-height: 48px;
      background: inherit;

      :disabled {
        color: ${titleColor};
      }

      ::placeholder {
        color: ${titleColor};
      }
    }
  `,
  innerContainer: css`
    width: 60%;
  `,
  date: (dateColor: string) => css`
    gap: 0.7rem;
    display: flex;
    font-size: 12px;
    line-height: 14px;
    margin-top: 0.5rem;
    color: ${dateColor};
    align-items: center;

    svg {
      path {
        fill: ${dateColor};
      }
    }
  `,
};
