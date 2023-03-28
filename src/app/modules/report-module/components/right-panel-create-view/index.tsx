import React from "react";
import moment from "moment";
import MuiButton from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import RemoveIcon from "@material-ui/icons/Remove";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { SearchIcon } from "app/assets/icons/Search";

const Button = withStyles(() => ({
  root: {
    width: "50%",
    height: "52px",
    fontWeight: 700,
    fontSize: "14px",
    borderRadius: "0px",
    backgroundColor: "#C7CDD1",
    fontFamily: "Inter, sans-serif",
    "&:first-child": {
      borderRight: "1px solid #f1f3f5",
    },
    "&:hover": {
      backgroundColor: "#70777E",
    },
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Inter, sans-serif",
  },
}))(MuiButton);

export const StyledMenu = withStyles({
  paper: {
    width: 159,
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(152, 161, 170, 0.6)",
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
    maxHeight: 500,
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
    width: "100%",
    fontSize: "14px",
    color: "#231d2c",
    padding: "10px 12px",
    borderBottom: "1px solid #DFE3E6",
  },
}))(MenuItem);

export function ReportRightPanelCreateView() {
  const [currentView, setCurrentView] = React.useState<"elements" | "charts">(
    "elements"
  );

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          width: 100%;
          display: flex;
          flex-direction: row;
        `}
      >
        <Button
          onClick={() => setCurrentView("elements")}
          css={`
            ${currentView === "elements" && "background-color: #70777E;"}
          `}
        >
          Layout elements
        </Button>
        <Button
          onClick={() => setCurrentView("charts")}
          css={`
            ${currentView === "charts" && "background-color: #70777E;"}
          `}
        >
          Charts
        </Button>
      </div>
      {currentView === "elements" && (
        <div
          css={`
            width: 100%;
            display: flex;
            user-select: none;
            flex-direction: column;

            > div {
              width: 100%;
              cursor: grab;
              height: 55px;
              display: flex;
              padding: 0 25px;
              align-items: center;
              background-color: #f2f7fd;
              border-bottom: 1px solid #cfd4da;

              > svg {
                margin-right: 25px;
              }
            }
          `}
        >
          <div>
            <ArrowRightAltIcon />
            Row frame
          </div>
          <div>
            <TextFieldsIcon />
            Text
          </div>
          <div>
            <RemoveIcon />
            Divider
          </div>
        </div>
      )}
      {currentView === "charts" && <ReportRightPanelCreateViewChartList />}
    </div>
  );
}

const sortByOptions = [
  { value: "date", label: "Recent" },
  { value: "name", label: "Name" },
];

function ReportRightPanelCreateViewChartList() {
  const [sortBy, setSortBy] = React.useState(sortByOptions[0]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const chartList = useStoreState(
    (state) => (state.charts.ChartGetList.crudData || []) as any[]
  );
  const loadChartList = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    loadChartList({
      storeInCrudData: true,
    });
  }, []);

  return (
    <React.Fragment>
      <div
        css={`
          width: 100%;
          display: flex;
          padding: 12px;
          position: relative;
          flex-direction: row;
          border-bottom: 1px solid #cfd4da;

          > svg {
            top: 17px;
            right: 200px;
            position: absolute;
          }
        `}
      >
        <input
          type="text"
          css={`
            width: 200px;
            height: 35px;
            border-style: none;
            background: #dfe3e6;
            border-radius: 24px;
            padding: 0 45px 0 10px;
          `}
        />
        <SearchIcon />
        <Button
          disableTouchRipple
          onClick={handleClick}
          css={`
            width: 159px;
            height: 35px;
            margin-left: 16px;
            border-radius: 24px;
            background: #dfe3e6;
            text-transform: capitalize;

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
              color: #231d2c;
              font-size: 14px;
              overflow: hidden;
              font-weight: 400;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family: "Inter", "Helvetica Neue", sans-serif;
            `}
          >
            Sort by {sortBy.label}
          </span>
          <KeyboardArrowDownIcon />
        </Button>
        <StyledMenu
          keepMounted
          anchorEl={anchorEl}
          id="breadcrumb-menu"
          onClose={handleClose}
          open={Boolean(anchorEl)}
        >
          {sortByOptions.map((option) => (
            <StyledMenuItem
              key={option.value}
              onClick={() => {
                setSortBy(option);
                handleClose();
              }}
            >
              {option.label}
            </StyledMenuItem>
          ))}
        </StyledMenu>
      </div>
      <div
        css={`
          gap: 18px;
          width: 100%;
          display: flex;
          overflow-y: auto;
          padding: 18px 23px;
          flex-direction: column;
          height: calc(100vh - 48px - 50px - 52px - 60px);
          max-height: calc(100vh - 48px - 50px - 52px - 60px);
        `}
      >
        {chartList.map((chart, index) => (
          <div
            key={chart.id}
            css={`
              width: 100%;
              cursor: grab;
              height: 125px;
              font-size: 12px;
              background: #fff;
              user-select: none;
              padding: 16px 25px;

              > div {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                :first-of-type {
                  font-size: 14px;
                  font-weight: 700;
                }
              }
            `}
          >
            <div>{chart.name}</div>
            <div>
              <div>Chart type</div>
              <div>{chart.vizType}</div>
            </div>
            <div>
              <div>Dataset</div>
              <div>{chart.datasetId}</div>
            </div>
            <div>
              <div>Creation date</div>
              <div>{moment(chart.createdDate).format("DD-MM-YYYY")}</div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
