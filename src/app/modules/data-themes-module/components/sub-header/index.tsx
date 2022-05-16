/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components/macro";
import { Link, useParams } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
/* project */
// import { DataThemesTabs } from "app/modules/data-themes-module/components/tabs";
import { styles } from "app/modules/data-themes-module/components/sub-header/styles";
import {
  DataThemeAPIModel,
  emptyDataThemeAPI,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { DataThemesPageSubHeaderProps } from "app/modules/data-themes-module/components/sub-header/data";

const InfoSnackbar = styled((props) => <Snackbar {...props} />)`
  && {
    bottom: 40px;
  }

  & [class*="MuiSnackbarContent-root"] {
    width: 550px;
    display: flex;
    padding: 0 32px;
    flex-wrap: nowrap;
    background: #f1f3f5;
    border-radius: 25px;
    justify-content: space-between;
    box-shadow: 0 8px 17px -4px rgba(130, 142, 148, 0.35),
      0 0 4px 0 rgba(130, 142, 148, 0.16), 0 0 2px 0 rgba(130, 142, 148, 0.12);

    @media (max-width: 550px) {
      width: calc(100% - 16px);
    }
  }

  & [class*="MuiSnackbarContent-message"] {
    color: #000;
    font-size: 18px;
    padding: 16px 0;
    font-weight: 700;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  }

  & [class*="MuiSnackbarContent-action"] {
    > a {
      color: #fff;
      padding: 10px;
      font-size: 14px;
      font-weight: 700;
      background: #262c34;
      border-radius: 20px;
      text-decoration: none;
      box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    }
  }

  & [class*="MuiSnackbarContent-action"] {
    padding: 16px 0;
  }
`;

export function DataThemesPageSubHeader(props: DataThemesPageSubHeaderProps) {
  const { page } = useParams<{ page: string }>();
  const { data, loading, visualOptions, filterOptionGroups } = props;

  const [title, setTitle] = React.useState("New Theme");
  const [subTitle, setSubTitle] = React.useState("Label");
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [showSnackbar, setShowSnackbar] = React.useState<string | null>(null);

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const loadedDataTheme = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGet.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
  );
  const createDataThemeSuccess = useStoreState(
    (state) => state.dataThemes.DataThemeCreate.success
  );
  const editDataThemeSuccess = useStoreState(
    (state) => state.dataThemes.DataThemeUpdate.success
  );
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const isLiveData = useStoreState(
    (state) => state.dataThemes.sync.liveData.value
  );

  const createDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeCreate.post
  );
  const editDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeUpdate.patch
  );
  const createDataThemeClear = useStoreActions(
    (actions) => actions.dataThemes.DataThemeCreate.clear
  );
  const editDataThemeClear = useStoreActions(
    (actions) => actions.dataThemes.DataThemeUpdate.clear
  );

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleSubTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubTitle(event.target.value);
  }

  function onSave() {
    const dataTheme = {
      title,
      subTitle,
      tabs: [
        {
          title: "Tab 1",
          visualisations: [
            {
              mapping,
              vizType: selectedChartType,
              data,
              vizOptions: visualOptions,
              filterOptionGroups,
              appliedFilters,
              liveData: isLiveData,
            },
          ],
          texts: [],
        },
      ],
    };
    if (isSavedEnabled) {
      if (!isEditMode) {
        createDataTheme({
          values: dataTheme,
        });
      } else {
        editDataTheme({
          patchId: page,
          values: dataTheme,
        });
      }
    }
  }

  React.useEffect(() => {
    setIsSavedEnabled(
      data.length > 0 &&
        !loading &&
        selectedChartType !== "" &&
        selectedChartType !== null &&
        !isEmpty(mapping)
    );
  }, [data, loading, selectedChartType, mapping]);

  React.useEffect(() => {
    setIsEditMode(page !== "new");
  }, [page]);

  React.useEffect(() => {
    if (loadedDataTheme) {
      setTitle(loadedDataTheme.title);
      setSubTitle(loadedDataTheme.subTitle);
    }
  }, [loadedDataTheme]);

  React.useEffect(() => {
    if (createDataThemeSuccess || editDataThemeSuccess) {
      setShowSnackbar("Your Theme has been saved!");
    }
    return () => {
      createDataThemeClear();
      editDataThemeClear();
    };
  }, [createDataThemeSuccess, editDataThemeSuccess]);

  return (
    <div css={styles.container}>
      <InfoSnackbar
        data-testid="data-theme-snackbar"
        onClose={() => setShowSnackbar(null)}
        open={showSnackbar !== null && showSnackbar !== ""}
      >
        <SnackbarContent
          message={showSnackbar}
          action={<Link to="/">Go to my themes</Link>}
          aria-describedby="data-theme-snackbar-content"
        />
      </InfoSnackbar>
      <div css={styles.innercontainer}>
        <div
          css={styles.firstrow}
          style={
            props.previewMode
              ? {
                  pointerEvents: "none",
                }
              : {}
          }
        >
          <div>
            <div>
              <input
                type="text"
                value={title}
                css={styles.titleInput}
                onChange={handleTitleChange}
              />
              <KeyboardArrowDownIcon htmlColor="#262c34" />
            </div>
            <input
              type="text"
              value={subTitle}
              css={styles.subTitleInput}
              onChange={handleSubTitleChange}
            />
          </div>
          {!props.previewMode && (
            <div css={styles.iconbtns}>
              <IconButton>
                <ShareIcon htmlColor="#262c34" />
              </IconButton>
              <IconButton>
                <PlayCircleFilledIcon htmlColor="#262c34" />
              </IconButton>
              <IconButton
                onClick={onSave}
                disabled={!isSavedEnabled}
                css={`
                  opacity: ${isSavedEnabled ? 1 : 0.5};
                `}
              >
                <SaveIcon htmlColor="#262c34" />
              </IconButton>
            </div>
          )}
        </div>
        {/* <div css={styles.secondrow}>
          <DataThemesTabs />
        </div> */}
      </div>
    </div>
  );
}
