/* third-party */
import React from "react";
import get from "lodash/get";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import BigLogo from "app/assets/BigLogo";
import { Search } from "app/components/Search";
import { useCMSData } from "app/hooks/useCMSData";
import { LandingDatasetGrid } from "app/modules/landing-module/components/dataset-grid";
import {
  container,
  subtitle,
  datasetstitle,
  containerCss,
} from "app/modules/landing-module/styles";

export const LandingLayout = () => {
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div css={container}>
      <div css={containerCss}>
        <BigLogo />
        <div css={subtitle}>
          {get(
            cmsData,
            "modulesLanding.subTitle",
            "Free and open access to The Global Fund Data"
          )}
        </div>
        <Search />
        {!isMobile && (
          <React.Fragment>
            <div css={datasetstitle}>
              {get(cmsData, "modulesLanding.datasetsTitle", "")}
            </div>
            <LandingDatasetGrid />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
