import React from "react";

import EmptyRowsDialog from "./emptyRowsDialog";
import UntitledReportDialog from "./untitledReportDialog";

export function AppDialogs() {
  return (
    <React.Fragment>
      <EmptyRowsDialog />
      <UntitledReportDialog />
    </React.Fragment>
  );
}
