import React from "react";
import { css } from "styled-components/macro";
import ZoomInIcon from "app/assets/icons/IconZoomIn";
import ZoomOutIcon from "app/assets/icons/IconZoomOut";

interface GeoMapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const buttoncss = css`
  z-index: 100;
  padding: 3px;
  display: flex;
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

        @media (max-width: 767px) {
          left: 15px;
          right: unset;
        }

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 10px;
            }
          }
        }
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
