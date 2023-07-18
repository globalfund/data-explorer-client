import React from "react";
import find from "lodash/find";
import { useDrag } from "react-dnd";
import { useRecoilState } from "recoil";
import Paper from "@material-ui/core/Paper";
import MuiButton from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { EditorState } from "draft-js";
import { SearchIcon } from "app/assets/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import EditHeaderIcon from "app/modules/report-module/asset/EditHeaderIcon";
import TextPreviewImg from "app/modules/report-module/asset/textPreview.svg";
import { echartTypes } from "app/modules/chart-module/routes/chart-type/data";
import DividerPreviewImg from "app/modules/report-module/asset/dividerPreview.svg";
import RowFramePreviewImg from "app/modules/report-module/asset/rowframePreview.svg";
import { ReactComponent as DividerIcon } from "app/modules/report-module/asset/dividerIcon.svg";
import ChartOptionColor from "app/modules/chart-module/routes/customize/components/ChartOptionColor";
import {
  reportRightPanelViewAtom,
  isDividerOrRowFrameDraggingAtom,
} from "app/state/recoil/atoms";
import { ReactComponent as ChartIcon } from "app/modules/report-module/asset/chart-icon.svg";
import { ReactComponent as MediaIcon } from "app/modules/report-module/asset/media-icon.svg";
import { ReactComponent as ElementsIcon } from "app/modules/report-module/asset/elements-icon.svg";
import { ReactComponent as ActiveChartIcon } from "app/modules/report-module/asset/active-chart-icon.svg";
import { ReactComponent as ActiveElementsIcon } from "app/modules/report-module/asset/active-elements-icon.svg";
import { ReactComponent as ActiveMediaIcon } from "app/modules/report-module/asset/active-media-icon.svg";
import { ReactComponent as FilterIcon } from "app/modules/report-module/asset/filter-icon.svg";
import { ReactComponent as RowframeIcon } from "app/modules/report-module/asset/rowframe-icon.svg";

