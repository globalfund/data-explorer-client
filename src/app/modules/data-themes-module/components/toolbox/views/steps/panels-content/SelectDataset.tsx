import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
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
}))(MenuItem);

export function DataThemesToolBoxSelectDataset() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const stepSelectionsActions = useStoreActions(
    (actions) => actions.dataThemes.sync.stepSelections
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );

  const fetchData = useStoreActions(
    (actions) => actions.dataThemes.rawData.fetchWithEndpoint
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
      if (name === stepSelectionsData.step1.dataset) {
        return;
      }
      fetchData({
        endpoint,
      });
      stepSelectionsActions.setStep1({
        ...stepSelectionsData.step1,
        dataset: name,
      });
      handleClose();
      history.push("/data-themes/create/preview");
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
          {stepSelectionsData.step1.dataset || "Datasets"}
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
        <StyledMenuItem
          disableRipple
          disableTouchRipple
          onClick={handleItemClick(
            "data-themes/raw-data/investment-signed",
            "Investment - Signed"
          )}
          selected={stepSelectionsData.step1.dataset === "Investment - Signed"}
        >
          Investment - Signed
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Investment - Committed
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Investment - Disbursed
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Budgets
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Pledges & Contributions
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Allocations
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Grants
        </StyledMenuItem>
        <StyledMenuItem disableRipple disableTouchRipple>
          Eligibility
        </StyledMenuItem>
      </StyledMenu>
      <Divider />
      <FormControlLabel
        value="live-data"
        labelPlacement="start"
        control={<Switch color="primary" />}
        label="Use Live data for the visualization"
      />
    </div>
  );
}
