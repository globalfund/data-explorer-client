import styled from "styled-components/macro";

interface Props {
  light?: boolean;
  dark?: boolean;
}
export const PrimaryButton = styled.button<Props>`
  background: ${(props) =>
    props.light ? "#E4E4E4" : props.dark ? "#231D2C" : props.color};
  border-radius: 30px;
  border: none;
  outline: none;
  padding: 12px 27px;
  height: 41px;
  display: flex;
  color: inherit;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;

  :disabled {
    background: #dfe3e6;
    pointer-events: none;
    border: 1px solid #fff;
  }
`;

export const GreyedButton = styled(PrimaryButton)`
  background: #dfe3e6;
  border: 1px solid #ffffff;
`;

export const HomePrimaryButton = styled.button`
  padding: 9px 27px;
  height: 41px;
  border-radius: 30px;
  outline: none;
  border: none;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  background: ${(props) => (props.color ? props.color : "inherit")};
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
