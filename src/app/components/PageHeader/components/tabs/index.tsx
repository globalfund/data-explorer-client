import React from "react";
import find from "lodash/find";
import remove from "lodash/remove";
import { ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { StyledMenu, StyledMenuItem } from "app/components/AppBar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  TabProps,
  RouteTabProps,
  PageHeaderTabProps,
} from "app/components/PageHeader/components/tabs/data";

const styles = {
  container: (pathname: string) => css`
    z-index: 1;
    display: flex;
    justify-content: flex-end;

    ${pathname.indexOf("/partner") > -1
      ? `
    @media (max-width: 500px) {
      width: 100%;
    }
    `
      : "width: 100%;"}
  `,
  tooltip: css`
    fill: ${ProjectPalette.primary.main};
    :hover {
      fill: ${ProjectPalette.primary.light};
    }
  `,
  titleContainer: css`
    display: flex;
    margin-top: 3px;
    margin-bottom: 16px;
  `,
  title: css`
    margin-right: 12px;
  `,
  tabsList: css`
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    overflow-y: hidden;

    @media (max-width: 992px) {
      overflow-x: auto;
    }

    @media (max-width: 767px) {
      margin-left: 0;
    }

    &::-webkit-scrollbar {
      width: 1px;
      height: 3px;
      background: #ededf6;
    }
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background: #ededf6;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #2e4063;
    }
  `,
  tabcss: (active?: boolean) => css`
    height: 35px;
    display: flex;
    margin-right: 1px;
    align-items: center;
    transition: background 0.2s ease-in-out;
    background: ${active ? "#231d2c" : "#e4e4e4"};

    :first-of-type {
      border-radius: 15px 0px 0px 0px;
    }

    :last-of-type {
      border-right-style: none;
      border-radius: 0px 15px 0px 0px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #231d2c;

        a,
        div {
          color: #fff;
          cursor: pointer;
        }
      }
    }

    a,
    div {
      font-size: 14px;
      padding: 10px 15px;
      white-space: nowrap;
      text-decoration: none;
      color: ${active ? "#fff" : "#231d2c"};
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `,
};

export function RouteTab(props: RouteTabProps) {
  if (props.onlyLink) {
    return <NavLink to={props.url}>{props.name}</NavLink>;
  }

  return (
    <li css={styles.tabcss(props.isActive)}>
      <NavLink to={props.url}>{props.name}</NavLink>
    </li>
  );
}

function formatTabUrlWithParams(
  tab: TabProps,
  search: any,
  params: {
    tab: string;
    code: string;
    period: string;
    vizType: string;
  }
) {
  let isActive = false;
  const link = `${tab.url
    .replace("<code>", params.code)
    .replace("<period>", params.period)}${search}`;
  const urlsplits = tab.url.split("/");
  let index = params.period ? 4 : 3;
  let indexParam: "vizType" | "tab" = "vizType";
  if (urlsplits[1] === "results") {
    index = 2;
    indexParam = "tab";
  }
  isActive = urlsplits[index] === params[indexParam];

  if (urlsplits[1] === "explore") {
    isActive = urlsplits[2] === params.vizType;
  }

  return {
    ...tab,
    url: link,
    isActive,
  };
}

export function PageHeaderTabs(props: PageHeaderTabProps) {
  const location = useLocation();
  const params = useParams<{
    tab: string;
    code: string;
    period: string;
    vizType: string;
  }>();
  const [tabsWithParams, setTabsWithParams] = React.useState(
    props.tabs.map((tab: TabProps) =>
      formatTabUrlWithParams(tab, location.search, params)
    )
  );
  const [shownTabs, setShownTabs] = React.useState(tabsWithParams.slice(0, 5));
  const [moreTabs, setMoreTabs] = React.useState(tabsWithParams.slice(5));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
    setTabsWithParams(
      props.tabs.map((tab: TabProps) =>
        formatTabUrlWithParams(tab, location.search, params)
      )
    );
  }, [props.tabs, location.search, params]);

  React.useEffect(() => {
    const updShownTabs = tabsWithParams.slice(0, 5);
    const updMoreTabs = tabsWithParams.slice(5);

    const fMoreTabToMove = find(updMoreTabs, { url: location.pathname });
    if (fMoreTabToMove) {
      const shownTabToMove = updShownTabs.pop();
      remove(updMoreTabs, { url: location.pathname });
      updShownTabs.push(fMoreTabToMove);
      if (shownTabToMove) {
        updMoreTabs.unshift(shownTabToMove);
      }
    }

    setShownTabs(updShownTabs);
    setMoreTabs(updMoreTabs);
  }, [location.pathname, tabsWithParams]);

  return (
    <div css={styles.container(location.pathname)}>
      <ul css={styles.tabsList}>
        {shownTabs.map((tab: TabProps) => (
          <RouteTab key={tab.name} {...tab} />
        ))}
        {moreTabs.length > 0 && (
          <li css={styles.tabcss(Boolean(anchorEl))} onClick={handleClick}>
            <div>
              More <KeyboardArrowDownIcon />
            </div>
          </li>
        )}
      </ul>
      {moreTabs.length > 0 && (
        <StyledMenu
          keepMounted
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          css={`
            && {
              .MuiMenu-paper {
                min-width: 120px;
              }
            }
          `}
          id="page-header-more-tabs"
        >
          {moreTabs.map((tab: TabProps) => (
            <StyledMenuItem
              disableRipple
              key={tab.name}
              disableTouchRipple
              css={`
                border-bottom-style: none;

                > a {
                  font-weight: 500;
                  background: #e4e4e4;

                  @media (min-width: 768px) {
                    &:hover {
                      color: #fff;
                      font-weight: bold;
                      background: #262c34;
                      transition: background 0.2s ease-in-out;
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    }
                  }
                }
              `}
            >
              <RouteTab key={tab.name} onlyLink {...tab} />
            </StyledMenuItem>
          ))}
        </StyledMenu>
      )}
    </div>
  );
}
