import React from "react";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface Props {
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function VizBackBtn(props: Props) {
  const history = useHistory();

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );
  const setShowDataPath = useStoreActions(
    (state) => state.DataPathPanelVisibilityState.setValue
  );
  const setActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.setStep
  );

  function onBackClick() {
    const prevActiveStep =
      dataPathSteps.length > 1 ? dataPathSteps[dataPathSteps.length - 2] : null;
    if (prevActiveStep) {
      const fItemIndex = findIndex(dataPathSteps, { id: prevActiveStep.id });
      if (fItemIndex > -1) {
        setDataPathSteps(dataPathSteps.slice(0, fItemIndex));
      }
      setActiveStep(prevActiveStep);
      if (
        prevActiveStep &&
        prevActiveStep.path !==
          `${history.location.pathname}${history.location.search}`
      ) {
        history.push(prevActiveStep.path);
      }
    }
  }

  return (
    <div
      css={`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      {props.vizLevel > 0 && (
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
          onClick={onBackClick}
        >
          <TriangleXSIcon /> Back
        </button>
      )}
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
