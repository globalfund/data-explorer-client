import React from "react";
import { css } from "styled-components/macro";
import ZoomInIcon from "app/assets/icons/IconZoomIn";
import ZoomOutIcon from "app/assets/icons/IconZoomOut";

interface GeoMapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const buttoncss = css`
  display: flex;
  padding: 3px;
  cursor: pointer;
  background: #fff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
`;

export function GeoMapControls(props: GeoMapControlsProps) {
  return (
    <div
      css={`
        gap: 10px;
        z-index: 1;
        right: 15px;
        bottom: 40px;
        display: flex;
        position: absolute;
        flex-direction: column;
      `}
    >
      <div css={buttoncss} onClick={props.onZoomIn}>
        <ZoomInIcon />
      </div>
      <div css={buttoncss} onClick={props.onZoomOut}>
        <ZoomOutIcon />
      </div>
    </div>
  );
}
