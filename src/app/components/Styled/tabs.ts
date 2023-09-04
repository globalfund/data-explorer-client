import styled from "styled-components/macro";

interface ITab {
  active?: boolean;
  position?: string;
}
export const Tab = {
  Container: styled.div`
    display: flex;
    justify-content: flex-start;
    color: #000000;
    margin: 4% 0%;
    width: 30%;
    gap: 40px;
    cursor: pointer;
    position: relative;
    font-family: "Gotham Narrow", sans-serif;
  `,
  Left: styled.div<ITab>`
    text-align: center;
    position: relative;
    color: ${(props) => (props.active ? "#6061E5" : "#000000")};
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    font-family: "Gotham Narrow", sans-serif;

    ::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 2px solid
        ${(props) => (props.active ? "#6061E5" : "transparent")};
      transform: ${(props) =>
        props.active ? "translateX(0%)" : `translateX(100%)`};
      transition: transform 0.3s linear;
    }
  `,
  Center: styled.div<ITab>`
    text-align: center;
    position: relative;
    color: ${(props) => (props.active ? "#6061E5" : "#000000")};
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    font-family: "Gotham Narrow", sans-serif;

    ::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 2px solid
        ${(props) => (props.active ? "#6061E5" : "transparent")};
      transform: ${(props) =>
        props.active
          ? "translateX(0%)"
          : `translateX(${props.position == "left" ? "-100%" : "100%"} )`};
      transition: transform 0.3s linear;
    }
  `,

  Right: styled.div<ITab>`
    text-align: center;
    position: relative;
    color: ${(props) => (props.active ? "#6061E5" : "#000000")};
    font-weight: ${(props) => (props.active ? "700" : "normal")};
    font-family: "Gotham Narrow", sans-serif;

    ::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 2px solid
        ${(props) => (props.active ? "#6061E5" : "transparent")};
      transform: ${(props) =>
        props.active ? "translateX(0%)" : "translateX(-100%)"};
      transition: transform 0.3s linear;
    }
  `,
};
