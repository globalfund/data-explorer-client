import React from "react";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { styles } from "app/modules/report-module/components/right-panel/styles";
import { ReportRightPanelProps } from "app/modules/report-module/components/right-panel/data";
import { ReportRightPanelCreateView } from "app/modules/report-module/components/right-panel-create-view";

export function ReportRightPanel(props: ReportRightPanelProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Slide direction="left" in={props.open} style={{ visibility: "visible" }}>
      <div css={styles.container}>
        {!isMobile && (
          <div
            role="button"
            tabIndex={-1}
            css={`
              top: calc((100% - 98px) / 2);

              left: -16px;
              color: #fff;
              width: 16px;
              height: 133px;
              display: flex;
              cursor: pointer;
              position: absolute;
              background: #231d2c;
              align-items: center;
              flex-direction: column;
              justify-content: center;
              border-radius: 10px 0px 0px 10px;
              transition: background 0.2s ease-in-out;
              /* z-index: 2; */

              &:hover {
                background: #13183f;
              }

              > svg {
                transform: rotate(${!props.open ? "-" : ""}90deg);
                > path {
                  fill: #fff;
                }
              }
            `}
            onClick={() => {
              if (props.open) {
                props.onClose();
              } else {
                props.onOpen();
              }
            }}
          >
            <TriangleXSIcon />
          </div>
        )}
        {props.currentView === "initial" && (
          <section css={styles.initial}>
            No options available in this step yet. Options will automatically
            appear, don’t worry.
          </section>
        )}
        {(props.currentView === "create" || props.currentView === "edit") && (
          <ReportRightPanelCreateView
            showHeaderItem={props.showHeaderItem}
            pickedCharts={props.pickedCharts}
            setPickedCharts={props.setPickedCharts}
            headerDetails={props.headerDetails}
            setHeaderDetails={props.setHeaderDetails}
            appliedHeaderDetails={props.appliedHeaderDetails}
            setAppliedHeaderDetails={props.setAppliedHeaderDetails}
            framesArray={props.framesArray}
            reportName={props.reportName}
          />
        )}
      </div>
    </Slide>
  );
}
