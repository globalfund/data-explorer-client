/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { appColors } from "app/theme";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TabProps } from "app/components/PageHeader/components/tabs/data";
import { PageHeaderTabs } from "app/components/PageHeader/components/tabs";
import { MobileFilterBar } from "app/components/PageHeader/components/filterbar";

interface PageHeaderProps {
  title: string;
  tabs?: TabProps[];
  isDetail?: boolean;
  partialTitle?: string;
}

const styles = {
  container: (top: number) => css`
    left: 0;
    z-index: 10;
    width: 100vw;
    top: ${top}px;
    display: flex;
    position: sticky;
    padding-top: 10px;
    background: ${appColors.PAGE_HEADER.CONTAINER_BACKGROUND_COLOR};
    flex-direction: column;

    @media (min-width: 768px) {
      height: 64px;
    }
  `,
  innercontainer: css`
    display: flex;
    position: relative;
    flex-direction: column;

    @media (min-width: 768px) {
      height: 64px;
    }
  `,
  title: (bigPadding: boolean) => css`
    width: 100%;
    color: ${appColors.PAGE_HEADER.TITLE_COLOR};
    font-size: 18px;
    overflow: hidden;
    line-height: 24px;
    align-items: center;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    padding: ${bigPadding ? "10px 0 20px 0" : "0 0 10px 0"};

    @media (max-width: 767px) {
      font-size: 18px;
      white-space: nowrap;
      padding: 0px 0 10px 0;
      text-overflow: ellipsis;
    }
  `,
};

export function PageHeader(props: PageHeaderProps) {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 1280px)");

  const isVizModule = history.location.pathname.indexOf("/viz/") > -1;
  const isGrantDetail = history.location.pathname.indexOf("/grant/") > -1;
  const isPartnerDetail = history.location.pathname.indexOf("/partner/") > -1;
  const isLocationDetail = history.location.pathname.indexOf("/location/") > -1;
  const isAboutPage = history.location.pathname.indexOf("/about") > -1;

  let titleExtraStyle = {};
  if (
    !isMobile &&
    (isGrantDetail ||
      isPartnerDetail ||
      (isLocationDetail && props.title.length > 20 && isSmallScreen))
  ) {
    titleExtraStyle = {
      fontSize: 14,
      paddingTop: 0,
      maxHeight: 42,
      lineHeight: "21px",
      overflow: "hidden",
      display: "-webkit-box",
      textOverflow: "ellipsis",
    };
  }

  return (
    <div css={styles.container(isAboutPage ? 45 : 100)}>
      <Container maxWidth="lg" css={styles.innercontainer}>
        <Grid
          container
          spacing={2}
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            > div {
              @media (min-width: 768px) {
                height: 64px;
                padding-bottom: ${isVizModule ? 8 : "0 !important"};

                &:nth-of-type(2) {
                  height: 62px;
                }
              }
            }

            @media (min-width: 768px) {
              height: 64px;
            }
          `}
        >
          <Grid
            item
            xs={12}
            sm={props.tabs && props.tabs.length > 0 && !isMobile ? 4 : 12}
            lg={props.tabs && props.tabs.length > 0 ? 5 : 12}
            xl={props.tabs && props.tabs.length > 0 ? 5 : 12}
            css={`
              ${isVizModule
                ? `
                display: flex;
                align-items: center;
                justify-content: center;
              `
                : ""}

              @media (max-width: 767px) {
                width: 100%;
              }
            `}
          >
            <div
              style={titleExtraStyle}
              css={styles.title(
                props.tabs !== undefined && props.tabs.length > 0
              )}
            >
              <b>{props.title}</b>
              {props.partialTitle && (
                <>
                  <b> - </b>
                  {props.partialTitle}
                </>
              )}
            </div>
          </Grid>
          {!isMobile && props.tabs && props.tabs.length > 0 && (
            <Grid
              item
              xs={12}
              sm={8}
              lg={7}
              xl={7}
              css={`
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;

                @media (max-width: 767px) {
                  width: 100%;
                }
              `}
            >
              {props.tabs && props.tabs.length > 0 && (
                <PageHeaderTabs tabs={props.tabs} />
              )}
            </Grid>
          )}
        </Grid>
      </Container>
      {isMobile && !isGrantDetail && <MobileFilterBar />}
    </div>
  );
}
