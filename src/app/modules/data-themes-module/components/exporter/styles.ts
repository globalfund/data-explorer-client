import { css } from "styled-components/macro";

export const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  inputContainer: (open: boolean) => css`
    display: flex;
    flex-direction: row;

    > input {
        width: 140px;
        height: 32px;
        font-size 14px;
        background: #fff;
        padding-left: 16px;
        border-style: none;
        border-radius: 16px 0px 0px 16px;
    }

    > button {
        color: #fff;
        width: 60px;
        height: 32px;
        font-size 14px;
        cursor: pointer;
        border-style: none;
        background: #262C34;
        border-radius: 0px 16px 16px 0px;

        > svg {
            top: -2px;
            margin-left: 5px;
            position: relative;
            transition: all 0.2s ease-in-out;
            transform: rotate(${open ? 0 : 180}deg);

            > path {
                fill: #fff;
            }
        }
    }
  `,
  downloadBtn: css`
    color: #fff;
    width: 120px;
    height: 32px;
    font-size 14px;
    cursor: pointer;
    font-weight: bold;
    border-style: none;
    background: #262c34;
    border-radius: 16px;
    font-family: "Inter", "Helvetica Neue", sans-serif;
  `,
};
