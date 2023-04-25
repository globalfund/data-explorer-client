import React from "react";
import moment from "moment";
import { EditorState } from "draft-js";
import { SetterOrUpdater, useRecoilState } from "recoil";
import Paper from "@material-ui/core/Paper";
import MuiButton from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { SearchIcon } from "app/assets/icons/Search";
import { DragPreviewImage, useDrag } from "react-dnd";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { ReactComponent as DividerIcon } from "../../asset/dividerIcon.svg";
import {
  isDividerOrRowFrameDraggingAtom,
  reportRightPanelViewAtom,
} from "app/state/recoil/atoms";
import HeaderIcon from "app/modules/report-module/asset/HeaderIcon";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import EditHeaderIcon from "app/modules/report-module/asset/EditHeaderIcon";
import TextPreviewImg from "app/modules/report-module/asset/textPreview.svg";
import DividerPreviewImg from "app/modules/report-module/asset/dividerPreview.svg";
import HeaderPreviewImg from "app/modules/report-module/asset/headerPreviewImg.svg";
import RowFramePreviewImg from "app/modules/report-module/asset/rowframePreview.svg";
import ChartOptionColor from "app/modules/chart-module/routes/customize/components/ChartOptionColor";

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

export const ReportElementsType = {
  ROWFRAME: "rowFrame",
  TEXT: "text",
  DIVIDER: "divider",
  CHART: "chart",
};

interface IHeaderDeatils {
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
  appliedHeaderDetails: IHeaderDeatils;
  setAppliedHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDeatils>>;
  headerDetails: IHeaderDeatils;
  setHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDeatils>>;
}

export function ReportRightPanelCreateView(props: Props) {
  const [currentView, setCurrentView] = useRecoilState(
    reportRightPanelViewAtom
  );

  const elementItemDetails = [
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
          {props.showHeaderItem && (
            <ElementItem
              name="Header"
              elementType="header"
              leftIcon={<HeaderIcon />}
              previewImg={HeaderPreviewImg}
            />
          )}
          {elementItemDetails.map((item) => (
            <ElementItem key={item.elementType} {...item} />
          ))}
        </div>
      )}
      {currentView === "charts" && (
        <ReportRightPanelCreateViewChartList
          pickedCharts={props.pickedCharts}
          setPickedCharts={props.setPickedCharts}
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
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<any[]>>;
}) {
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
      storeInCrudData: true,
      filterString: `filter={"where":{"name":{"like":"${search}.*","options":"i"}},"order":"${sortBy.value}"}`,
    });
  }, [search, sortBy]);

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
          &::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {chartList.map((chart) => (
          <ChartItem
            key={chart.id}
            pickedCharts={props.pickedCharts}
            setPickedCharts={props.setPickedCharts}
            id={chart.id}
            name={chart.name}
            vizType={chart.vizType}
            datasetId={chart.datasetId}
            createdDate={chart.createdDate}
            elementType={ReportElementsType.CHART}
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
}) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
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
    <>
      <DragPreviewImage connect={preview} src={props.previewImg} />
      <div ref={drag}>
        {props.leftIcon}
        {props.name}
      </div>
    </>
  );
}

function ChartItem(props: {
  elementType: string;
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<string[]>>;
  id: string;
  name: string;
  vizType: string;
  datasetId: string;
  createdDate: string;
}) {
  const nullRef = React.useRef(null);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: props.elementType,
    item: {
      type: props.elementType,
      value: props.id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),

    end: (item, monitor) => {
      const dropped = monitor.didDrop();
      if (dropped) {
        props.setPickedCharts((prev) => [...prev, item.value]);
      }
    },
  }));

  return (
    <>
      <div
        ref={props.pickedCharts.includes(props.id) ? nullRef : drag}
        css={`
          width: 100%;
          cursor: ${props.pickedCharts.includes(props.id) ? "auto" : "grab"};
          height: 100%;
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
        {props.pickedCharts.includes(props.id) && (
          <p
            css={`
              margin: 0;
              width: 10%;
              margin-left: auto;
            `}
          >
            {" "}
            {"Added"}
          </p>
        )}

        <div>
          <span
            css={`
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 300px;
              margin-top: 0;
            `}
          >
            {props.name}
          </span>
        </div>
        <div>
          <div>Chart type</div>
          <div>{props.vizType}</div>
        </div>
        <div>
          <div>Dataset</div>
          <div>{props.datasetId}</div>
        </div>
        <div>
          <div>Creation date</div>
          <div>{moment(props.createdDate).format("DD-MM-YYYY")}</div>
        </div>
      </div>
    </>
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
              color: #fff;
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
