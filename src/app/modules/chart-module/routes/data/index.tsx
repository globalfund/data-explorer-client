/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ReactComponent as LogoIcon } from "app/modules/report-module/asset/logo.svg";

export function ChartModuleDataView() {
  useTitle("DX DataXplorer - Select Data");

  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Data View component is rendered, we are at step 1.
    setActivePanels(1);
  }, []);

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
      <div
        css={`
          height: 209px;
        `}
      />
      <div
        css={`
          width: 100%;
          height: 362px;
          font-family: "Gotham Narrow", sans-serif;
          text-align: center;
          line-height: normal;
          font-size: 14px;
          p {
            margin: 0;
          }
        `}
      >
        <LogoIcon />
        <div
          css={`
            height: 42px;
          `}
        />
        <p>Start building your interactive chart</p>
        <p>
          Please start by <b>selecting a dataset</b> in the right hand side
          panel
        </p>
      </div>
    </div>
  );
}
