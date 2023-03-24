import React from "react";
import { styles } from "app/modules/report-module/components/right-panel/styles";
import { ReportRightPanelProps } from "app/modules/report-module/components/right-panel/data";

export function ReportRightPanel(props: ReportRightPanelProps) {
  return (
    <div css={styles.container}>
      {props.currentView === "initial" && (
        <section css={styles.initial}>
          No options available in this step yet. Options will automatically
          appear, don’t worry.
        </section>
      )}
    </div>
  );
}
