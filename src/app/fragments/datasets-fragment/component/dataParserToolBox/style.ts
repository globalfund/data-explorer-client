import { css } from "styled-components/macro";

export const optionscss = css`
  p {
    font-size: 24px;
    color: #231d2c;
    font-family: "GothamNarrow-Book";
  }
  input {
    background: #ffffff;
    width: 10px;

    border: none;
    outline: none;
  }
  button {
    background: #231d2c;

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
    width: 125px;
    cursor: pointer;
    color: #fff;

    text-transform: uppercase;
    :hover {
      opacity: 0.8;
    }
  }
`;
export const optionFlexcss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  p {
    font-weight: 500;
    font-size: 14px;
    color: #231d2c;
  }
`;
export const buttonFlexcss = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
  gap: 1rem;
  button {
    outline: none;
    border: none;
    cursor: pointer;
    width: 125px;
    height: 41px;
    padding: 12px 43.5px;
    border-radius: 30px;
    background: #231d2c;
    color: #fff;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
`;
export const inputBoxcss = css`
  background: #ffffff;
  width: 43px;
  height: 43px;
  border: 1px solid #231d2c;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
