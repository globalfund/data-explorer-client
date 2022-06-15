/* third-party */
import React from "react";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { AddIcon } from "app/assets/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link, useHistory, useParams } from "react-router-dom";
/* project */
import { styles } from "app/modules/data-themes-module/components/add-section-button/styles";
import { DataThemesAddSectionButtonProps } from "app/modules/data-themes-module/components/add-section-button/data";

export function DataThemesAddSectionButton(
  props: DataThemesAddSectionButtonProps
) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const [open, setOpen] = React.useState(false);

  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);

  const setActiveVizIndex = useStoreActions((state) => state.dataThemes.activeVizIndex.setValue);
  const addVizId = useStoreActions((state) => state.dataThemes.ids.addViz);
  const addVizChartType = useStoreActions((state) => state.dataThemes.sync.chartType.addViz);
  const addVizLiveData = useStoreActions((state) => state.dataThemes.sync.liveData.addViz);
  const addVizMapping = useStoreActions((state) => state.dataThemes.sync.mapping.addViz);
  const addVizStepSelections = useStoreActions((state) => state.dataThemes.sync.stepSelections.addViz);
  const addVizAppliedFilters = useStoreActions((state) => state.dataThemes.appliedFilters.addViz);


  React.useEffect(() => {
    history.listen(() => setOpen(false));
  }, [history]);

  function onChartPress() {
    if (history.location.pathname !== `/data-themes/new/initial`) {
      setActiveVizIndex(tabIds[activeTabIndex].length);
      addVizId({tabIndex: activeTabIndex});
      addVizChartType({tabIndex: activeTabIndex});
      addVizLiveData({tabIndex: activeTabIndex});
      addVizMapping({tabIndex: activeTabIndex});
      addVizStepSelections({tabIndex: activeTabIndex});
      addVizAppliedFilters({tabIndex: activeTabIndex});
      props.addVizToLocalStates();
    }
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div
      css={styles.container(props.showCreateYourStoryText ? "top" : "bottom")}
    >
      <div css={styles.innercontainer}>
        <IconButton
          onClick={() => setOpen(!open)}
          css={`
            > span:first-of-type {
              background: #fff;
              border-radius: 50%;
            }

            svg {
              transform: rotate(${open ? 45 : 0}deg);
              transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            }
          `}
        >
          <AddIcon />
        </IconButton>
        {open && (
          <div css={styles.contenttypeicons}>
            <IconButton onClick={onChartPress}>
              <BarChartIcon htmlColor="#373D43" />
            </IconButton>
            <IconButton>
              <SearchIcon htmlColor="#373D43" />
            </IconButton>
            <IconButton>
              <DashboardIcon htmlColor="#373D43" />
            </IconButton>
          </div>
        )}
        {!open && props.showCreateYourStoryText && "Create your story"}
      </div>
    </div>
  );
}
