import React from "react";
import find from "lodash/find";
import { useHistory } from "react-router-dom";
import { DrilldownModelUpdated } from "app/interfaces";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

/*
    app route templates
    /
    /about
    /datasets
    /grants
    /results
    /documents
    /viz/vizType/subType
    /location/code/vizType/subType
    /partner/code/vizType/subType
    /grant/code/period/vizType/subType
*/

const irrelevantPaths = [
  "/",
  "/about",
  "/datasets",
  "/grants",
  "/grants/table",
  "/results",
  "/documents",
];

export function useClearDataPathStepsOnDatasetChange() {
  const history = useHistory();

  const [prevLocation, setPrevLocation] = React.useState({
    type: "",
    pathname: "",
    view: "",
  });

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );
  const clearDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.clear
  );

  React.useEffect(() => {
    const newLocation = {
      type: "",
      pathname: location.pathname,
      view: "",
    };
    const splits = location.pathname.split("/");
    if (splits.length > 1) {
      switch (splits[1]) {
        case "viz":
          newLocation.type = splits[2];
          newLocation.view = splits[3];
          break;
        case "location":
        case "partner":
          newLocation.type = splits[3];
          newLocation.view = splits[4];
          break;
        case "grant":
          newLocation.type = splits[4];
          newLocation.view = splits[5];
          break;
        default:
          newLocation.type = "";
      }
    }
    if (dataPathSteps.length > 0) {
      if (
        newLocation.type !== prevLocation.type ||
        irrelevantPaths.indexOf(newLocation.pathname) > -1
      ) {
        clearDataPathSteps();
      } else if (
        newLocation.type === prevLocation.type &&
        newLocation.view !== prevLocation.view
      ) {
        const sliceIndex = find(
          dataPathSteps,
          (step: DrilldownModelUpdated) => {
            return Boolean(step.drilldownVizSelected);
          }
        )
          ? 2
          : 1;
        const newDataPathSteps = dataPathSteps.slice(0, sliceIndex * -1);
        if (newDataPathSteps.length > 0) {
          newDataPathSteps[newDataPathSteps.length - 1].path =
            location.pathname;
          setDataPathSteps(newDataPathSteps);
        }
      }
    }
    setPrevLocation(newLocation);
  }, [history.location]);

  return null;
}
