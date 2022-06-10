import React from "react";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

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
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function DataThemesToolBoxSelectDataset(
  props: DataThemesToolBoxSelectDatasetProps
) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { loadDataset } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);
  const activeVizIndex = useStoreState((state) => state.dataThemes.activeVizIndex.value);
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
      if (name === stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset) {
        return;
      }
      stepSelectionsActions.setStep1({
        tab: activeTabIndex,
        viz: activeVizIndex,
        dataset: name,
      });
      clearMapping({tab: activeTabIndex, viz: activeVizIndex});
      handleClose();
      console.log(endpoint)
      loadDataset(endpoint).then(() => {
        history.push(`/data-themes/${page}/preview`);
      });
    };

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
          {stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset || "Datasets"}
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
            selected={stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset === dataset.name}
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
            onChange={() => setIsLiveData({tab: activeTabIndex, viz: activeVizIndex, value: !isLiveData[activeTabIndex][activeVizIndex]})}
          />
        }
        label="Use Live data for the visualization"
      />
    </div>
  );
}
