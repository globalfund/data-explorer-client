import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Slider } from "./style";

interface Props {
  leftLabel: string;
  rightLabel: string;
}
export default function SplitBar(props: Props) {
  const history = useHistory();
  const location = useLocation();
  const handleClick = (value: "login" | "signup") => {
    history.push(`/onboarding/${value}`);
  };
  return (
    <div>
      <Slider.Container>
        <Slider.Left
          active={location.pathname.includes("login") ? "#6061E5" : "#ADB5BD"}
          onClick={() => handleClick("login")}
        >
          <div className="title">
            <div>{props.leftLabel}</div>
          </div>
        </Slider.Left>

        <Slider.Right
          className="hot"
          onClick={() => handleClick("signup")}
          blue={location.pathname.includes("signup") ? " #6061E5 " : "#ADB5BD"}
        >
          <div className="title">
            <div>{props.rightLabel}</div>
          </div>
        </Slider.Right>
      </Slider.Container>
    </div>
  );
}
