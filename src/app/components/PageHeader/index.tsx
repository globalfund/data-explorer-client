import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { BreadcrumbModel, DrilldownModel } from "app/interfaces";
import { TabProps } from "app/components/PageHeader/components/tabs/data";
import { PageHeaderTabs } from "app/components/PageHeader/components/tabs";

interface PageHeaderProps {
  title: string;
  tabs?: TabProps[];
  drilldowns?: DrilldownModel[];
  breadcrumbs: BreadcrumbModel[];
}

export const StyledMenu = withStyles({
  paper: {
    borderRadius: 10,
    border: "1px solid #d3d4d5",
  },
  list: {
    padding: 0,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: "6px 0",
    borderBottom: "1px solid #DFE3E6",
    "& a": {
      width: "100%",
      fontSize: "12px",
      color: "#262c34",
      padding: "0 12px",
      textDecoration: "none",
    },
    "& div": {
      width: "100%",
      fontSize: "12px",
      color: "#262c34",
      padding: "0 12px",
      textDecoration: "none",
    },
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
    font-family: GothamNarrow-Bold;
  `,
  breadcrumbs: css`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
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
    display: flex;
    margin-top: 25px;
    width: fit-content;
    flex-direction: row;
    background: #373d43;
  `,
  drilldownitem: css`
    color: #fff;
    font-size: 10px;
    padding: 2px 20px;
    margin-right: 6px;
    line-height: 15px;

    position: relative;

    > svg {
      top: 0;
      right: -13px;
      position: absolute;
      transform: scale(1.5);

      > path {
        fill: #dfe3e6;
      }
    }

    &:last-of-type {
      > svg {
        right: -7px;
        transform: scale(2.6);
      }
    }
  `,
};

export function PageHeader(props: PageHeaderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div css={styles.container}>
      <Container maxWidth="lg" css={styles.innercontainer}>
        <div css={styles.breadcrumbs}>
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
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {breadcrumb.menuitems.map(
                        (item: React.ReactChild, index: number) => (
                          <StyledMenuItem key={index}>{item}</StyledMenuItem>
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
          <Grid item sm={12} md={4}>
            <Tooltip title={props.title}>
              <div css={styles.title}>{props.title}</div>
            </Tooltip>
            {props.drilldowns && props.drilldowns.length > 0 && (
              <div css={styles.drilldowns}>
                {props.drilldowns.map((item: DrilldownModel) => (
                  <div css={styles.drilldownitem} key={item.name}>
                    {item.name} <ArrowForwardIcon />
                  </div>
                ))}
              </div>
            )}
            <div
              css={`
                width: 100%;
                height: 16px;
              `}
            />
          </Grid>
          <Grid
            item
            sm={12}
            md={8}
            css={`
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
            `}
          >
            {props.tabs && props.tabs.length > 0 && (
              <PageHeaderTabs tabs={props.tabs} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
