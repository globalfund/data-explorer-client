import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { styles } from "app/modules/data-themes-module/components/tabs/styles";

export function DataThemesTabs(props: any) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );

  const setActiveTabIndex = useStoreActions(
    (state) => state.dataThemes.activeTabIndex.setValue
  );
  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );
  const addTabId = useStoreActions((state) => state.dataThemes.ids.addTab);
  const addTabActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addTab
  );
  const addTabChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.addTab
  );
  const addTabLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.addTab
  );
  const addTabMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addTab
  );
  const addTabStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addTab
  );
  const addTabAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addTab
  );
  const addTabTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.addTab
  );

  const tabTitles = useStoreState((state) => state.dataThemes.titles.tabTitles);
  const setTabTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTabTitle
  );
  const addTabTitles = useStoreActions(
    (actions) => actions.dataThemes.titles.addTab
  );

  function onAdd() {
    setActiveVizIndex(0); // default select the fist viz.
    setActiveTabIndex(tabIds.length);
    addTabId();
    addTabActivePanel();
    addTabChartType();
    addTabLiveData();
    addTabMapping();
    addTabStepSelections();
    addTabAppliedFilters();
    addTabTitles();
    addTabTextContent();
    props.updateLocalStates(true);
    history.push(`/data-themes/${page}/initial`);
  }

  function onTabClick(tab: number) {
    if (activeTabIndex !== tab) {
      // only change when necessary
      setActiveTabIndex(tab);
      setActiveVizIndex(0); // default select the fist viz.
    }
  }

  return (
    <div css={styles.container}>
      <div css={styles.innertabscontainer}>
        {tabIds.map((_: number[], index: number) => (
          <div
            key={index}
            css={styles.tab(
              index === activeTabIndex,
              props.disabled && !props.previewMode,
              props.previewMode,
              tabIds.length === 1
            )}
            onClick={
              props.disabled && !props.previewMode
                ? () => {}
                : () => onTabClick(index)
            }
          >
            {activeTabIndex !== index || props.previewMode ? (
              <div>{tabTitles[index]}</div>
            ) : (
              <input
                type="text"
                css={styles.tabTitle}
                value={tabTitles[index]}
                onChange={(event) => {
                  setTabTitle({
                    tabIndex: index,
                    tabTitle: event.target.value,
                  });
                }}
              />
            )}
            {!props.previewMode && (
              <KeyboardArrowDownIcon htmlColor="#262c34" />
            )}
          </div>
        ))}
      </div>
      {!props.previewMode && (
        <div
          css={props.disabled ? styles.addbtnDisabled : styles.addbtn}
          onClick={props.disabled ? () => {} : onAdd}
        >
          <AddCircleOutlineIcon htmlColor="#262c34" />
        </div>
      )}
    </div>
  );
}
