import React from "react";
import { Link } from "react-router-dom";
import { css } from "styled-components/macro";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { BreadcrumbModel, DrilldownModel } from "app/interfaces";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";

interface PageHeaderProps {
  title: string;
  drilldowns?: DrilldownModel[];
  breadcrumbs: BreadcrumbModel[];
}

const StyledMenu = withStyles({
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: "6px 0",
    borderBottom: "1px solid #DFE3E6",
    "& a": {
      fontSize: 12,
      color: "#262c34",
      padding: "0 12px",
      textDecoration: "none",
    },
  },
}))(MenuItem);

const styles = {
  container: css`
    left: 0;
    top: 46px;
    z-index: 1;
    width: 100vw;
    display: flex;
    position: sticky;
    background: #dfe3e6;
    padding: 6px 0 16px 0;
    flex-direction: column;
  `,
  innercontainer: css`
    display: flex;
    flex-direction: column;
  `,
  title: css`
    display: flex;
    color: #262c34;
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
    align-items: center;
    letter-spacing: 0.5px;
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
        <div css={styles.title}>{props.title}</div>
        {props.drilldowns && props.drilldowns.length > 0 && (
          <div css={styles.drilldowns}>
            {props.drilldowns.map((item: DrilldownModel) => (
              <div css={styles.drilldownitem} key={item.name}>
                {item.name} <ArrowForwardIcon />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
