import React from "react";
import find from "lodash/find";
import { Range } from "react-range";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import { IThumbProps } from "react-range/lib/types";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { useHistory, useParams } from "react-router-dom";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  Container,
  ThumbLabel,
  THUMB_SIZE,
  Track,
} from "app/components/RangeSlider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const StyledMenu = withStyles({
  paper: {
    width: "352px",
    marginTop: "8px",
    borderRadius: "18px",
    backgroundColor: "#DFE3E6",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background: "#262c34",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background: "#dfe3e6",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "#262c34",
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

const StyledMenuItem = withStyles(() => ({
  root: {
    width: "100%",
    height: "37px",
    color: "#373D43",
    fontSize: "14px",
    padding: "6px 12px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#262C34",
    },
    "&:not(:last-child)": {
      borderBottom: "1px solid #C0C7D2",
    },
  },
  selected: {
    backgroundColor: "#262C34 !important",
  },
}))(MenuItem);

const LightTooltip = withStyles(() => ({
  tooltip: {
    color: "#262C34",
    fontSize: "12px",
    boxShadow: "none",
    background: "#DFE3E6",
  },
}))(Tooltip);

const datasets = [
  {
    name: "Investment - Signed",
    id: "investment-signed",
  },
  {
    name: "Investment - Committed",
    id: "investment-committed",
  },
  {
    name: "Investment - Disbursed",
    id: "investment-disbursed",
  },
  {
    name: "Budgets",
    id: "budgets",
  },
  {
    name: "Pledges & Contributions",
    id: "pledges-contributions",
  },
  {
    name: "Allocations",
    id: "allocations",
  },
  {
    name: "Grants",
    id: "grants",
  },
  {
    name: "Eligibility",
    id: "eligibility",
  },
];

interface DataThemesToolBoxSelectDatasetProps {
  totalAvailable?: number;
  expanded: boolean;
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
}

