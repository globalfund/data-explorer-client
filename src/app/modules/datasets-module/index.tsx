/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { PageHeader } from "app/components/PageHeader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { LandingDatasetGrid } from "app/modules/landing-module/components/dataset-grid";
import {
  dataSetsCss,
  datasetsBottomCss,
} from "app/modules/datasets-module/style";

export default function Datasets() {
  const cmsData = useCMSData({ returnData: true });
  useTitle(get(cmsData, "modulesDatasets.title", ""));
  const isMobile = useMediaQuery("(max-width: 767px)");

  React.useEffect(() => {
    document.body.style.background = "#DFE3E5";
  }, []);

  return (
    <div css={dataSetsCss}>
      {!isMobile && (
        <PageHeader
          title={get(cmsData, "modulesDatasets.titleShort", "")}
          breadcrumbs={[
            { name: get(cmsData, "modulesDatasets.home", ""), link: "/" },
            {
              name: get(cmsData, "modulesDatasets.titleShort", ""),
            },
          ]}
        />
      )}
      <PageTopSpacer />
      <LandingDatasetGrid />
      <div css={datasetsBottomCss} />
    </div>
  );
}
