import { css } from "styled-components/macro";

export const headerBlockcss = {
  container: css`
    background: #252c34;
    padding: 4rem 0rem 4rem 15%;
    /* font-family: "Inter", "Helvetica Neue", sans-serif; */
    margin-top: 6rem;
    input {
      font-size: 40.0325px;
      line-height: 48px;
      color: #ffffff;
      font-weight: 700;
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      background-color: inherit;
    }

    textarea {
      font-weight: 325;
      font-size: 19.3929px;
      line-height: 23px;
      letter-spacing: 0.692603px;
      color: #ffffff;
      border: none;
      outline: none;
      width: max-content;
      min-width: 600px;
      height: max-content;
      background-color: inherit;
      resize: none;
    }
    p {
      font-weight: 325;
      font-size: 12.0083px;
      line-height: 14px;

      color: #ffffff;
    }
  `,
  innerContainer: css`
    width: 60%;
  `,

  date: css`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    gap: 0.7rem;
  `,
};
