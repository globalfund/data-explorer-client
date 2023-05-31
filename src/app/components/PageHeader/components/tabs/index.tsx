import React from "react";
import find from "lodash/find";
import filter from "lodash/filter";
import { css } from "styled-components/macro";
import { appColors, ProjectPalette } from "app/theme";
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
      background: ${appColors.TABS.SCROLLBAR_BACKGROUND_COLOR};
    }
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background: ${appColors.TABS.SCROLLBAR_TRACK_BACKGROUND_COLOR};
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: ${appColors.TABS.SCROLLBAR_THUMB_BACKGROUND_COLOR};
    }
  `,
  tabcss: (active?: boolean) => css`
    height: 35px;
    display: flex;
    margin-right: 1px;
    align-items: center;
    transition: background 0.2s ease-in-out;
    background: ${active
      ? appColors.TABS.ITEM_BACKGROUND_ACTIVE_COLOR
      : appColors.TABS.ITEM_BACKGROUND_COLOR};

    :first-of-type {
      border-radius: 15px 0px 0px 0px;
    }

    :last-of-type {
      border-right-style: none;
      border-radius: 0px 15px 0px 0px;
    }

    :first-of-type:last-of-type {
      border-radius: 15px 15px 0px 0px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: ${appColors.TABS.ITEM_BACKGROUND_HOVER_COLOR};
        a,
        div {
          color: ${appColors.TABS.LINK_ACTIVE_COLOR};
          cursor: pointer;
          text-shadow: 0 0 0.9px ${appColors.TABS.LINK_ACTIVE_COLOR},
            0 0 0.9px ${appColors.TABS.LINK_ACTIVE_COLOR},
            0 0 0.9px ${appColors.TABS.LINK_ACTIVE_COLOR};
        }
      }
    }

    a,
    div {
      font-size: 14px;
      padding: 10px 15px;
      white-space: nowrap;
      text-decoration: none;
      color: ${active
        ? appColors.TABS.LINK_ACTIVE_COLOR
        : appColors.TABS.LINK_COLOR};
      text-shadow: ${active
        ? `0 0 0.9px ${appColors.TABS.LINK_ACTIVE_COLOR}, 0 0 0.9px ${appColors.TABS.LINK_ACTIVE_COLOR}, 0 0 0.9px ${appColors.TABS.LINK_ACTIVE_COLOR}`
        : "none"};
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
  if (props.onlyLink && props.params) {
    return (
      <NavLink
        to={
          formatTabUrlWithParams(
            {
              name: props.name,
              url: props.url,
              tabs: props.tabs,
              index: props.index,
              isActive: props.isActive,
            },
            props.search,
            props.params
          ).url ?? ""
        }
      >
        {props.name}
      </NavLink>
    );
  }

  return (
    <li css={styles.tabcss(props.isActive)}>
      <NavLink to={props.url || ""}>{props.name}</NavLink>
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
): TabProps {
  const tabs = tab.tabs?.map((t: TabProps) =>
    formatTabUrlWithParams(t, search, params)
  );
  const link = `${(tab.url || "")
    .replace("<code>", params.code)
    .replace("<period>", params.period)}${search}`;
  const urlsplits = (tab.url || "").split("/");
  let index = params.period ? 4 : 3;
  let indexParam: "vizType" | "tab" = "vizType";
  if (urlsplits[1] === "results") {
    index = 2;
    indexParam = "tab";
  }
  const isActive =
    urlsplits[index] === params[indexParam] ||
    Boolean(find(tabs || [], { isActive: true }));

  return {
    ...tab,
    url: link,
    isActive,
    tabs,
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

  React.useEffect(() => {
    setTabsWithParams(
      props.tabs.map((tab: TabProps) =>
        formatTabUrlWithParams(tab, location.search, params)
      )
    );
  }, [props.tabs, location.search, params]);

  return (
    <div css={styles.container(location.pathname)}>
      <ul css={styles.tabsList}>
        {tabsWithParams.map((tab: TabProps) =>
          tab.tabs ? (
            <PageHeaderTabWDropdown key={tab.name} {...tab} />
          ) : (
            <RouteTab key={tab.name} {...tab} />
          )
        )}
      </ul>
    </div>
  );
}

function PageHeaderTabWDropdown(props: TabProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <li
        css={styles.tabcss(Boolean(anchorEl) || props.isActive)}
        onClick={handleClick}
      >
        <div>
          {props.name} <KeyboardArrowDownIcon />
        </div>
      </li>
      <StyledMenu
        keepMounted
        disableScrollLock
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
        {(filter(props.tabs || [], (t: TabProps) => t.url) as TabProps[]).map(
          (tab: TabProps) => (
            <StyledMenuItem
              disableRipple
              key={tab.name}
              disableTouchRipple
              css={`
                border-bottom-style: none;

                > a {
                  background: ${appColors.TABS.ITEM_BACKGROUND_COLOR};

                  ${tab.isActive &&
                  `
                  color: ${appColors.TABS.LINK_ACTIVE_COLOR};
                  font-weight: bold;
                  background: ${appColors.TABS.ITEM_BACKGROUND_ACTIVE_COLOR};
                  transition: background 0.2s ease-in-out;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue",
                    sans-serif;
                  `}

                  @media (min-width: 768px) {
                    &:hover {
                      color: ${appColors.TABS.LINK_HOVER_COLOR};
                      font-weight: bold;
                      background: ${appColors.TABS.ITEM_BACKGROUND_HOVER_COLOR};
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
          )
        )}
      </StyledMenu>
    </React.Fragment>
  );
}
