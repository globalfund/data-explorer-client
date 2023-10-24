import React from "react";
import find from "lodash/find";
import { useDrag } from "react-dnd";
import { useRecoilState } from "recoil";
import Paper from "@material-ui/core/Paper";
import { useSessionStorage } from "react-use";
import MuiButton from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { EditorState, convertToRaw } from "draft-js";
import { SearchIcon } from "app/assets/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import HeaderIcon from "app/modules/report-module/asset/HeaderIcon";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import GridItem from "app/modules/home-module/components/Charts/gridItem";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import EditHeaderIcon from "app/modules/report-module/asset/EditHeaderIcon";
import TextPreviewImg from "app/modules/report-module/asset/textPreview.svg";
import { echartTypes } from "app/modules/chart-module/routes/chart-type/data";
import DividerPreviewImg from "app/modules/report-module/asset/dividerPreview.svg";
import HeaderPreviewImg from "app/modules/report-module/asset/headerPreviewImg.svg";
import RowFramePreviewImg from "app/modules/report-module/asset/rowframePreview.svg";
import { ReactComponent as AddNewImage } from "app/modules/home-module/assets/add-img.svg";
import { ReactComponent as DividerIcon } from "app/modules/report-module/asset/dividerIcon.svg";
import ChartOptionColor from "app/modules/chart-module/routes/customize/components/ChartOptionColor";
import {
  persistedReportStateAtom,
  reportRightPanelViewAtom,
  createChartFromReportAtom,
  isDividerOrRowFrameDraggingAtom,
  isChartDraggingAtom,
} from "app/state/recoil/atoms";

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
  HEADER: "header",
  CHART: "chart",
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

  appliedHeaderDetails: IHeaderDetails;
  setAppliedHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDetails>>;
  headerDetails: IHeaderDetails;
  setHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDetails>>;
  framesArray: IFramesArray[];
  reportName: string;
  handlePersistReportState: () => void;
}

export function ReportRightPanelCreateView(props: Props) {
  const [currentView, setCurrentView] = useRecoilState(
    reportRightPanelViewAtom
  );

  const elementItemDetails = [
    {
      elementType: ReportElementsType.HEADER,
      leftIcon: <HeaderIcon />,
      previewImg: HeaderPreviewImg,
      name: "Header",
    },
    {
      elementType: ReportElementsType.ROWFRAME,
      leftIcon: <ArrowRightAltIcon />,
      previewImg: RowFramePreviewImg,
      name: "Row Frame",
    },
    {
      elementType: ReportElementsType.TEXT,
      leftIcon: <TextFieldsIcon />,
      previewImg: TextPreviewImg,
      name: "Text",
    },
    {
      elementType: ReportElementsType.DIVIDER,
      leftIcon: <DividerIcon />,
      previewImg: DividerPreviewImg,
      name: "Divider",
    },
  ];

  React.useEffect(() => {
    if (!props.headerDetails.showHeader && currentView === "editHeader") {
      setCurrentView("elements");
    }
  }, [props.headerDetails.showHeader]);

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        height: 100%;
        flex-direction: column;
      `}
    >
      <div
        css={`
          width: 100%;
          display: flex;
          flex-direction: row;
          display: ${currentView === "editHeader" ? "none" : "block"};
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
      )}
      {currentView === "charts" && (
        <ReportRightPanelCreateViewChartList
          headerDetails={props.headerDetails}
          framesArray={props.framesArray}
          reportName={props.reportName}
          appliedHeaderDetails={props.appliedHeaderDetails}
          handlePersistReportState={props.handlePersistReportState}
        />
      )}
      {currentView === "editHeader" && <EditHeaderPanelView {...props} />}
    </div>
  );
}

const sortByOptions = [
  { value: "createdDate desc", label: "Recent (DESC)" },
  { value: "createdDate asc", label: "Recent (ASC)" },
  { value: "name desc", label: "Name (DESC)" },
  { value: "name asc", label: "Name (ASC)" },
];

