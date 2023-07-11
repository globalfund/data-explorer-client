import React from "react";
import { appColors } from "app/theme";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import { DrilldownModelUpdated } from "app/interfaces";
import RightIcon from "@material-ui/icons/ChevronRight";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export default function BreadCrumbs() {
  const history = useHistory();

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );
  const setActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.setStep
  );
  const clearActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.clear
  );

  function onItemClick(index: number, item: DrilldownModelUpdated) {
    if (index > 0) {
      const fItemIndex = findIndex(dataPathSteps, { id: item.id });
      if (fItemIndex > -1) {
        setDataPathSteps(dataPathSteps.slice(0, fItemIndex + 1));
      }
      setActiveStep(item);
      if (
        item &&
        item.path !== `${history.location.pathname}${history.location.search}`
      ) {
        history.push(item.path);
      }
    } else {
      setDataPathSteps([]);
      clearActiveStep();
      history.push("/");
    }
  }

  return (
    <div
      css={`
        left: 0;
        top: 45px;
        z-index: 10;
        position: sticky;
        background: ${appColors.COMMON.WHITE};
      `}
    >
      <div
        css={`
          display: flex;
          gap: 5px;
          align-items: center;
          justify-content: flex-start;
          padding-top: 12px;
          padding-bottom: 12px;
          height: 56px;
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0em !important;
            display: none;
          }
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
            visibility: hidden !important;
          }
          &::-webkit-scrollbar-thumb {
            background-color: white;
            border-radius: 0px;
            border: 0;
          }
          width: 100vw;
          @media (min-width: 1280px) {
            max-width: 1280px;
          }
          @media (min-width: 600px) {
            padding-left: 24px;
            padding-right: 24px;
          }
        `}
      >
        {[
          {
            id: "datasets",
            name: "Datasets",
            path: "",
          },
          ...dataPathSteps,
        ].map((item, index) => (
          <div
            key={item.id}
            css={`
              gap: 5px;
              display: flex;
              align-items: center;
            `}
          >
            <button
              css={`
                background: ${index === dataPathSteps.length
                  ? appColors.BREADCRUMBS.ITEM_BUTTON_SELECTED_BACKGROUND_COLOR
                  : appColors.BREADCRUMBS.ITEM_BUTTON_BACKGROUND_COLOR};
                height: 32px;
                padding: 13px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 700;
                color: ${appColors.BREADCRUMBS.ITEM_BUTTON_COLOR};
                text-align: center;
                display: flex;
                align-items: center;
                border: none;
                outline: none;
                width: max-content;
                cursor: ${index < dataPathSteps.length ? "pointer" : "default"};

                :hover,
                :active,
                :focus {
                  background: ${appColors.BREADCRUMBS
                    .ITEM_BUTTON_SELECTED_BACKGROUND_COLOR};
                }
              `}
              type="button"
              onClick={() => {
                if (index < dataPathSteps.length) {
                  onItemClick(index, item);
                }
              }}
            >
              <b>{item.name}</b>
            </button>
            {index === dataPathSteps.length ? null : (
              <div
                css={`
                  display: flex;
                  align-items: center;
                  color: ${appColors.BREADCRUMBS.ITEM_ARROW_COLOR};
                `}
              >
                <RightIcon color="inherit" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
