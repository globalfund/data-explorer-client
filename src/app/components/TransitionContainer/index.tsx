import React from "react";
// @ts-ignore
import { MapInteractionCSS } from "react-map-interaction";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface TransitionContainerProps {
  vizScale: number;
  children: React.ReactNode;
  vizTranslation: { x: number; y: number };
}

export function TransitionContainer(props: TransitionContainerProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <div
      id="transition-container"
      css={`
        @media (min-width: 768px) {
          > div:first-of-type {
            z-index: 2;
            > div {
              cursor: default !important;
              > div {
                width: 100%;
                transition: transform 0.5s ease !important;
              }
            }
          }
        }

        @media (max-width: 767px) {
          z-index: 2;
          width: 100%;
          position: relative;
          padding-bottom: 100px;

          #mobile-tooltip-container {
            top: 30vh;
            left: 16px;
            width: calc(100% - 32px);
          }
        }

        svg {
          z-index: 2;
        }
      `}
    >
      {!isMobile ? (
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
      ) : (
        props.children
      )}
    </div>
  );
}
