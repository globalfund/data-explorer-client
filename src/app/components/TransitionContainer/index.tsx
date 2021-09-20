import React from "react";
// @ts-ignore
import { MapInteractionCSS } from "react-map-interaction";

interface TransitionContainerProps {
  vizScale: number;
  children: React.ReactNode;
  vizTranslation: { x: number; y: number };
}

export function TransitionContainer(props: TransitionContainerProps) {
  return (
    <div
      css={`
        > div:first-of-type {
          z-index: 2;
          > div {
            cursor: default !important;
            > div {
              width: 100%;
              // display: flex !important;
              transition: transform 0.5s ease !important;
            }
          }
        }
        svg {
          z-index: 2;
        }
      `}
    >
      <MapInteractionCSS
        disablePan
        disableZoom
        value={{
          scale: props.vizScale,
          translation: props.vizTranslation,
        }}
      >
        {props.children}
      </MapInteractionCSS>
    </div>
  );
}
