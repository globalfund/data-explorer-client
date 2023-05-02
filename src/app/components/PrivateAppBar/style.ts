import { css } from "styled-components/macro";

export const headercss = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f7fd;
  padding: 0 14.1rem;

  a {
    text-decoration: none;
    color: #231d2c;
    font-size: 14px;
    font-family: "GothamNarrow-Book";
    :hover {
      color: #cea8bc;
    }
  }
  button {
    height: 33.58px;
    padding: 9.792px 35.496px;
    background: #dadaf8;
    border-radius: 24.48px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #231d2c;
    font-weight: 500;
    font-size: 11.424px;
    text-transform: uppercase;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const avicss = css`
  width: 33px;
  height: 33px;
  background: #dadaf8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 14px;
    font-family: "GothamNarrow-Book";
    color: #231d2c;
  }
`;