function ReportRightPanelCreateViewChartList(props: {
  headerDetails: IHeaderDetails;
  appliedHeaderDetails: IHeaderDetails;
  framesArray: IFramesArray[];
  reportName: string;
  handlePersistReportState: () => void;
}) {
  const token = useSessionStorage("authToken", "")[0];

  const [search, setSearch] = React.useState("");
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
      token,
      storeInCrudData: true,
      filterString: `filter={"where":{"name":{"like":"${search}.*","options":"i"}},"order":"${sortBy.value}"}`,
    });
  }, [token, search, sortBy]);

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
          onChange={(e) => setSearch(e.target.value)}
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
        <CreateChartCard
          headerDetails={props.headerDetails}
          framesArray={props.framesArray}
          reportName={props.reportName}
          appliedHeaderDetails={props.appliedHeaderDetails}
          handlePersistReportState={props.handlePersistReportState}
        />
        {chartList.map((chart, index) => (
          <ChartItem
            chartIndex={index}
            id={chart.id}
            key={chart.id}
            name={chart.name}
            vizType={chart.vizType}
            datasetId={chart.datasetId}
            createdDate={chart.createdDate}
            framesArray={props.framesArray}
            elementType={
              (chart.vizType === "bigNumber"
                ? ReportElementsType.BIG_NUMBER
                : ReportElementsType.CHART) as "chart" | "bigNumber"
            }
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
      id={props.name}
      css={`
        border: 1px solid ${isDragging ? "#6061E5" : "transparent"};

        &:hover {
          border-color: #6061e5;
        }
      `}
      style={props.disabled ? { opacity: 0.5, pointerEvents: "none" } : {}}
    >
      {props.leftIcon}
      {props.name}
    </div>
  );
}

function CreateChartCard(props: {
  reportName: string;
  headerDetails: IHeaderDetails;
  appliedHeaderDetails: IHeaderDetails;
  framesArray: IFramesArray[];
  handlePersistReportState: () => void;
}) {
  const history = useHistory();

  const { page, view } = useParams<{
    page: string;
    view: string;
  }>();

  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );
  const setLoadedChart = useStoreActions(
    (state) => state.charts.ChartGet.setCrudData
  );
  const setCreateChartData = useStoreActions(
    (state) => state.charts.ChartCreate.setCrudData
  );

  const setCreateChartFromReport = useRecoilState(createChartFromReportAtom)[1];

  const action = () => {
    setCreateChartFromReport({
      state: true,
      view,
      page,
    });
    setDataset(null);
    setLoadedChart(null);
    setCreateChartData(null);
    //set persisted report state to current report state
    props.handlePersistReportState();
    history.push("/chart/new/data");
  };
  return (
    <div>
      <div
        onClick={action}
        css={`
          background: #f2f7fd;
          box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
          height: 125px;
          padding-left: 27px;
          display: flex;
          justify-content: flex-start;
          gap: 12px;
          align-items: center;
          position: relative;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        `}
      >
        <div>
          <AddNewImage />
        </div>
        <div
          css={`
            border: 1px solid #231d2c;
            height: 49px;
            width: 0px;
          `}
        />

        <div
          css={`
            h1 {
              font-family: "GothamNarrow-Bold", sans-serif;
              color: #262c34;
              font-size: 18px;
              line-height: 20px;
              margin: 0;
              font-weight: bold;
            }
            p {
              font-family: "GothamNarrow", sans-serif;
              color: #495057;
              font-size: 10px;
              line-height: 15px;
              letter-spacing: 0.5px;
              margin: 0;
              margin-top: 4px;
            }
          `}
        >
          <h1>New chart</h1>
          <p>Create a new chart in your library</p>
        </div>
      </div>
    </div>
  );
}

function ChartItem(props: {
  id: string;
  chartIndex: number;
  name: string;
  vizType: string;
  datasetId: string;
  createdDate: string;
  elementType: "chart" | "bigNumber";
  framesArray: IFramesArray[];
}) {
  const nullRef = React.useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.elementType,
    item: {
      type: props.elementType,
      value: props.id,
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

  let added = false;
  for (let i = 0; i < props.framesArray.length; i++) {
    if (props.framesArray[i].content.includes(props.id)) {
      added = true;
    }
  }

  const setIsChartDragging = useRecoilState(isChartDraggingAtom)[1];

  React.useEffect(() => {
    if (isDragging && !added) {
      setIsChartDragging(props.elementType);
    } else {
      setIsChartDragging(null);
    }
  }, [isDragging]);

  return (
    <div
      ref={added ? nullRef : drag}
      id={`chart-${props.chartIndex}`}
      css={`
        width: 100%;
        font-size: 12px;
        background: #fff;
        user-select: none;
        cursor: ${added ? "auto" : "grab"};
        border: 1px solid ${isDragging && !added ? "#6061E5" : "#fff"};

        ${!added &&
        `&:hover {
          border-color: #6061e5;
        }`}

        > div {
          width: 100%;
        }
      `}
    >
      <GridItem
        id={props.id}
        path={props.name}
        title={props.name}
        date={props.createdDate}
        viz={getIcon(props.vizType)}
        added={added}
        descr="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
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