const Button = withStyles(() => ({
  root: {
    width: "50%",
    height: "52px",
    fontWeight: 700,
    fontSize: "14px",
    borderRadius: "0px",
    backgroundColor: "#C7CDD1",
    fontFamily: "GothamNarrow-Bold, sans-serif",
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
    fontFamily: "GothamNarrow-Book, sans-serif",
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

export const ReportElementsType = {
  ROWFRAME: "rowFrame",
  TEXT: "text",
  DIVIDER: "divider",
  CHART: "chart",
  HEADER: "header",
  IMAGE: "image",
  FILTER: "filter",
  BIG_NUMBER: "bigNumber",
};

interface IHeaderDetails {
  title: string;
  showHeader: boolean;
  description: EditorState;
  backgroundColor: string;
  titleColor: string;
  descriptionColor: string;
  dateColor: string;
}
interface Props {
  showHeaderItem: boolean;
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<string[]>>;
  appliedHeaderDetails: IHeaderDetails;
  setAppliedHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDetails>>;
  headerDetails: IHeaderDetails;
  setHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDetails>>;
  framesArray: IFramesArray[];
  reportName: string;
}

const dummyChartList = [
  {
    id: "",

    name: "Allocation Viz",
    description: "Allocations amounts for countries by disease",
    dataset: "Budgets",
    chartType: "Doughnut",
    createdDate: "10/10/2022",
    editedDate: "25/03/2023",
    vizType: "echartsBarchart",
    datasetId: "chart.datasetId",
    pickedCharts: [],
  },
  {
    id: "",

    name: "Sales Overview",
    description: "Sales performance overview",
    dataset: "Sales Data",
    chartType: "Bar",
    createdDate: "15/11/2022",
    editedDate: "20/04/2023",
    vizType: "echartsBarchart",
    datasetId: "chart.datasetId",
    pickedCharts: [],
  },
  {
    id: "",

    name: "User Activity",
    description: "User activity on the website",
    dataset: "User Data",
    chartType: "Line",
    createdDate: "05/09/2022",
    editedDate: "12/02/2023",
    vizType: "echartsBarchart",
    datasetId: "chart.datasetId",
    pickedCharts: [],
  },
  {
    id: "",

    name: "Product Inventory",
    description: "Inventory status of products",
    dataset: "Inventory Data",
    chartType: "Pie",
    createdDate: "30/07/2022",
    editedDate: "05/01/2023",
    vizType: "echartsBarchart",
    datasetId: "chart.datasetId",
    pickedCharts: [],
  },
  {
    id: "",

    name: "Expense Breakdown",
    description: "Breakdown of expenses by category",
    dataset: "Expense Data",
    chartType: "Area",
    createdDate: "20/12/2022",
    editedDate: "10/03/2023",
    vizType: "echartsBarchart",
    datasetId: "chart.datasetId",
    pickedCharts: [],
  },
];

export function ReportRightPanelCreateView(props: Props) {
  const [currentView, setCurrentView] = useRecoilState(
    reportRightPanelViewAtom
  );

  const elementItemDetails = [
    {
      elementType: ReportElementsType.ROWFRAME,
      leftIcon: <RowframeIcon />,
      previewImg: RowFramePreviewImg,
      name: "Add row frame",
      description: "Start adding placeholders to fit with your content",
    },
    {
      elementType: ReportElementsType.FILTER,
      leftIcon: <FilterIcon />,
      previewImg: TextPreviewImg,
      name: "Add filtering",
      description: "Add general filters to your report",
    },
    {
      elementType: ReportElementsType.DIVIDER,
      leftIcon: <DividerIcon />,
      previewImg: DividerPreviewImg,
      name: "Add divider",
      description: "Use dividers to separate sections ",
    },
  ];

  const mediaItemDetails = [
    {
      elementType: ReportElementsType.TEXT,
      leftIcon: (
        <TextFieldsIcon
          css={`
            width: 48px;
            height: 48px;
          `}
        />
      ),
      previewImg: RowFramePreviewImg,
      name: "Add text box",
      description: "Include written content to enrich your reports",
    },
    {
      elementType: ReportElementsType.IMAGE,
      leftIcon: (
        <PhotoLibraryIcon
          css={`
            width: 36px;
            height: 36px;
          `}
        />
      ),
      previewImg: TextPreviewImg,
      name: "Add image",
      description: "Include imagery content to enrich your reports",
    },
  ];

  React.useEffect(() => {
    if (!props.headerDetails.showHeader && currentView === "editHeader") {
      setCurrentView("elements");
    }
  }, [props.headerDetails.showHeader]);

  const whiteBackgroundOnly = "background-color: #fff;";
  const whiteBackgroundRoundedBottomRight =
    whiteBackgroundOnly + " border-radius: 0px 0px 8px 0px;";
  const whiteBackgroundRoundedBottomLeft =
    whiteBackgroundOnly + " border-radius: 0px 0px 0px 8px;";
  const whiteBackgroundNotRounded =
    whiteBackgroundOnly + " border-radius: 0px 0px 0px 0px";

  return (
    <>
      <div
        css={`
          width: 100%;
          display: flex;
          height: 100%;
          flex-direction: column;
          position: relative;
        `}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            height: 67px;
            background: #f5f5f7;
            align-items: center;
            button {
              padding: 20px;
              height: 100%;
              :hover {
                background: transparent;
                border-radius: none;
              }
            }
          `}
        >
          <IconButton
            disableRipple
            onClick={() => setCurrentView("elements")}
            css={`
              ${(() => {
                if (currentView === "elements") {
                  return "background: transparent;";
                } else if (currentView === "charts") {
                  return whiteBackgroundRoundedBottomRight;
                } else if (currentView === "media") {
                  return whiteBackgroundNotRounded;
                } else {
                  return "";
                }
              })()}
            `}
          >
            {currentView === "elements" ? (
              <ActiveElementsIcon />
            ) : (
              <ElementsIcon />
            )}
          </IconButton>
          <IconButton
            disableRipple
            onClick={() => setCurrentView("charts")}
            css={`
              ${(() => {
                if (currentView === "elements") {
                  return whiteBackgroundRoundedBottomLeft;
                } else if (currentView === "charts") {
                  return "background-color: transparent;";
                } else if (currentView === "media") {
                  return whiteBackgroundRoundedBottomRight;
                } else {
                  return "";
                }
              })()}
            `}
          >
            {currentView === "charts" ? <ActiveChartIcon /> : <ChartIcon />}
          </IconButton>

          <IconButton
            disableRipple
            onClick={() => setCurrentView("media")}
            css={`
              ${(() => {
                if (currentView === "elements") {
                  return whiteBackgroundNotRounded;
                } else if (currentView === "charts") {
                  return whiteBackgroundRoundedBottomLeft;
                } else if (currentView === "media") {
                  return "background: transparent;";
                } else {
                  return "";
                }
              })()}
            `}
          >
            {currentView === "media" ? <ActiveMediaIcon /> : <MediaIcon />}
          </IconButton>

          <div
            css={`
              ${(() => {
                if (currentView === "elements") {
                  return "background-color: #fff;";
                } else if (currentView === "charts") {
                  return "background-color: #fff;";
                } else if (currentView === "media") {
                  return whiteBackgroundRoundedBottomLeft;
                } else {
                  return "";
                }
              })()}
              width: 100%;
              height: 100%;
            `}
          ></div>
        </div>

        <div
          css={`
            display: flex;
            align-items: center;
            gap: 8px;
            padding-bottom: 3px;
            padding-top: 4px;

            border-bottom: 1px solid #dfe3e5;
            width: 90%;
            margin-left: 5%;

            p {
              font-size: 14px;
              font-family: "Gotham Narrow", sans-serif;
              color: #262c34;
              text-transform: capitalize;
            }
          `}
        >
          <div
            css={`
              width: 23px;
              height: 23px;
              border-radius: 23px;
              background: #252c34;
              color: #fff;
              font-size: 14px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            {(() => {
              if (currentView === "elements") {
                return "1";
              } else if (currentView === "charts") {
                return "2";
              } else if (currentView === "media") {
                return "3";
              } else {
                return "";
              }
            })()}
          </div>
          <div>
            <p>{currentView}</p>
          </div>
        </div>
        <div
          css={`
            height: 16px;
          `}
        />

        {currentView === "elements" && (
          <>
            <div
              css={`
                width: 100%;
                display: flex;
                user-select: none;
                flex-direction: column;

                > div {
                  width: 90%;
                  cursor: grab;
                  height: 64px;
                  display: flex;
                  align-items: center;
                  gap: 16px;
                  padding: 0 8px 0 16px;
                  background: #dfe3e5;
                  border-radius: 8px;
                  margin: 8px auto;
                  transform: translate(0, 0);
                  p {
                    margin: 0px;
                    line-height: normal;
                    font-size: 12px;
                  }
                  b {
                    font-size: 14px;
                    line-height: normal;
                    margin: 0;
                  }
                  &:hover {
                    background: #252c34;

                    svg {
                      path {
                        fill: #fff;
                      }
                    }
                    b,
                    p {
                      color: #fff;
                    }
                  }
                }
              `}
            >
              {elementItemDetails.map((item) => (
                <ElementItem
                  key={item.elementType}
                  {...item}
                  disabled={
                    item.elementType === ReportElementsType.HEADER
                      ? !props.showHeaderItem
                      : false
                  }
                />
              ))}
            </div>
          </>
        )}
        {currentView === "charts" && (
          <ReportRightPanelCreateViewChartList
            pickedCharts={props.pickedCharts}
            setPickedCharts={props.setPickedCharts}
            headerDetails={props.headerDetails}
            framesArray={props.framesArray}
            reportName={props.reportName}
            appliedHeaderDetails={props.appliedHeaderDetails}
          />
        )}
        {currentView === "media" && (
          <>
            <div
              css={`
                width: 100%;
                display: flex;
                user-select: none;
                flex-direction: column;
                background: transparent;

                > div {
                  width: 90%;
                  cursor: grab;
                  height: 64px;
                  display: flex;
                  align-items: center;
                  gap: 16px;
                  padding: 0 8px 0 16px;
                  background: #dfe3e5;
                  border-radius: 8px;
                  margin: 8px auto;
                  transform: translate(0, 0);

                  p {
                    margin: 0px;
                    line-height: normal;
                    font-size: 12px;
                  }
                  b {
                    font-size: 14px;
                    line-height: normal;
                    margin: 0;
                  }
                  &:hover {
                    svg {
                      path {
                        fill: #fff;
                      }
                    }
                    background: #252c34;
                    b,
                    p {
                      color: #fff;
                    }
                  }
                }
              `}
            >
              {mediaItemDetails.map((item) => (
                <ElementItem
                  key={item.elementType}
                  {...item}
                  disabled={
                    item.elementType === ReportElementsType.HEADER
                      ? !props.showHeaderItem
                      : false
                  }
                />
              ))}
            </div>
          </>
        )}

        {currentView === "editHeader" && <EditHeaderPanelView {...props} />}
      </div>
      <div
        css={`
          display: flex;
          gap: 8px;
          position: absolute;
          bottom: 0%;
          left: 2%;
          z-index: 2;
          height: 70px;

          background: #f5f5f7;
          button {
            outline: none;
            border: none;
            border-radius: 8px;
            width: 188px;
            height: 48px;
            background: #dfe3e5;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: "Gotham Narrow", sans-serif;
            :nth-child(1) {
              background: #dfe3e5;
              color: #262c34;
            }
            :nth-child(2) {
              background: #262c34;
              color: #fff;
            }
            &:hover {
              opacity: 0.9;
              cursor: pointer;
            }
          }
        `}
      >
        <button>Cancel </button>
        <button>Save</button>
      </div>
    </>
  );
}

const sortByOptions = [
  { value: "createdDate desc", label: "Recent (DESC)" },
  { value: "createdDate asc", label: "Recent (ASC)" },
  { value: "name desc", label: "Name (DESC)" },
  { value: "name asc", label: "Name (ASC)" },
];

function ReportRightPanelCreateViewChartList(props: {
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<any[]>>;
  headerDetails: IHeaderDetails;
  appliedHeaderDetails: IHeaderDetails;
  framesArray: IFramesArray[];
  reportName: string;
}) {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState(sortByOptions[0]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const chartList = useStoreState(
    (state) => (state.charts.ChartGetList.crudData ?? []) as any[]
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
      filterString: `filter={"where":{"name":{"like":"${search}.*","options":"i"}},"order":"${sortBy.value}"}`,
    });
  }, [search, sortBy]);

  return (
    <React.Fragment>
      <div
        css={`
          width: 90%;
          display: flex;
          margin: auto;
          position: relative;
          flex-direction: row;

          > svg {
            top: 6px;
            right: 184px;
            position: absolute;
          }
        `}
      >
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          css={`
            width: 187px;
            height: 35px;
            border-style: none;
            background: #dfe3e6;
            border-radius: 24px;
            padding: 0 45px 0 10px !important;
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
            padding: 4px 14px;
            border-radius: 24px;
            background: #252c34;
            text-transform: capitalize;

            svg {
              transition: all 0.2s ease-in-out;
              transform: rotate(${anchorEl ? "180" : "0"}deg);
              > path {
                fill: #fff;
              }
            }
          `}
        >
          <span
            css={`
              color: #fff;

              font-size: 14px;
              overflow: hidden;
              font-weight: 400;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
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
          margin-bottom: 100px;

          height: calc(100vh - 48px - 50px - 52px - 60px);
          max-height: calc(100vh - 48px - 50px - 52px - 60px);

          &::-webkit-scrollbar {
            width: 5px;
            border-radius: 6px;
            background: #231d2c;
          }
          &::-webkit-scrollbar-track {
            background: #f2f7fd;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #231d2c;
          }
        `}
      >
        {chartList.map((chart) => (
          <ChartItem
            id={chart.id}
            key={chart.id}
            name={chart.name}
            description={chart.description}
            dataset={chart.dataset}
            chartType={chart.chartType}
            createdDate={chart.createdDate}
            editedDate={chart.editedDate}
            vizType={chart.vizType}
            datasetId={chart.datasetId}
            pickedCharts={props.pickedCharts}
            elementType={
              (chart.vizType === "bigNumber"
                ? ReportElementsType.BIG_NUMBER
                : ReportElementsType.CHART) as "chart" | "bigNumber"
            }
            setPickedCharts={props.setPickedCharts}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

function ElementItem(props: {
  leftIcon: JSX.Element;
  previewImg: string;
  elementType: string;
  name: string;
  description: string;
  disabled?: boolean;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.elementType,
    item: {
      type: props.elementType,
      value: "",
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isItemDragging, setIsItemDragging] = useRecoilState(
    isDividerOrRowFrameDraggingAtom
  );

  React.useEffect(() => {
    if (
      (props.elementType === ReportElementsType.DIVIDER ||
        props.elementType === ReportElementsType.ROWFRAME) &&
      isDragging !== isItemDragging
    ) {
      setIsItemDragging(isDragging);
    }
  }, [isDragging]);

  return (
    <div
      ref={drag}
      style={props.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}}
    >
      {props.leftIcon}
      <div>
        <b>{props.name}</b>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

function ChartItem(props: {
  id: string;
  name: string;
  description: string;
  dataset: string;
  chartType: string;
  vizType: string;
  datasetId: string;
  elementType: string;
  editedDate: string;
  createdDate: string;
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const nullRef = React.useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.elementType,
    item: {
      type: props.elementType,
      value: props.id,
      name: props.name,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getIcon = (vizType: string) => {
    const type = find(echartTypes(true), { id: vizType });
    if (type) {
      return type.icon;
    }
    return echartTypes(true)[0].icon;
  };

  const added = props.pickedCharts.includes(props.id);

  return (
    <div
      ref={added ? nullRef : drag}
      css={`
        width: 100%;
        font-size: 12px;
        user-select: none;
        cursor: ${added ? "auto" : "grab"};
        transform: translate(0, 0);

        ${!added &&
        `&:hover {
          border-color: #6061e5;
        }`}

        > div {
          width: 100%;
        }
      `}
    >
      <div
        css={`
          width: 352px;
          height: 125px;
          border-radius: 10px;
          background: ${isDragging && !added ? "#252C34" : "#DFE3E5"};

          b,
          p {
            ${isDragging && !added && "color: #fff;"}
          }
          &:hover {
            background: #252c34;
            b,
            p {
              color: #fff;
            }
            svg {
              path {
                fill: #fff;
              }
            }
          }
          padding: 16px;
        `}
      >
        <div
          css={`
            display: flex;
            justify-content: space-between;
            b {
              font-size: 14px;
              color: #262c34;
              font-family: "Gotham Narrow", sans-serif;
            }
            p {
              font-size: 12px;
              color: #495057;
              line-height: 15px;
              font-family: "Gotham Narrow", sans-serif;
              margin: 0;
            }
            svg {
              width: 30.154px;
              height: 30.154px;
            }
          `}
        >
          <div>
            <b>{props.name}</b>
            <p>{props.description}</p>
          </div>
          <div>{getIcon(props.vizType)}</div>
        </div>
        <div
          css={`
            height: 30px;
          `}
        />
        <div
          css={`
            display: flex;
            justify-content: space-between;
            /* align-items: center; */
            p {
              font-size: 10px;
              margin: 0;
              line-height: 15px;
            }
          `}
        >
          <div>
            <p>Dataset - {props.dataset}</p>
            <p>Chart type -{props.chartType}</p>
          </div>
          <div
            css={`
              text-align: right;
            `}
          >
            <p>Creation date - {props.createdDate}</p>
            <p>Last edited - {props.editedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditHeaderPanelView(props: Props) {
  const [_, setCurrentView] = useRecoilState(reportRightPanelViewAtom);
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      `}
    >
      <div
        css={`
          width: 100%;
          height: 55px;
          display: flex;
          padding: 0 25px;
          align-items: center;
          background-color: #f2f7fd;
          border-bottom: 1px solid #cfd4da;

          > svg {
            margin-right: 25px;
          }
        `}
      >
        <EditHeaderIcon />
        Edit header
      </div>
      <div
        css={`
          padding: 0 24px;
        `}
      >
        <div
          css={`
            padding: 16px 0;
          `}
        >
          Colors
        </div>
        <Paper
          css={`
            > label {
              --bs-gutter-x: 0;
              padding: 12px 24px;
              border-bottom: 1px solid #dfe3e6;
            }

            #inline-color-picker-popover {
              right: 0;
            }
          `}
        >
          <ChartOptionColor
            isEnabled
            error={false}
            value={props.headerDetails.backgroundColor}
            default={props.headerDetails.backgroundColor}
            onChange={(value: string) => {
              props.setHeaderDetails({
                ...props.headerDetails,
                backgroundColor: value,
              });
            }}
            label="Background color"
          />
          <ChartOptionColor
            isEnabled
            error={false}
            value={props.headerDetails.titleColor}
            default={props.headerDetails.titleColor}
            onChange={(value: string) => {
              props.setHeaderDetails({
                ...props.headerDetails,
                titleColor: value,
              });
            }}
            label="Title color"
          />
          <ChartOptionColor
            isEnabled
            error={false}
            value={props.headerDetails.descriptionColor}
            default={props.headerDetails.descriptionColor}
            onChange={(value: string) => {
              props.setHeaderDetails({
                ...props.headerDetails,
                descriptionColor: value,
              });
            }}
            label="Description color"
          />
          <ChartOptionColor
            isEnabled
            error={false}
            value={props.headerDetails.dateColor}
            default={props.headerDetails.dateColor}
            onChange={(value: string) => {
              props.setHeaderDetails({
                ...props.headerDetails,
                dateColor: value,
              });
            }}
            label="Date color"
          />
        </Paper>
      </div>

      <div
        css={`
          width: 100%;
          display: flex;
          flex-direction: row;
          position: absolute;
          bottom: 0;
        `}
      >
        <Button
          onClick={() => {
            props.setHeaderDetails(props.appliedHeaderDetails);
            setCurrentView("elements");
          }}
          css={`
            background: #cfd4da;
            :hover {
              p {
                color: #fff;
              }
            }
          `}
        >
          <p
            css={`
              color: #70777e;
            `}
          >
            Cancel
          </p>
        </Button>
        <Button
          onClick={() => {
            props.setAppliedHeaderDetails(props.headerDetails);
            setCurrentView("elements");
          }}
          css={`
            background: #262c34;
            color: #ffffff;
          `}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
