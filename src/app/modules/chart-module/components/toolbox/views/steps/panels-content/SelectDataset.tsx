import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";

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

const DEFAULT_DATASETS = [
  {
    name: "Pledges & Contributions",
    id: "pledges-contributions",
  },
  {
    name: "Eligibility",
    id: "eligibility",
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
];

interface ChartToolBoxSelectDatasetProps {
  expanded: boolean;
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function ChartToolBoxSelectDataset(
  props: ChartToolBoxSelectDatasetProps
) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { loadDataset } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dataset = useStoreState((state) => state.charts.dataset.value);
  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );
  const resetMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const datasets =
    process.env.REACT_APP_USE_DEFAULT_DATASETS === "true"
      ? DEFAULT_DATASETS
      : useStoreState(
          (state) =>
            get(
              state,
              "dataThemes.DatasetGetList.crudData",
              DEFAULT_DATASETS
            ) as DatasetListItemAPIModel[]
        );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick =
    (endpoint: string, id: string) =>
    (event: React.MouseEvent<HTMLElement>) => {
      if (id === dataset) {
        return;
      }
      setDataset(id);
      resetMapping();
      handleClose();
      loadDataset(endpoint).then(() => {
        history.push(`/chart/${page}/preview-data`);
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
            font-family: "Inter", "Helvetica Neue", sans-serif;
          `}
        >
          {get(find(datasets, { id: dataset }), "name", "Datasets")}
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
        {datasets?.map((item) => (
          <StyledMenuItem
            disableRipple
            key={item.id}
            disableTouchRipple
            selected={dataset === item.id}
            onClick={handleItemClick(
              `data-themes/sample-data/${item.id}`,
              item.id
            )}
          >
            {item.name}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
