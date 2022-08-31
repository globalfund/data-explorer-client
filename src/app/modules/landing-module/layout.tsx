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
} from "app/modules/landing-module/styles";

export const LandingLayout = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const cmsData = useCMSData({ returnData: true });

  return (
    <div css={container}>
      <div
        css={`
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;

          @media (max-width: 600px) {
            > svg {
              width: 100%;
            }
          }
        `}
      >
        <BigLogo />
        <div css={subtitle}>{get(cmsData, "modulesLanding.subTitle", "")}</div>
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
