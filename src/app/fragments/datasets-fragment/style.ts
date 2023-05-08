import { css } from "styled-components/macro";

export const stepcss = css`
  left: 0;
  top: 47px;
  z-index: 10;
  width: 100vw;
  height: 50px;

  display: flex;
  align-items: center;
  position: fixed;
  justify-content: center;
  background: #f4f4f4;
  gap: 1rem;
  @media (min-width: 768px) {
    height: 50px;
  }
`;
export const uploadDatasetcss = css`
  div:nth-child(1) {
    background: #dadaf8;
    height: 55px;
    width: 100%;
    color: #231d2c;
    font-family: "GothamNarrow-Book";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-left: 2rem;
    margin-top: 5rem;
  }
`;

export const uploadAreacss = (isDragActive: boolean, disabled?: boolean) => css`
  height: 529px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${isDragActive && !disabled ? "#c4c4c4" : "#ffffff"};
  background-image: ${isDragActive && !disabled
    ? `url(
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='163' height='163' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%23ffffff' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23ffffff' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E"
            )`
    : "unset"};
  &:hover {
    cursor: ${!isDragActive && !disabled ? "pointer" : "default"};
  }
  p {
    text-align: center;
  }
  button,
  label {
    border: none;
    outline: none;
    background: #231d2c;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 27px;
    gap: 10px;
    height: 43px;
    /* width: 191px; */
    cursor: pointer;
    color: #ffffff;
    p {
      font-weight: 500;
      font-size: 14px;
      font-family: "GothamNarrow-Book";
      text-transform: uppercase;
    }
  }
  label {
    :hover {
      opacity: 0.9;
    }
  }
`;

export const metaDatacss = css`
  width: 100%;
  h1 {
    font-weight: 500;
    font-size: 48px;
    font-family: "GothamNarrow-Book";
    margin-top: 6rem;

    margin-bottom: 4.5rem;
  }
  button {
    border-radius: 30px;
    padding: 12px 27px;
    height: 41px;

    font-weight: 500;
    font-size: 14px;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
