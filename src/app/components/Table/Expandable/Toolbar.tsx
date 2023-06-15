import React from "react";
import get from "lodash/get";
import { CSVLink } from "react-csv";
import { appColors } from "app/theme";
import { exportCSV } from "app/utils/exportCSV";
import Toolbar from "@material-ui/core/Toolbar";
import Popover from "@material-ui/core/Popover";
import CloseIcon from "@material-ui/icons/Close";
import { useCMSData } from "app/hooks/useCMSData";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useStoreState } from "app/state/store/hooks";
import { useLocation, useParams } from "react-router-dom";
import { useGetAllVizData } from "app/hooks/useGetAllVizData";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ViewColumnIcon from "@material-ui/icons/ViewColumnOutlined";

import { CommonPropTypes } from "react-csv/components/CommonPropTypes";
import { TableToolbarCols } from "app/components/Table/Expandable/data";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";

interface TableToolbarProps {
  title: string;
  search: string;
  columns: TableToolbarCols[];

  onSearchChange: (value: string) => void;
  onColumnViewSelectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TableToolbar(props: TableToolbarProps) {
  const location = useLocation();
  const params = useParams<{ code?: string }>();
  const vizData = useGetAllVizData();
  const cmsData = useCMSData({ returnData: true });
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [openSearch, setOpenSearch] = React.useState(false);
  const [csvLinkData, setCSVLinkData] = React.useState<CommonPropTypes>({
    data: [],
    filename: "empty.csv",
    headers: [],
  });

  const selectedAggregation = useStoreState(
    (state) => state.ToolBoxPanelAggregateByState.value
  );
  const donorMapView = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );
  const investmentsMapView = useStoreState(
    (state) => state.ToolBoxPanelInvestmentsMapViewState.value
  );
  const resultsSelectedYear = useStoreState(
    (state) => state.ToolBoxPanelResultsYearState.value
  );

  React.useEffect(() => {
    if (props.search.length > 0 && !openSearch) {
      setOpenSearch(true);
    }
  }, [props.search]);

  return (
    <Toolbar
      css={`
        display: flex;
        padding: 0 40px;
        background: ${appColors.TABLE.TOOLBAR_BACKGROUND_COLOR};
        flex-direction: row;
        justify-content: space-between;
        border-radius: 20px 20px 0px 0px;

        @media (max-width: 768px) {
          padding-right: 20px;
        }
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

          @media (max-width: 768px) {
            display: ${openSearch ? "none" : "inherit"};
          }
        `}
      >
        {props.title}
      </div>
      <div
        css={`
          gap: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;

          @media (max-width: 768px) {
            width: ${openSearch ? "100%" : ""};
          }

          button {
            padding: 4px;

            &:hover {
              background: ${appColors.TABLE
                .TOOLBAR_ICON_BUTTON_HOVER_BACKGROUND_COLOR};

              svg > path {
                fill: ${appColors.TABLE.TOOLBAR_ICON_BUTTON_HOVER_COLOR};
              }
            }
          }
        `}
      >
        <input
          type="text"
          ref={searchInputRef}
          value={props.search}
          onChange={(e) => props.onSearchChange(e.target.value)}
          css={`
            height: 32px;
            outline: none;
            color: ${appColors.TABLE.TOOLBAR_SEARCH_TEXT_COLOR};
            font-size: 14px;
            background: ${appColors.TABLE.TOOLBAR_SEARCH_BACKGROUND_COLOR};
            border-style: none;
            border-radius: 20px;
            padding: 6px 16px !important;
            opacity: ${openSearch ? 1 : 0};
            transition: all 0.5s ease-in-out 0s;

            @media (max-width: 768px) {
              width: 100%;
              display: ${openSearch ? "inherit" : "none"};
            }
          `}
        />
        <IconButton
          onClick={() => {
            if (openSearch) {
              props.onSearchChange("");
              setOpenSearch(false);
            } else {
              setOpenSearch(true);
              setTimeout(() => {
                searchInputRef.current?.focus();
              }, 100);
            }
          }}
        >
          {!openSearch ? (
            <SearchIcon htmlColor={appColors.TABLE.TOOLBAR_ICON_COLOR} />
          ) : (
            <CloseIcon htmlColor={appColors.TABLE.TOOLBAR_ICON_COLOR} />
          )}
        </IconButton>
        {["/documents", "/location/<code>/documents"].indexOf(
          location.pathname.replace(`/${params.code}`, "/<code>")
        ) === -1 && (
          <IconButton
            css={`
              @media (max-width: 768px) {
                display: ${openSearch ? "none" : "inherit"};
              }
            `}
          >
            <CSVLink
              target="_blank"
              id="download-csv"
              css={`
                height: 24px;
              `}
              asyncOnClick
              onClick={(_, done) => {
                new Promise((resolve) => {
                  setCSVLinkData(
                    exportCSV(
                      location.pathname
                        .replace("/location/", "/viz/")
                        .replace("/grant/", "/viz/")
                        .replace(`/${params.code}`, ""),
                      get(
                        vizData,
                        location.pathname.replace(`/${params.code}`, "/<code>"),
                        []
                      ),
                      {
                        selectedAggregation,
                        donorMapView,
                        investmentsMapView,
                        isDetail: params.code !== undefined,
                        resultsSelectedYear,
                      }
                    )
                  );
                  resolve({});
                }).then(() => done());
              }}
              {...csvLinkData}
            >
              <CloudDownloadIcon
                htmlColor={appColors.TABLE.TOOLBAR_ICON_COLOR}
              />
            </CSVLink>
          </IconButton>
        )}

        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          css={`
            @media (max-width: 768px) {
              display: ${openSearch ? "none" : "inherit"};
            }
          `}
        >
          <ViewColumnIcon htmlColor={appColors.TABLE.TOOLBAR_ICON_COLOR} />
        </IconButton>
      </div>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        container={() =>
          document.getElementById("simple-table-id") as HTMLElement
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: 186,
            borderRadius: 8,
            boxShadow: "0px 1px 14px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <div
          css={`
            display: flex;
            padding: 10px 12px;
            flex-direction: column;
          `}
        >
          <div
            css={`
              margin-bottom: 20px;
            `}
          >
            {get(cmsData, "componentsTable.showColumns", "")}
          </div>
          <FormGroup>
            {props.columns.map((c, index) => (
              <FormControlLabel
                key={c.name}
                control={
                  <Checkbox
                    key={c.name}
                    value={index}
                    color="primary"
                    checked={c.checked}
                    name={c.name}
                    onChange={props.onColumnViewSelectionChange}
                  />
                }
                label={c.name}
              />
            ))}
          </FormGroup>
        </div>
      </Popover>
    </Toolbar>
  );
}
