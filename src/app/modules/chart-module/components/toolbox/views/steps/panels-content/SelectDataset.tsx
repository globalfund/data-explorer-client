import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import Button from "@material-ui/core/Button";

import { useHistory, useParams } from "react-router-dom";

import { useStoreState, useStoreActions } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import SubHeader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";

export const DEFAULT_DATASETS = [
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

export const DatasetPanel = (props: {
  loadDataset: (endpoint: string) => Promise<boolean>;
  expanded: number;
}) => {
  return (
    <div>
      <SubHeader name="Select Dataset" level={1} />
      <div
        css={`
          border-radius: 11px;
          background: #dfe3e5;
          height: 100%;
          max-height: 391px;
          transition: all 0.2s ease-in-out;
          padding: 16px 19px;
          margin-top: 16px;
          width: 90%;
          margin-left: 26px;
        `}
      >
        <ChartToolBoxSelectDataset
          loadDataset={props.loadDataset}
          expanded={props.expanded === 1}
        />
      </div>
    </div>
  );
};

function ChartToolBoxSelectDataset(props: ChartToolBoxSelectDatasetProps) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { loadDataset } = props;
  const [displayDatasets, setDisplayDatasets] = React.useState(true);

  const dataset = useStoreState((state) => state.charts.dataset.value);
  const datasetsFromApi = useStoreState(
    (state) =>
      get(
        state,
        "dataThemes.DatasetGetList.crudData",
        DEFAULT_DATASETS
      ) as DatasetListItemAPIModel[]
  );
  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );
  const resetMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const datasets =
    process.env.REACT_APP_USE_DEFAULT_DATASETS === "true"
      ? DEFAULT_DATASETS
      : datasetsFromApi;

  const isDatasetSelected = find(datasets, { id: dataset });

  const handleClick = () => {
    setDisplayDatasets(!displayDatasets);
  };

  const handleClose = () => {
    setDisplayDatasets(false);
  };

  const handleItemClick = (endpoint: string, id: string) => () => {
    if (id === dataset) {
      return;
    }
    setDisplayDatasets(false);
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
          height: 31px;
          border-radius: 36px;
          border: ${isDatasetSelected && !displayDatasets
            ? "none"
            : "0.722px dashed #262c34"};
          background: ${isDatasetSelected && !displayDatasets
            ? "#262c34"
            : "#dfe3e5"};
          text-transform: capitalize;
          justify-content: space-between;
          color: ${isDatasetSelected && !displayDatasets ? "#fff" : "#868e96"};

          &:hover {
            background: #cfd4da;
          }

          svg {
            margin-left: 10px;
            transition: all 0.2s ease-in-out;
            transform: rotate(${displayDatasets ? "180" : "0"}deg);
            > path {
              fill: ${isDatasetSelected && !displayDatasets
                ? "#fff"
                : "#262c34"};
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
          {get(isDatasetSelected, "name", "Select Dataset")}
        </span>
        <KeyboardArrowDownIcon />
      </Button>
      {displayDatasets && (
        <>
          {datasets?.map((item) => (
            <button
              key={item.id}
              onClick={handleItemClick(`chart/sample-data/${item.id}`, item.id)}
              css={`
                height: 31px;
                color: ${item.id === dataset ? "#FFF" : "#262c34"};
                font-family: "Gotham Narrow", sans-serif;
                font-size: 14px;
                background: ${item.id === dataset ? "#262C34" : "#cfd4da"};
                border-radius: 25px;
                padding-left: 16px;
                border: none;
                outline: none;
                margin-top: 8px;
                text-align: left;
              `}
            >
              {item.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
