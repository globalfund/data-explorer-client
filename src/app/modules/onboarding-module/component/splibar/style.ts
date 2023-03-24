import styled from "styled-components/macro";

interface ISlider {
  active?: string;
  blue?: string;
}
export const Slider = {
  Container: styled.div`
    display: flex;
    color: #d7d8d9;
    margin: 4% 0%;

    cursor: pointer;
    justify-content: space-between;
  `,
  Left: styled.div<ISlider>`
    text-align: center;
    border-bottom: 3px solid
      ${(props) => (props.active ? props.active : "#ADB5BD")};
    width: 100%;
    a {
      text-decoration: none;
    }
    .star {
      margin-top: 21%;
    }
    img {
      margin-top: 31%;
      margin-left: -38%;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-around;

      margin: auto;
      margin-bottom: 9px;
      font-weight: 700;
      font-size: 18px;
      color: ${(props) => (props.active ? props.active : "#ADB5BD")};
    }
  `,
  Right: styled.div<ISlider>`
    text-align: center;
    border-bottom: 3px solid ${(props) => (props.blue ? props.blue : "#ADB5BD")};

    width: 100%;

    a {
      text-decoration: none;
    }
    .hot {
      margin-top: 21%;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-around;
      /* width: 12%; */
      margin: auto;
      margin-bottom: 9px;

      font-weight: 700;
      font-size: 18px;
      color: ${(props) => (props.blue ? props.blue : "#D7D8D9")};
    }
  `,
};
