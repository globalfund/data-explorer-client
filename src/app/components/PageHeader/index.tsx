/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useStoreState } from "app/state/store/hooks";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { BreadcrumbModel, DrilldownModel } from "app/interfaces";
import { TabProps } from "app/components/PageHeader/components/tabs/data";
import { PageHeaderTabs } from "app/components/PageHeader/components/tabs";

interface PageHeaderProps {
  title: string;
  tabs?: TabProps[];
  isGrantDetail?: boolean;
  breadcrumbs: BreadcrumbModel[];
}

const StyledMenu = withStyles({
  paper: {
    minWidth: 220,
    borderRadius: 10,
    border: "1px solid #d3d4d5",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background: "#262c34",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background: "#dfe3e6",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "#262c34",
    },
  },
  list: {
    padding: 0,
    maxHeight: 450,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: 0,
    width: "100%",
    borderBottom: "1px solid #DFE3E6",
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: "#262c34",
      padding: "6px 12px",
      textDecoration: "none",
    },
    // "& li": {
    //   width: "100%",
    //   fontSize: "14px",
    //   color: "#262c34",
    //   padding: "6px 12px",
    //   textDecoration: "none",
    // },
    // "& div": {
    //   width: "100%",
    //   fontSize: "14px",
    //   color: "#262c34",
    //   padding: "0 12px",
    //   textDecoration: "none",
    // },
  },
}))(MenuItem);

const styles = {
  container: css`
    left: 0;
    top: 48px;
    z-index: 10;
    width: 100vw;
    display: flex;
    position: sticky;
    padding-top: 6px;
    background: #dfe3e6;
    flex-direction: column;
  `,
  innercontainer: css`
    display: flex;
    position: relative;
    flex-direction: column;
  `,
  title: css`
    width: 100%;
    color: #262c34;
    font-size: 24px;
    overflow: hidden;
    font-weight: bold;
    line-height: 24px;
    align-items: center;
    white-space: nowrap;
    letter-spacing: 0.5px;
    text-overflow: ellipsis;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  `,
  breadcrumbs: css`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    @media (max-width: 767px) {
      margin-bottom: 10px;
    }
  `,
  bcitem: (linkable: boolean) => css`
    color: #262c34;
    font-size: 12px;
    margin-right: 10px;
    cursor: ${linkable ? "pointer" : "default"};
    text-decoration: ${linkable ? "underline" : "none"};
  `,
  arrowseparator: css`
    margin-right: 10px;
  `,
  drilldowns: css`
    gap: 3px;
    display: flex;
    margin-top: 16px;
    width: fit-content;
    flex-direction: row;

    @media (max-width: 767px) {
      width: 100%;
      overflow-x: auto;
    }
  `,
  drilldownitem: (index: number) => css`
    color: #fff;
    font-size: 10px;
    padding: 2px 20px;
    margin-right: 6px;
    line-height: 15px;
    position: relative;
    background: #373d43;

    &::after {
      top: 0;
      width: 0;
      height: 0;
      left: 100%;
      content: "";
      display: block;
      position: absolute;
      border-style: solid;
      border-width: 9px 0 10px 9px;
      border-color: rgba(0, 0, 0, 0) #373d43;
    }

    ${index > 0
      ? `
      &::before {
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        content: "";
        display: block;
        position: absolute;
        border-style: solid;
        border-width: 9px 0 10px 9px;
        border-color: rgba(0, 0, 0, 0) #DFE3E6;
      }
    `
      : ""}
  `,
  drilldowntext: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export function PageHeader(props: PageHeaderProps) {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (anchorEl) {
      handleClose();
    }
  }, [history.location.pathname]);

  return (
    <div css={styles.container}>
      <Container maxWidth="lg" css={styles.innercontainer}>
        <div css={styles.breadcrumbs}>
          {!isMobile && (
            <React.Fragment>
              {props.breadcrumbs.map(
                (breadcrumb: BreadcrumbModel, index: number) => {
                  if (breadcrumb.link) {
                    return (
                      <React.Fragment key={breadcrumb.name}>
                        <Link css={styles.bcitem(true)} to={breadcrumb.link}>
                          {breadcrumb.name}
                        </Link>
                        <div css={styles.arrowseparator}>{`>`}</div>
                      </React.Fragment>
                    );
                  }
                  return (
                    <React.Fragment key={breadcrumb.name}>
                      <div
                        css={styles.bcitem(breadcrumb.menuitems !== undefined)}
                        onClick={breadcrumb.menuitems ? handleClick : undefined}
                      >
                        {breadcrumb.name}
                      </div>
                      {breadcrumb.menuitems && (
                        <StyledMenu
                          keepMounted
                          anchorEl={anchorEl}
                          id="breadcrumb-menu"
                          onClose={handleClose}
                          open={Boolean(anchorEl)}
                        >
                          {breadcrumb.menuitems.map(
                            (item: React.ReactChild, itemIndex: number) => (
                              <StyledMenuItem
                                disableRipple
                                key={itemIndex}
                                disableTouchRipple
                              >
                                {item}
                              </StyledMenuItem>
                            )
                          )}
                        </StyledMenu>
                      )}
                      {index !== props.breadcrumbs.length - 1 && (
                        <div css={styles.arrowseparator}>{`>`}</div>
                      )}
                    </React.Fragment>
                  );
                }
              )}
            </React.Fragment>
          )}
        </div>
        <Grid
          container
          spacing={2}
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <Grid
            item
            sm={12}
            md={!props.isGrantDetail ? 4 : 12}
            css={`
              @media (max-width: 767px) {
                width: 100%;
              }
            `}
          >
            <Tooltip title={props.title}>
              <div
                css={styles.title}
                style={props.isGrantDetail ? { fontSize: 14 } : {}}
              >
                {props.title}
              </div>
            </Tooltip>
            {vizDrilldowns.length > 0 && (
              <div css={styles.drilldowns}>
                {vizDrilldowns.map((item: DrilldownModel, index: number) => (
                  <div css={styles.drilldownitem(index)} key={item.name}>
                    <div css={styles.drilldowntext}>{item.name}</div>
                  </div>
                ))}
              </div>
            )}
            {!props.isGrantDetail && (
              <div
                css={`
                  width: 100%;
                  height: 16px;
                `}
              />
            )}
          </Grid>
          {!isMobile && (
            <Grid
              item
              sm={12}
              md={!props.isGrantDetail ? 8 : 12}
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
      {isMobile && (
        <div
          css={`
            width: 100vw;
            padding: 16px 20px;
            background: #495057;

            > span {
              color: #fff;
              font-size: 12px;
            }
          `}
        >
          <span>Your selections</span>
        </div>
      )}
    </div>
  );
}
