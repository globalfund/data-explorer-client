import React from "react";
import { DrilldownModel } from "app/interfaces";
import Timeline from "@material-ui/lab/Timeline";
import IconButton from "@material-ui/core/IconButton";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineContent from "@material-ui/lab/TimelineContent";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import { useStoreState, useStoreActions } from "app/state/store/hooks";

export function DataPathPanel() {
  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
  );
  const setShowDataPath = useStoreActions(
    (state) => state.DataPathPanelVisibilityState.setValue
  );

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
          border-bottom: 1px solid #cfd4da;

          @media (max-width: 767px) {
            padding: 16px;
          }
        `}
      >
        Your data path
        <IconButton
          css={`
            width: 14px;
            height: 14px;
          `}
          onClick={() => setShowDataPath(false)}
        >
          <CloseOutlinedIcon htmlColor="#2E4063" />
        </IconButton>
      </div>
      {vizDrilldowns.length > 0 && (
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
                  background: #262c34;
                }

                .MuiTimelineContent-root {
                  padding: 0 6px;
                  margin-top: -7px;
                }

                .MuiTimelineConnector-root {
                  background: #adb5bd;
                }
              }
            `}
          >
            {[...vizDrilldowns]
              .reverse()
              .map((drilldown: DrilldownModel, index: number) => (
                <TimelineItem key={drilldown.name}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index < vizDrilldowns.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div
                      css={`
                        text-transform: capitalize;
                        text-decoration: ${index === 0 ? "none" : "underline"};
                      `}
                    >
                      {index === vizDrilldowns.length - 1
                        ? drilldown.name.split("-")[1]
                        : drilldown.name}
                    </div>
                    {/* <div
                      css={`
                        color: #fff;
                        margin-top: 8px;
                        padding: 2px 8px;
                        width: fit-content;
                        background: #98a1aa;
                        border-radius: 26px;
                      `}
                    >
                      By Components
                    </div> */}
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
            {vizDrilldowns[0].name}
          </div>
        </div>
      )}
    </div>
  );
}
