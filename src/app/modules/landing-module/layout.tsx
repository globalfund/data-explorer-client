/* third-party */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import BigLogo from "app/assets/BigLogo";
import { Search } from "app/components/Search";
import { useCMSData } from "app/hooks/useCMSData";
import { DatasetCarousel } from "app/components/DatasetCarousel";
import {
  container,
  subtitle,
  datasetstitle,
  datasetslink,
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
            <DatasetCarousel />
            <div css={datasetslink}>
              <Link to="/datasets">
                {get(cmsData, "modulesLanding.datasetsLink", "")}
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
