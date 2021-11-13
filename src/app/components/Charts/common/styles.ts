import styled from "styled-components/macro";

export const XsContainer = styled.div`
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  * {
    z-index: 1010;
  }
`;

export const TooltipButton = styled.button`
  color: #fff;
  padding: 12px;
  font-size: 14px;
  border-width: 0px;
  border-radius: 20px;
  background: #495057;
`;
