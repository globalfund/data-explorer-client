/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import get from "lodash/get";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useCMSData } from "app/hooks/useCMSData";
import { DatasetItemModel, datasets } from "app/modules/datasets-module/data";
import {
  datasetsBottomCss,
  dataSetsCss,
  dataSetsGridCss,
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
      <Grid container spacing={2}>
        {datasets.map((dataset: DatasetItemModel) => (
          <Grid item xs={12} sm={6} md={6} key={dataset.link}>
            <Link to={dataset.link} css="text-decoration: none;">
              <div css={dataSetsGridCss}>
                <div>
                  {dataset.group} {dataset.name.length > 0 ? "·" : ""}{" "}
                  {dataset.name}
                </div>
                {dataset.preview}
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div css={datasetsBottomCss} />
    </div>
  );
}
