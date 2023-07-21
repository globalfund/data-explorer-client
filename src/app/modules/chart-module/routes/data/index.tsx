/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import ChartPlaceholder from "../../components/placeholder";

export function ChartModuleDataView() {
  useTitle("DX DataXplorer - Select Data");

  return (
    <div css={commonStyles.innercontainer}>
      <div
        id="extra-loader"
        css={`
          display: none;
        `}
      >
        <PageLoader />
      </div>
      <ChartPlaceholder />
    </div>
  );
}
