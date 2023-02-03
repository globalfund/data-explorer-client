import { css } from "styled-components/macro";

export const overlaycss = css`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
`;
export const modalContainercss = css`
  background: #f5f5f7;
  border-radius: 21px;
  padding: 2rem;
  text-align: center;
  font-family: "Gotham Narrow";
  font-size: 14px;

  position: absolute;
  width: 40vw;
  top: 23vw;
  left: 30vw;

  color: #495057;

  button {
    border: none;
    outline: none;
    height: 100%;
    background: #495057;
    border-radius: 55px;
    text-align: center;
    padding: 0 60px;
    font-size: 14px;
    color: white;
    cursor: pointer;
  }
`;
