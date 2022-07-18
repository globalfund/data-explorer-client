import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import BigLogo from "app/assets/BigLogo";
import { Search } from "app/components/Search";
import { useCMSData } from "app/hooks/useCMSData";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { DatasetCarousel } from "app/components/DatasetCarousel";
import { ThemesCarousel } from "app/modules/landing-module/components/ThemeCarousel";
import {
  container,
  subtitle,
  datasetslink,
  activeContainerCss,
  activeThemeCss,
  alignments,
  containerCss,
} from "app/modules/landing-module/styles";

export const LandingLayout = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const cmsData = useCMSData({ returnData: true });
  const [alignment, setAlignment] = React.useState("Themes");

  const handleChange = (newAlignment: string) => setAlignment(newAlignment);

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
            <Box css={activeContainerCss}>
              <div
                css={`
                  border-radius: 20px 0px 0px 20px;
                  ${alignments}
                  ${alignment === "Themes" && activeThemeCss}
                `}
                onClick={() => handleChange("Themes")}
              >
                Themes
              </div>

              <div
                onClick={() => handleChange("Datasets")}
                css={`
                  border-radius: 0px 20px 20px 0px;
                  ${alignments}
                  ${alignment === "Datasets" && activeThemeCss}
                `}
              >
                Datasets
              </div>
            </Box>
            {alignment === "Datasets" ? (
              <DatasetCarousel />
            ) : (
              <ThemesCarousel />
            )}
            <div css={datasetslink}>
              {/* <Link to="/datasets">
                {get(cmsData, "modulesLanding.datasetsLink", "")}
              </Link> */}

              <Link
                to={alignment === "Themes" ? "/data-themes" : "/datasets"}
                css={"margin-left: 10px;"}
              >
                View all
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
