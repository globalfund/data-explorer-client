/* third-party */
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export function useDataThemesAddSection(props: { addVizToLocalStates: any }) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );

  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );
  const addVizId = useStoreActions((state) => state.dataThemes.ids.addViz);
  const addVizActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addViz
  );
  const addVizChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.addViz
  );
  const addVizMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addViz
  );
  const addVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addViz
  );
  const addVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addViz
  );
  const addVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.addViz
  );

  function onTextPress() {
    if (history.location.pathname !== `/data-themes/new/initial`) {
      setActiveVizIndex(tabIds[activeTabIndex].length);
      addVizId({ tabIndex: activeTabIndex });
      addVizActivePanel({ tabIndex: activeTabIndex });
      addVizChartType({ tabIndex: activeTabIndex });
      addVizMapping({ tabIndex: activeTabIndex });
      addVizStepSelections({ tabIndex: activeTabIndex });
      addVizAppliedFilters({ tabIndex: activeTabIndex });
      addVizTextContent({ tabIndex: activeTabIndex });
      props.addVizToLocalStates();
    }
    history.push(`/data-themes/${page}/text`);
  }

  function onChartPress() {
    if (history.location.pathname !== `/data-themes/new/initial`) {
      setActiveVizIndex(tabIds[activeTabIndex].length);
      addVizId({ tabIndex: activeTabIndex });
      addVizActivePanel({ tabIndex: activeTabIndex });
      addVizChartType({ tabIndex: activeTabIndex });
      addVizMapping({ tabIndex: activeTabIndex });
      addVizStepSelections({ tabIndex: activeTabIndex });
      addVizAppliedFilters({ tabIndex: activeTabIndex });
      addVizTextContent({ tabIndex: activeTabIndex });
      props.addVizToLocalStates();
    }
    history.push(`/data-themes/${page}/data`);
  }

  return {
    onTextPress,
    onChartPress,
  };
}
