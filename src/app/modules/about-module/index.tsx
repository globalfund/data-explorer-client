import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import { useMediaQuery } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
import LinkList from "app/modules/about-module/links";
import { PageHeader } from "app/components/PageHeader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";

export default function About() {
  const cmsData = useCMSData({ returnData: true });

  useTitle(get(cmsData, "modulesAbout.title", ""));

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_2;
  }, []);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const deContent = { __html: get(cmsData, "modulesAbout.deContent", "") };
  const crContent = { __html: get(cmsData, "modulesAbout.crContent", "") };
  const diContent = { __html: get(cmsData, "modulesAbout.diContent", "") };
  const doContent = { __html: get(cmsData, "modulesAbout.doContent", "") };

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      {!isMobile && (
        <PageHeader
          title={get(cmsData, "modulesAbout.titleShort", "")}
          breadcrumbs={[
            {
              name: get(cmsData, "modulesAbout.breadcrumbHome", ""),
              link: "/",
            },
            {
              name: get(cmsData, "modulesAbout.titleShort", ""),
            },
          ]}
        />
      )}
      <PageTopSpacer />
      <Grid container spacing={!isSmallScreen ? 6 : undefined}>
        {!isSmallScreen && (
          <Grid item md={3}>
            <LinkList />
          </Grid>
        )}
        <Grid
          item
          sm={12}
          md={9}
          css={`
            > div {
              margin-bottom: 50px;

              > div {
                font-size: 24px;
                font-weight: bold;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              }
              > p {
                > a {
                  color: ${appColors.ABOUT_PAGE.LINK_COLOR};
                }
              }
            }
          `}
        >
          <div>
            <div>{get(cmsData, "modulesAbout.deTitle", "")}</div>
            <p>
              <div dangerouslySetInnerHTML={deContent} />
            </p>
          </div>
          <div>
            <div>{get(cmsData, "modulesAbout.gfTitle", "")}</div>
            <p>{get(cmsData, "modulesAbout.gfContent", "")}</p>
          </div>
          <div>
            <div>{get(cmsData, "modulesAbout.crTitle", "")}</div>
            <p>
              <div dangerouslySetInnerHTML={crContent} />
            </p>
          </div>
          <div>
            <div>{get(cmsData, "modulesAbout.diTitle", "")}</div>
            <p>
              <div dangerouslySetInnerHTML={diContent} />
            </p>
          </div>
          <div>
            <div>{get(cmsData, "modulesAbout.doTitle", "")}</div>
            <p>
              <div dangerouslySetInnerHTML={doContent} />
            </p>
          </div>
        </Grid>
        {isSmallScreen && (
          <Grid item xs={6} sm={6}>
            <LinkList />
          </Grid>
        )}
      </Grid>
      <div
        css={`
          width: 100%;
          height: 0px;

          @media (max-width: 767px) {
            height: 90px;
          }
        `}
      />
    </div>
  );
}
