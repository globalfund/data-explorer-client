import React from "react";
import { Link } from "react-router-dom";
import BigLogo from "app/assets/BigLogo";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { Search } from "app/components/Search";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
              <Link
                to="/data-themes/new"
                css={`
                  margin-left: 10px;
                `}
              >
                Data Themes
              </Link>
              <Link
                to="/data-themes/627e445fe90a65fd4915b2e0"
                css={`
                  margin-left: 10px;
                `}
              >
                Existing Data Theme
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
