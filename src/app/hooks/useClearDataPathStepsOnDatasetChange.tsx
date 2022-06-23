import React from "react";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "app/state/store/hooks";

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

export function useClearDataPathStepsOnDatasetChange() {
  const history = useHistory();

  const [prevLocation, setPrevLocation] = React.useState({
    type: "",
    pathname: "",
  });

  const clearDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.clear
  );

  React.useEffect(() => {
    const newLocation = {
      type: "",
      pathname: location.pathname,
    };
    const splits = location.pathname.split("/");
    if (splits.length > 1) {
      switch (splits[1]) {
        case "viz":
          newLocation.type = splits[2];
          break;
        case "location":
          newLocation.type = splits[3];
          break;
        case "partner":
          newLocation.type = splits[3];
          break;
        case "grant":
          newLocation.type = splits[4];
          break;
        default:
          newLocation.type = "";
      }
    }
    if (newLocation.type !== prevLocation.type) {
      clearDataPathSteps();
    }
    setPrevLocation(newLocation);
  }, [history.location]);

  return null;
}
