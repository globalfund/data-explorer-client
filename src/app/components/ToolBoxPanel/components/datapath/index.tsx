import React from "react";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import Timeline from "@material-ui/lab/Timeline";
import IconButton from "@material-ui/core/IconButton";
import { DrilldownModelUpdated } from "app/interfaces";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineContent from "@material-ui/lab/TimelineContent";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { appColors } from "app/theme";

export function DataPathPanel() {
  const history = useHistory();

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );
  const setActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.setStep
  );

  function onItemClick(index: number, item: DrilldownModelUpdated) {
    if (index > 0) {
      const fItemIndex = findIndex(dataPathSteps, { id: item.id });
      if (fItemIndex > -1) {
        setDataPathSteps(dataPathSteps.slice(0, fItemIndex));
      }
      setActiveStep(item);
      if (
        item &&
        item.path !== `${history.location.pathname}${history.location.search}`
      ) {
        history.push(item.path);
      }
    }
  }

  return (
    <div
      css={`
        width: 100%;
      `}
    >
      <div
        css={`
          display: flex;
          font-size: 14px;
          font-weight: 700;
          padding: 17px 25px;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${appColors.COMMON.SECONDARY_COLOR_6};

          @media (max-width: 767px) {
            padding: 16px;
          }
        `}
      >
        Your data path
      </div>
      {dataPathSteps.length > 0 && (
        <div>
          <Timeline
            css={`
              && {
                margin-bottom: 0;
                padding: 35px 25px 0 25px;

                > li {
                  &:before {
                    flex: 0;
                    padding: 0;
                  }
                }

                // .MuiTimelineItem-root {
                //   min-height: 100px;
                // }

                .MuiTimelineDot-root {
                  margin: 0;
                  padding: 3px;
                  background: ${appColors.COMMON.PRIMARY_COLOR_1};
                }

                .MuiTimelineContent-root {
                  padding: 0 6px;
                  margin-top: -7px;
                }

                .MuiTimelineConnector-root {
                  background: ${appColors.COMMON.SECONDARY_COLOR_5};
                }
              }
            `}
          >
            {[...dataPathSteps]
              .reverse()
              .map((drilldown: DrilldownModelUpdated, index: number) => (
                <TimelineItem key={`${drilldown.name}-${drilldown.path}`}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index < dataPathSteps.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div
                      onClick={() => onItemClick(index, drilldown)}
                      css={`
                        text-transform: capitalize;
                        cursor: ${index === 0 ? "default" : "pointer"};
                        text-decoration: ${index === 0 ? "none" : "underline"};
                      `}
                    >
                      {index === dataPathSteps.length - 1
                        ? drilldown.name.split("-")[1]
                        : drilldown.name}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
          </Timeline>
          <div
            css={`
              font-weight: bold;
              padding-left: 40px;
            `}
          >
            {dataPathSteps[0].name}
          </div>
        </div>
      )}
    </div>
  );
}