export function DataThemesToolBoxSelectDataset(
  props: DataThemesToolBoxSelectDatasetProps
) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { loadDataset } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sliderValues, setSliderValues] = React.useState([100]);
  const [openTooltip, setOpenTooltip] = React.useState(props.expanded);
  const rangeRef = React.useRef();

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const stepSelectionsActions = useStoreActions(
    (actions) => actions.dataThemes.sync.stepSelections
  );
  const clearMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.clearValue
  );
  const isLiveData = useStoreState(
    (state) => state.dataThemes.sync.liveData.value
  );
  const setIsLiveData = useStoreActions(
    (actions) => actions.dataThemes.sync.liveData.setValue
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick =
    (endpoint: string, name: string) =>
    (event: React.MouseEvent<HTMLElement>) => {
      if (
        name ===
        stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset
      ) {
        return;
      }
      stepSelectionsActions.setStep1({
        tab: activeTabIndex,
        viz: activeVizIndex,
        dataset: name,
        dataPoints: sliderValues[0],
      });
      clearMapping({ tab: activeTabIndex, viz: activeVizIndex });
      handleClose();
      loadDataset(endpoint, sliderValues[0]).then(() => {
        history.push(`/data-themes/${page}/preview`);
      });
    };

  React.useEffect(() => {
    setSliderValues([
      stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataPoints,
    ]);
  }, [stepSelectionsData.step1, activeTabIndex, activeVizIndex]);

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: column;

        > hr {
          background: #c0c7d2;
          margin: 20px 0 10px 0;
        }

        > label {
          margin: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;

          > span {
            font-size: 14px;
          }
        }
      `}
    >
      <Button
        disableTouchRipple
        onClick={handleClick}
        css={`
          width: 100%;
          display: flex;
          font-size: 14px;
          padding: 12px 16px;
          flex-direction: row;
          border-radius: 24px;
          background: #dfe3e6;
          text-transform: capitalize;
          justify-content: space-between;

          &:hover {
            background: #dfe3e6;
          }

          svg {
            margin-left: 10px;
            transition: all 0.2s ease-in-out;
            transform: rotate(${anchorEl ? "180" : "0"}deg);
            > path {
              fill: #262c34;
            }
          }
        `}
      >
        <span
          css={`
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
          `}
        >
          {stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset ||
            "Datasets"}
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
        {datasets.map((dataset) => (
          <StyledMenuItem
            disableRipple
            key={dataset.id}
            disableTouchRipple
            onClick={handleItemClick(
              `data-themes/raw-data/${dataset.id}`,
              dataset.name
            )}
            selected={
              stepSelectionsData.step1[activeTabIndex][activeVizIndex]
                .dataset === dataset.name
            }
          >
            {dataset.name}
          </StyledMenuItem>
        ))}
      </StyledMenu>
      <Divider />
      <FormControlLabel
        value="live-data"
        labelPlacement="start"
        control={
          <Switch
            color="primary"
            checked={isLiveData[activeTabIndex][activeVizIndex]}
            onChange={() =>
              setIsLiveData({
                tab: activeTabIndex,
                viz: activeVizIndex,
                value: !isLiveData[activeTabIndex][activeVizIndex],
              })
            }
          />
        }
        label="Use Live data for the visualization"
      />
      {stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset && (
        <div
          css={`
            width: 100%;
            padding: 15px 0;
          `}
        >
          <div
            css={`
              gap: 12px;
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            Data points
            <LightTooltip
              arrow
              placement="right"
              open={openTooltip}
              title={
                <ClickAwayListener
                  onClickAway={() => {
                    if (openTooltip) {
                      setOpenTooltip(false);
                    }
                  }}
                >
                  <span>
                    Use this slider to activate all
                    <br />
                    available data from your selection
                  </span>
                </ClickAwayListener>
              }
            >
              <InfoIcon
                htmlColor="#262C34"
                css="cursor: pointer;"
                onClick={() => setOpenTooltip(true)}
              />
            </LightTooltip>
          </div>
          <div
            css={`
              position: relative;

              &:before {
                left: 0;
                top: -10px;
                content: "1";
                font-size: 10px;
                position: absolute;
              }

              &:after {
                right: 0;
                top: -10px;
                font-size: 10px;
                position: absolute;
                content: "${props.totalAvailable || 0} (Max)";
              }

              > div {
                > div {
                  width: calc(100% - 35px) !important;
                }
              }
            `}
          >
            <Container>
              <Range
                min={1}
                max={props.totalAvailable || 1000}
                step={10}
                // @ts-ignore
                ref={rangeRef}
                renderTrack={Track}
                values={sliderValues}
                onChange={(values: number[]) => {
                  setSliderValues(values);
                }}
                onFinalChange={(values: number[]) => {
                  if (
                    values[0] !==
                      stepSelectionsData.step1[activeTabIndex][activeVizIndex]
                        .dataPoints &&
                    stepSelectionsData.step1[activeTabIndex][activeVizIndex]
                      .dataset !== null
                  ) {
                    const dataset = find(datasets, {
                      name: stepSelectionsData.step1[activeTabIndex][
                        activeVizIndex
                      ].dataset,
                    }) as { name: string; id: string } | undefined;
                    if (dataset) {
                      stepSelectionsActions.setStep1({
                        tab: activeTabIndex,
                        viz: activeVizIndex,
                        dataset:
                          stepSelectionsData.step1[activeTabIndex][
                            activeVizIndex
                          ].dataset,
                        dataPoints: values[0],
                      });
                      loadDataset(
                        `data-themes/raw-data/${dataset.id}`,
                        values[0]
                      ).then(() => {
                        history.push(`/data-themes/${page}/preview`);
                      });
                    }
                  }
                }}
                renderThumb={(params: {
                  props: IThumbProps;
                  value: number;
                  index: number;
                  isDragged: boolean;
                }) => (
                  <div
                    {...params.props}
                    style={{
                      ...params.props.style,
                      height: `${THUMB_SIZE}px`,
                      width: `${THUMB_SIZE}px`,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      display: "flex",
                      outline: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <ThumbLabel
                      raw
                      index={params.index}
                      values={sliderValues}
                      rangeRef1={rangeRef.current}
                    />
                  </div>
                )}
              />
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}
