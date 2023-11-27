/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import { useStoreActions } from "app/state/store/hooks";
import { useParams, useHistory } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
/* project */
import {
  iconButtonCss,
  rowFlexCss,
  searchInputCss,
  sortByItemCss,
} from "app/modules/home-module/style";
import { categories } from "app/fragments/datasets-fragment/upload-steps/metaData";
import DatasetsGrid from "app/modules/home-module/components/Datasets/datasetsGrid";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ReactComponent as SortIcon } from "app/modules/home-module/assets/sort-fill.svg";
import { ReactComponent as GridIcon } from "app/modules/home-module/assets/grid-fill.svg";
import { ReactComponent as CloseIcon } from "app/modules/home-module/assets/close-icon.svg";
import { ReactComponent as SearchIcon } from "app/modules/home-module/assets/search-fill.svg";

function ChartModuleDataView(props: {
  loadDataset: (endpoint: string) => Promise<boolean>;
}) {
  useTitle("DX DataXplorer - Select Data");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const [category, setCategory] = React.useState("");
  const [tableView, setTableView] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [sortValue, setSortValue] = React.useState("createdDate");
  const [sortPopoverAnchorEl, setSortPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const sortOptions = [
    { label: "Last updated", value: "updatedDate" },
    { label: "Created date", value: "createdDate" },
    { label: "Name", value: "name" },
  ];

  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );

  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleCloseSortPopover = () => {
    setSortPopoverAnchorEl(null);
  };

  const openSortPopover = Boolean(sortPopoverAnchorEl);

  const handleItemClick = (id: string) => {
    setDataset(id);
    props.loadDataset(`chart/sample-data/${id}`).then(() => {
      history.push(`/chart/${page}/preview-data`);
    });
  };

  React.useEffect(() => {
    // When the Data View component is rendered, we are at step 1.
    setActivePanels(1);
  }, []);

  return (
    <div css={commonStyles.innercontainer}>
      <div
        css={`
          ${rowFlexCss}
          justify-content: flex-end;
          gap: 8px;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
            gap: 8px;
          `}
        >
          <div css={searchInputCss(openSearch)}>
            <input
              type="text"
              ref={inputRef}
              value={searchValue}
              placeholder="eg. Kenya"
              onChange={handleSearch}
            />
            <IconButton
              onClick={() => {
                setSearchValue("");
                setOpenSearch(false);
              }}
              css={`
                &:hover {
                  background: transparent;
                }
              `}
            >
              <CloseIcon
                css={`
                  margin-top: 1px;
                `}
              />
            </IconButton>
          </div>
          <IconButton
            onClick={() => {
              setOpenSearch(true);
              inputRef.current?.focus();
            }}
            css={iconButtonCss(openSearch)}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setSortPopoverAnchorEl(
              sortPopoverAnchorEl ? null : event.currentTarget
            );
          }}
          css={iconButtonCss(openSortPopover)}
        >
          <SortIcon />
        </IconButton>
        <Popover
          open={openSortPopover}
          anchorEl={sortPopoverAnchorEl}
          onClose={handleCloseSortPopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          css={`
            .MuiPaper-root {
              border-radius: 5px;
            }
          `}
        >
          <div
            css={`
              color: #fff;
              font-size: 12px;
              padding: 8px 22px;
              background: #231d2c;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            Sort by
          </div>
          {sortOptions.map((option) => (
            <div
              key={option.label}
              css={sortByItemCss(sortValue === option.value)}
              onClick={() => {
                setSortValue(option.value);
                handleCloseSortPopover();
              }}
            >
              {option.label}
            </div>
          ))}
        </Popover>
        <IconButton
          onClick={() => {
            setTableView(!tableView);
          }}
          css={iconButtonCss(tableView)}
        >
          <GridIcon />
        </IconButton>
      </div>
      <div
        css={`
          gap: 14px;
          width: 100%;
          height: 55px;
          display: flex;
          max-width: 100%;
          overflow-x: auto;
          flex-direction: row;
          margin: 40px 0 20px 0;

          &::-webkit-scrollbar {
            height: 5px;
            border-radius: 20px;
            background: #231d2c;
          }
          &::-webkit-scrollbar-track {
            background: #dfe3e6;
          }
          &::-webkit-scrollbar-thumb {
            background: #231d2c;
          }

          > button {
            width: 160px;
            height: 40px;
            font-size: 14px;
            cursor: pointer;
            min-width: 160px;
            max-width: 160px;
            background: #fff;
            border-radius: 30px;
            border: 1px solid #231d2c;
          }
        `}
      >
        {categories.map((c: string) => (
          <button
            key={c}
            onClick={() => setCategory(c !== category ? c : "")}
            style={
              c === category
                ? {
                    color: "#6061e5",
                    borderColor: "#6061e5",
                  }
                : {}
            }
          >
            {c}
          </button>
        ))}
      </div>
      <DatasetsGrid
        inChartBuilder
        sortBy={sortValue}
        category={category}
        tableView={tableView}
        searchStr={searchValue}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default withAuthenticationRequired(ChartModuleDataView);
