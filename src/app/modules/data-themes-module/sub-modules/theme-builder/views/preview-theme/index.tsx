/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import LockIcon from "@material-ui/icons/Lock";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Redirect, useHistory, useParams } from "react-router-dom";
// @ts-ignore
import { chart as rawChart } from "@rawgraphs/rawgraphs-core";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import Skeleton from "@material-ui/lab/Skeleton";
import { PageLoader } from "app/modules/common/page-loader";
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesTabOrderViz } from "app/modules/data-themes-module/components/order-tab-viz";
import { DataThemesUtilsPopover } from "app/modules/data-themes-module/components/utils-popover";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { RichEditor } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text/RichEditor";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import {
  DataThemesBuilderPreviewThemePageProps,
  DataThemesBuilderPreviewThemeProps,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme/data";

export function DataThemesBuilderPreviewThemePage(
  props: DataThemesBuilderPreviewThemePageProps
) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const activePanels = useStoreState(
    (state) => state.dataThemes.activePanels.value
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const setActiveVizIndex = useStoreActions(
    (actions) => actions.dataThemes.activeVizIndex.setValue
  );

  const copyVizId = useStoreActions((state) => state.dataThemes.ids.addViz);
  const copyVizActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addViz
  );
  const copyVizChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.copyViz
  );
  const copyVizLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.copyViz
  );
  const copyVizMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.copyViz
  );
  const copyVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.copyViz
  );
  const copyVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.copyViz
  );
  const copyVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.copyViz
  );
  const setVizDuplicated = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDuplicated.setValue
  );

  const removeVizId = useStoreActions(
    (state) => state.dataThemes.ids.removeViz
  );
  const removeVizMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.removeViz
  );
  const removeVizActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.removeViz
  );
  const removeVizChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.removeViz
  );
  const removeVizLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.removeViz
  );
  const removeVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.removeViz
  );
  const removeVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.removeViz
  );
  const removeVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.removeViz
  );
  const setVizDeleted = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDeleted.setValue
  );

  function duplicateViz(tabIndex: number, vizIndex: number) {
    copyVizId({ tabIndex });
    copyVizActivePanel({ tabIndex });
    copyVizChartType({ tabIndex, vizIndex });
    copyVizLiveData({ tabIndex, vizIndex });
    copyVizMapping({ tabIndex, vizIndex });
    copyVizStepSelections({ tabIndex, vizIndex });
    copyVizAppliedFilters({ tabIndex, vizIndex });
    copyVizTextContent({ tabIndex, vizIndex });

    let tmpVisualOptions: any = [...props.visualOptions];
    tmpVisualOptions[tabIndex].push(tmpVisualOptions[tabIndex][vizIndex]);
    props.setVisualOptions(tmpVisualOptions);

    let tmpCurrentChart: any = [...props.currentChart];
    tmpCurrentChart[tabIndex].push(tmpCurrentChart[tabIndex][vizIndex]);
    props.setCurrentChart(tmpCurrentChart);

    let tmpCurrentChartData: any = [...props.currentChartData];
    tmpCurrentChartData[tabIndex].push(tmpCurrentChartData[tabIndex][vizIndex]);
    props.setCurrentChartData(tmpCurrentChartData);
    let tmpRawData = [...props.rawData];
    tmpRawData[tabIndex].push(tmpRawData[tabIndex][vizIndex]);
    props.setRawData(tmpRawData);
    setVizDuplicated(true);
  }

  function deleteViz(tabIndex: number, vizIndex: number) {
    let tmpRawData = [...props.rawData];
    let tmpVisualOptions: any = [...props.visualOptions];
    let tmpCurrentChartData: any = [...props.currentChartData];
    if (
      tmpRawData[tabIndex] &&
      tmpRawData[tabIndex][vizIndex] &&
      tmpVisualOptions[tabIndex] &&
      tmpVisualOptions[tabIndex][vizIndex] &&
      tmpCurrentChartData[tabIndex] &&
      tmpCurrentChartData[tabIndex][vizIndex]
    ) {
      tmpRawData[tabIndex].splice(vizIndex, 1);
      props.setRawData(tmpRawData);
      tmpVisualOptions[tabIndex].splice(vizIndex, 1);
      props.setVisualOptions(tmpVisualOptions);
      tmpCurrentChartData[tabIndex].splice(vizIndex, 1);
      props.setCurrentChartData(tmpCurrentChartData);
      removeVizId({ tabIndex, vizIndex });
      removeVizActivePanel({ tabIndex, vizIndex });
      removeVizChartType({ tabIndex, vizIndex });
      removeVizLiveData({ tabIndex, vizIndex });
      removeVizMapping({ tabIndex, vizIndex });
      removeVizStepSelections({ tabIndex, vizIndex });
      removeVizAppliedFilters({ tabIndex, vizIndex });
      removeVizTextContent({ tabIndex, vizIndex });
    }
    if (tmpRawData[tabIndex].length === 0) {
      props.addVizToLocalStates();
      history.push(`/data-themes/${page}/initial`);
    } else {
      setVizDeleted(true);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (
        !props.loading &&
        !props.isEditMode &&
        vizIsTextContent[activeTabIndex][0] &&
        activeVizIndex === 0
      ) {
        let pass = false;
        let nextVizIndex = activeVizIndex + 1;
        while (!pass) {
          const cond = vizIsTextContent[activeTabIndex][nextVizIndex];
          if (cond === undefined) {
            pass = true;
          } else if (cond === false) {
            setActiveVizIndex(nextVizIndex);
            pass = true;
          }
          nextVizIndex += 1;
        }
      }
    }, 500);
  }, [vizIsTextContent, activeTabIndex]);

  if (
    page === "new" &&
    activePanels[activeTabIndex][activeVizIndex] < 3 &&
    (activePanels[activeTabIndex][activeVizIndex] > 1
      ? !props.validMapping
      : true) &&
    !vizIsTextContent[activeTabIndex][activeVizIndex]
  ) {
    return <Redirect to="/data-themes/new/initial" />;
  }
  return (
    <React.Fragment>
      {props.loading ? (
        <PageLoader />
      ) : (
        <React.Fragment>
          <DataThemesTabOrderViz enabled={props.isEditMode}>
            {props.rawData[activeTabIndex].map((_, vizIndex) => (
              <DataThemesBuilderPreviewTheme
                key={Math.random().toString(36).substring(7)}
                editable={props.isEditMode}
                tabIndex={activeTabIndex}
                vizIndex={vizIndex}
                data={props.rawData[activeTabIndex][vizIndex].data}
                loading={props.loading}
                currentChart={props.currentChart[activeTabIndex][vizIndex]}
                visualOptions={props.visualOptions}
                setVisualOptions={props.setVisualOptions}
                currentChartData={
                  props.currentChartData[activeTabIndex][vizIndex]
                }
                deleteViz={deleteViz}
                duplicateViz={duplicateViz}
              />
            ))}
          </DataThemesTabOrderViz>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export function DataThemesBuilderPreviewTheme(
  props: DataThemesBuilderPreviewThemeProps
) {
  useTitle("Data Themes - Preview Theme");

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { page } = useParams<{ page: string }>();
  const history = useHistory();

  const { visualOptions, setVisualOptions } = props;

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDeleteItem() {
    props.deleteViz(props.tabIndex, props.vizIndex);
    handleClose();
  }

  function handleDuplicateItem() {
    props.duplicateViz(props.tabIndex, props.vizIndex);
    handleClose();
  }

  function handleEdit() {
    if (vizIsTextContent[props.tabIndex][props.vizIndex]) {
      handleTextClick();
    } else {
      handleVizClick();
    }
  }

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      get(
        visualOptions,
        `[${props.tabIndex}][${props.vizIndex}].width`,
        100
      ) === CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [...visualOptions];
      tmpVisualOptions[props.tabIndex][props.vizIndex] = {
        ...visualOptions[props.tabIndex][props.vizIndex],
        width: containerRef.current.clientWidth,
      };
      setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    if (
      !vizIsTextContent[props.tabIndex][props.vizIndex] &&
      domRef &&
      domRef.current &&
      !isEmpty(mapping[props.tabIndex][props.vizIndex]) &&
      !isEmpty(visualOptions[props.tabIndex][props.vizIndex])
    ) {
      try {
        const viz = rawChart(props.currentChart, {
          data: props.currentChartData.dataset,
          mapping: mapping[props.tabIndex][props.vizIndex],
          visualOptions: visualOptions[props.tabIndex][props.vizIndex],
          dataTypes: props.currentChartData.dataTypes,
        });

        const vizData = viz._getVizData();

        const loader = document.getElementById(
          `chart-placeholder-${props.tabIndex}-${props.vizIndex}`
        );
        const lockBtn = document.getElementById(
          `lock-button-${props.tabIndex}-${props.vizIndex}`
        );

        new Promise((resolve, reject) => {
          try {
            if (lockBtn) {
              lockBtn.style.visibility = "hidden";
            }
            if (loader) {
              loader.style.display = "flex";
            }
            const rawViz = viz.renderToDOM(domRef.current, vizData);
            resolve(1);
          } catch (e) {
            if (process.env.NODE_ENV === "development") {
              console.log("chart error", e);
            }

            if (loader) {
              loader.style.display = "none";
            }
            reject(0);
          }
        })
          .then(() => {
            if (loader) {
              loader.style.display = "none";
            }
            if (lockBtn) {
              lockBtn.style.visibility = "visible";
            }
          })
          .catch(() => {
            if (loader) {
              loader.style.display = "none";
            }
          });
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
    // else if (props.data.length === 0) {
    //   const loader = document.getElementById(
    //     `chart-placeholder-${props.tabIndex}-${props.vizIndex}`
    //   );
    //   if (loader) {
    //     loader.style.display = "none";
    //   }
    // }
  }, [
    // props.data,
    props.currentChart,
    props.currentChartData,
    mapping,
    visualOptions,
  ]);

  const handleVizClick = () => {
    if (page === "new" || props.editable) {
      setActiveVizIndex(props.vizIndex);
      history.push(`/data-themes/${page}/customize`);
    }
  };

  const handleTextClick = () => {
    if (page === "new" || props.editable) {
      setActiveVizIndex(props.vizIndex);
      history.push(`/data-themes/${page}/text`);
    }
  };

  return (
    <div css={props.vizIndex === 0 ? commonStyles.container : ""}>
      {vizIsTextContent[props.tabIndex][props.vizIndex] ? (
        <div
          onClick={handleTextClick}
          css={commonStyles.previewInnercontainer(props.editable)}
        >
          {props.editable && <div onClick={handleClick} />}
          <RichEditor
            editMode={false}
            tabIndex={props.tabIndex}
            vizIndex={props.vizIndex}
          />
        </div>
      ) : (
        <React.Fragment>
          <div
            id={`chart-placeholder-${props.tabIndex}-${props.vizIndex}`}
            css={`
              display: flex;
              padding: 0 24px;
              margin-top: 20px;
              max-width: 1280px;
              align-items: center;
              align-self: flex-start;
              justify-content: center;
              width: calc(100vw - ((100vw - 1280px) / 2) - 400px - 24px);
              height: ${get(
                visualOptions,
                `[${props.tabIndex}][${props.vizIndex}].height`,
                100
              )}px;

              @media (max-width: 1280px) {
                width: calc(100vw - 400px);
              }

              .MuiSkeleton-wave::after {
                background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(223, 227, 230, 1),
                  transparent
                );
              }

              .MuiSkeleton-root {
                background: transparent;
              }
            `}
          >
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="100%"
            />
          </div>
          <div css={commonStyles.previewInnercontainer(props.editable)}>
            {props.editable && <div onClick={handleClick} />}
            <div
              ref={containerRef}
              css={`
                position: relative;
                width: calc(100% - 24px);
              `}
            >
              <Tooltip
                title={
                  props.vizIndex !== activeVizIndex
                    ? "Enable filters for this visualisation"
                    : ""
                }
              >
                <IconButton
                  id={`lock-button-${props.tabIndex}-${props.vizIndex}`}
                  onClick={() => {
                    setActiveVizIndex(props.vizIndex);
                  }}
                  css={`
                    top: 10px;
                    right: 10px;
                    padding: 5px;
                    visibility: hidden;
                    position: absolute;
                    background: #262c34;

                    &:hover {
                      background: #262c34;
                    }
                  `}
                  disableTouchRipple
                  disableRipple
                >
                  {props.vizIndex === activeVizIndex ? (
                    <LockIcon htmlColor="#fff" />
                  ) : (
                    <LockOpenIcon htmlColor="#fff" />
                  )}
                </IconButton>
              </Tooltip>
              <div
                ref={domRef}
                onClick={handleVizClick}
                css={`
                  overflow-x: auto;

                  * {
                    font-family: "GothamNarrow-Book", "Helvetica Neue",
                      sans-serif !important;
                  }
                `}
              />
            </div>
          </div>
        </React.Fragment>
      )}
      <DataThemesUtilsPopover
        anchorEl={anchorEl}
        onEdit={handleEdit}
        handleClose={handleClose}
        deleteItem={handleDeleteItem}
        duplicateItem={handleDuplicateItem}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      />
    </div>
  );
}
