import React from "react";
import find from "lodash/find";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { useParams, useHistory, Link } from "react-router-dom";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
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
    border: "1px solid #d3d4d5",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background: "#231d2c",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background: "#dfe3e6",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "#231d2c",
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
    borderBottom: "1px solid #DFE3E6",
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: "#231d2c",
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
          v.link?.replace("explore", `location/${params.code}`) ===
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
            background: #dfe3e6;
            text-transform: capitalize;
            max-width: calc(50vw - 32px);
            font-family: "GothamNarrow-Bold", sans-serif;

            &:hover {
              background: #dfe3e6;
            }

            svg {
              margin-left: 10px;
              transition: all 0.2s ease-in-out;
              transform: rotate(${anchorEl ? "180" : "0"}deg);
              > path {
                fill: #231d2c;
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
          {props.tabs &&
            props.tabs.map((tab: TabProps) => (
              <StyledMenuItem disableRipple key={tab.name} disableTouchRipple>
                <RouteTab {...tab} onlyLink />
              </StyledMenuItem>
            ))}
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
                  ? "#231d2c"
                  : "#dfe3e6"};

                path {
                  fill: ${selectedView === option.value ? "#fff" : "#868A9D"};
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
                color: ${selectedView === option.value ? "#fff" : "#231d2c"};
                ${index === 0 ? "border-radius: 20px 0 0 20px;" : ""}
                ${index === controlItems.views.length - 1
                  ? "border-radius: 0 20px 20px 0;"
                  : ""}
                background: ${selectedView === option.value
                  ? "#231d2c"
                  : "#dfe3e6"};
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
