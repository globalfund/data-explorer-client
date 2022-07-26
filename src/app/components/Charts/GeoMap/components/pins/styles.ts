import styled from "styled-components/macro";

export const CountryPin = styled.div`
  top: -7px;
  left: -6px;
  width: 12px;
  height: 14px;
  z-index: 1000;
  cursor: pointer;
  position: relative;
  animation: animatezoom 0.6s @keyframes animatezoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  img {
    top: -7px;
    left: -6px;
    position: relative;
  }
`;
