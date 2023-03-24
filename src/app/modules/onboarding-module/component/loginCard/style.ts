import { css } from "styled-components/macro";

export const socialloginbuttoncss = css`
  gap: 15px;
  width: 100%;
  height: 56px;
  display: flex;
  color: #2e4063;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  line-height: 20px;
  border: 1px solid #231d2c;
  border-radius: 10px;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  background: transparent;

  &:hover {
    background: #a1aebd;
  }
`;

export const actionbuttoncss = (splitForm: boolean) => css`
  width: 100%;
  color: #fff;
  padding: 6px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  border-style: none;
  border-radius: 50px;
  background: #6061e5;
  height: 48px;
  margin-bottom: 24px;

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    background: #a1aebd;
  }
`;
