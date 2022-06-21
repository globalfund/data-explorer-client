import React from "react";
import { useStoreActions } from "app/state/store/hooks";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";

interface Props {
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function VizBackBtn(props: Props) {
  const setShowDataPath = useStoreActions(
    (state) => state.DataPathPanelVisibilityState.setValue
  );

  return (
    <div
      css={`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      <button
        id="viz-back-button"
        css={`
          padding: 0;
          display: flex;
          outline: none;
          font-size: 12px;
          border-style: none;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: transparent;
          margin: 10px 16px 10px 0;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          > svg {
            margin-right: 5px;
            transform: rotate(-90deg);
          }
        `}
        onClick={() => props.setVizLevel(props.vizLevel - 1)}
      >
        <TriangleXSIcon /> Back
      </button>
      <button
        id="show-data-path-btn"
        onClick={() => {
          if (props.setOpenToolboxPanel) {
            props.setOpenToolboxPanel(true);
          }
          setShowDataPath(true);
        }}
        css={`
          padding: 0;
          display: flex;
          outline: none;
          margin: 10px 0;
          font-size: 12px;
          cursor: pointer;
          border-style: none;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: transparent;
          text-decoration: underline;
        `}
      >
        Your data path
      </button>
    </div>
  );
}
