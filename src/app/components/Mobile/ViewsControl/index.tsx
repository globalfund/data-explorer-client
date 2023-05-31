import React from "react";
import find from "lodash/find";
import { appColors } from "app/theme";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { RouteTab } from "app/components/PageHeader/components/tabs";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { TabProps } from "app/components/PageHeader/components/tabs/data";
import { getChartIcon } from "app/components/ToolBoxPanel/utils/getChartIcon";
import {
  ViewModel,
  getControlItems,
} from "app/components/ToolBoxPanel/utils/getControlItems";

interface MobileViewControlProps {
  tabs?: TabProps[];
}

const StyledMenu = withStyles({
  paper: {
    minWidth: 220,
    borderRadius: 10,
    border: `1px solid ${appColors.MOBILE_VIEWS_CONTROL.MENU_PAPER_BORDER_COLOR}`,
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background:
        appColors.MOBILE_VIEWS_CONTROL.MENU_SCROLLBAR_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background:
        appColors.MOBILE_VIEWS_CONTROL.MENU_SCROLLBAR_TRACK_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background:
        appColors.MOBILE_VIEWS_CONTROL.MENU_SCROLLBAR_THUMB_BACKGROUND_COLOR,
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

export const StyledMenuItem = withStyles(() => ({
  root: {
    padding: 0,
    minHeight: 0,
    width: "100%",
    borderBottom: `1px solid ${appColors.MOBILE_VIEWS_CONTROL.MENU_ITEM_BORDER_COLOR}`,
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: appColors.MOBILE_VIEWS_CONTROL.MENU_ITEM_COLOR,
      padding: "10px 12px",
      textDecoration: "none",
    },
  },
}))(MenuItem);

export function MobileViewControl(props: MobileViewControlProps) {
  const history = useHistory();
  const params = useParams<{
    code?: string;
    period?: string;
    vizType: string;
    subType?: string;
  }>();
  const datasetMenuItems = useDatasetMenuItems();
  const [selectedView, setSelectedView] = React.useState("");
  const [controlItems, setControlItems] = React.useState<{
    views: ViewModel[];
    aggregates: ViewModel[];
  }>(
    getControlItems(
      params.vizType,
      params.subType,
      history.location.pathname,
      params.code,
      params.period
    )
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function getSelectedView() {
    let view: ViewModel | undefined;
    if (params.code) {
      view = find(
        controlItems.views,
        (v: ViewModel) =>
          v.link?.replace("viz", `location/${params.code}`) ===
          history.location.pathname
      );
    } else {
      view = find(controlItems.views, { link: history.location.pathname });
    }
    if (view) {
      return view.value;
    }
    return "";
  }

  React.useEffect(
    () =>
      setControlItems(
        getControlItems(
          params.vizType,
          params.subType,
          history.location.pathname,
          params.code,
          params.period
        )
      ),
    [params.vizType]
  );

  React.useEffect(
    () => setSelectedView(getSelectedView()),
    [controlItems.views, history.location.pathname]
  );

  React.useEffect(() => {
    if (anchorEl) {
      handleClose();
    }
  }, [history.location.pathname]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      css={`
        z-index: 3;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div>
        <Button
          disableTouchRipple
          onClick={handleClick}
          css={`
            font-size: 14px;
            font-weight: bold;
            padding: 6px 16px;
            border-radius: 20px;
            text-transform: capitalize;
            max-width: calc(50vw - 32px);
            font-family: "GothamNarrow-Bold", sans-serif;
            background: ${appColors.MOBILE_VIEWS_CONTROL
              .BUTTON_BACKGROUND_COLOR};

            &:hover {
              background: ${appColors.MOBILE_VIEWS_CONTROL
                .BUTTON_BACKGROUND_HOVER_COLOR};
            }

            svg {
              margin-left: 10px;
              transition: all 0.2s ease-in-out;
              transform: rotate(${anchorEl ? "180" : "0"}deg);
              > path {
                fill: ${appColors.COMMON.SECONDARY_COLOR_7};
              }
            }
          `}
        >
          <span
            css={`
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {params.vizType.replace("-", " & ")}
          </span>{" "}
          <KeyboardArrowDownIcon />
        </Button>
        <StyledMenu
          keepMounted
          disableScrollLock
          anchorEl={anchorEl}
          id="breadcrumb-menu"
          onClose={handleClose}
          open={Boolean(anchorEl)}
        >
          {!props.tabs &&
            datasetMenuItems.map(
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
          {(props.tabs ?? []).map((tab: TabProps) => {
            if (tab.tabs) {
              const result = tab.tabs.map((subTab: TabProps) => (
                <StyledMenuItem
                  disableRipple
                  key={subTab.name}
                  disableTouchRipple
                >
                  <RouteTab
                    {...subTab}
                    onlyLink
                    search={location.search}
                    params={{
                      tab: "",
                      code: params.code ?? "",
                      period: params.period ?? "",
                      vizType: params.vizType ?? "",
                    }}
                  />
                </StyledMenuItem>
              ));
              return [...result];
            }
            return (
              <StyledMenuItem disableRipple key={tab.name} disableTouchRipple>
                <RouteTab
                  {...tab}
                  onlyLink
                  search={location.search}
                  params={{
                    tab: "",
                    code: params.code ?? "",
                    period: params.period ?? "",
                    vizType: params.vizType ?? "",
                  }}
                />
              </StyledMenuItem>
            );
          })}
        </StyledMenu>
      </div>
      <div
        css={`
          display: flex;
          flex-direction: row;
        `}
      >
        {controlItems.views.map((option: ViewModel, index: number) =>
          option.link ? (
            <Link
              key={option.value}
              onClick={() => setSelectedView(option.value)}
              to={`${option.link}${history.location.search}`}
              css={`
                display: flex;
                padding: 7px 9px;
                flex-direction: row;
                align-items: center;
                text-decoration: none;
                ${index === 0 ? "border-radius: 20px 0 0 20px;" : ""}
                ${index === controlItems.views.length - 1
                  ? "border-radius: 0 20px 20px 0;"
                  : ""}
                background: ${selectedView === option.value
                  ? appColors.MOBILE_VIEWS_CONTROL
                      .LINK_BACKGROUND_SELECTED_COLOR
                  : appColors.MOBILE_VIEWS_CONTROL.LINK_BACKGROUND_COLOR};

                path {
                  fill: ${selectedView === option.value
                    ? appColors.MOBILE_VIEWS_CONTROL.LINK_ICON_SELECTED_COLOR
                    : appColors.MOBILE_VIEWS_CONTROL.LINK_ICON_COLOR};
                }
              `}
            >
              {getChartIcon(option)}
            </Link>
          ) : (
            <button
              type="button"
              key={option.value}
              onClick={() => setSelectedView(option.value)}
              css={`
                display: flex;
                font-size: 12px;
                border-width: 0;
                padding: 7px 9px;
                line-height: 24px;
                padding: 8px 12px;
                flex-direction: row;
                border-radius: 20px;
                align-items: center;
                color: ${selectedView === option.value
                  ? appColors.MOBILE_VIEWS_CONTROL.BUTTON_SELECTED_COLOR
                  : appColors.MOBILE_VIEWS_CONTROL.BUTTON_COLOR};
                ${index === 0 ? "border-radius: 20px 0 0 20px;" : ""}
                ${index === controlItems.views.length - 1
                  ? "border-radius: 0 20px 20px 0;"
                  : ""}
                background: ${selectedView === option.value
                  ? appColors.MOBILE_VIEWS_CONTROL
                      .BUTTON_BACKGROUND_SELECTED_COLOR
                  : appColors.MOBILE_VIEWS_CONTROL.BUTTON_BACKGROUND_COLOR};
              `}
            >
              {option.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
