/* third-party */
import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { useUpdateEffect } from "react-use";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getIso3FromName } from "app/utils/getIso3FromName";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/interfaces";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

interface Props {
  code?: string;
  toolboxOpen?: boolean;
  type: "Disbursed" | "Signed" | "Commitment";
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function GenericInvestmentsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Investments/Time cycle");

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    dataPathSteps[dataPathSteps.length - 1]?.vizSelected?.filterStr
  );
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<
    string | undefined
  >(dataPathSteps[dataPathSteps.length - 1]?.drilldownVizSelected?.filterStr);
  const [vizLevel, setVizLevel] = React.useState(0);

  React.useEffect(() => {
    const newVizSelected =
      dataPathSteps[dataPathSteps.length - 1]?.vizSelected?.filterStr;
    const newDrilldownVizSelected =
      dataPathSteps[dataPathSteps.length - 1]?.drilldownVizSelected?.filterStr;
    if (!isEqual(newVizSelected, vizSelected)) {
      setVizSelected(newVizSelected);
    }
    if (!isEqual(newDrilldownVizSelected, drilldownVizSelected)) {
      setDrilldownVizSelected(newDrilldownVizSelected);
    }
    if (newDrilldownVizSelected) {
      setVizLevel(2);
    } else if (newVizSelected) {
      setVizLevel(1);
    } else {
      setVizLevel(0);
    }
  }, [dataPathSteps]);

  // api call & data
  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTimeCycle.fetch;
      case "Signed":
        return store.SignedTimeCycle.fetch;
      case "Commitment":
        return store.CommitmentTimeCycle.fetch;
      default:
        return store.DisbursementsTimeCycle.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.DisbursementsTimeCycle.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTimeCycle.data;
        break;
      case "Commitment":
        compData = state.CommitmentTimeCycle.data;
        break;
      default:
        compData = state.DisbursementsTimeCycle.data;
    }
    return get(compData, "data", []) as Record<string, unknown>[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTimeCycle.loading;
      case "Signed":
        return state.SignedTimeCycle.loading;
      case "Commitment":
        return state.CommitmentTimeCycle.loading;
      default:
        return state.DisbursementsTimeCycle.loading;
    }
  });
  const fetchDrilldownData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTimeCycleDrilldown.fetch;
      case "Signed":
        return store.SignedTimeCycleDrilldown.fetch;
      case "Commitment":
        return store.CommitmentTimeCycleDrilldown.fetch;
      default:
        return store.DisbursementsTimeCycleDrilldown.fetch;
    }
  });
  const drilldownData = useStoreState((state) => {
    let compData = state.DisbursementsTimeCycleDrilldown.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTimeCycleDrilldown.data;
        break;
      case "Commitment":
        compData = state.CommitmentTimeCycleDrilldown.data;
        break;
      default:
        compData = state.DisbursementsTimeCycleDrilldown.data;
    }
    return get(compData, "data", []) as BudgetsTreemapDataItem[];
  });
  const isDrilldownLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTimeCycleDrilldown.loading;
      case "Signed":
        return state.SignedTimeCycleDrilldown.loading;
      case "Commitment":
        return state.CommitmentTimeCycleDrilldown.loading;
      default:
        return state.DisbursementsTimeCycleDrilldown.loading;
    }
  });
  const fetchDrilldown2Data = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTimeCycleDrilldown2.fetch;
      case "Signed":
        return store.SignedTimeCycleDrilldown2.fetch;
      case "Commitment":
        return store.CommitmentTimeCycleDrilldown2.fetch;
      default:
        return store.DisbursementsTimeCycleDrilldown2.fetch;
    }
  });
  const drilldown2Data = useStoreState((state) => {
    let compData = state.DisbursementsTimeCycleDrilldown2.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTimeCycleDrilldown2.data;
        break;
      case "Commitment":
        compData = state.CommitmentTimeCycleDrilldown2.data;
        break;
      default:
        compData = state.DisbursementsTimeCycleDrilldown2.data;
    }
    return get(compData, "data", []) as BudgetsTreemapDataItem[];
  });
  const isDrilldown2Loading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTimeCycleDrilldown2.loading;
      case "Signed":
        return state.SignedTimeCycleDrilldown2.loading;
      case "Commitment":
        return state.CommitmentTimeCycleDrilldown2.loading;
      default:
        return state.DisbursementsTimeCycleDrilldown2.loading;
    }
  });
  const dataPathActiveStep = useStoreState(
    (state) => state.DataPathActiveStep.step
  );
  const clearDataPathActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.clear
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters, props.type]);

  useUpdateEffect(() => {
    if (vizSelected && vizLevel === 1) {
      let filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      if (filterString) {
        filterString += `&barPeriod=${vizSelected}`;
      } else {
        filterString = `barPeriod=${vizSelected}`;
      }
      fetchDrilldownData({ filterString });
    } else if (drilldownVizSelected && vizLevel === 2) {
      const splits = drilldownVizSelected.split("-");
      const location = getIso3FromName(splits[0]);
      const component = splits[1];
      let filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code, location],
              components: [...appliedFilters.components, component],
            }
          : {
              ...appliedFilters,
              locations: [...appliedFilters.locations, location],
              components: [...appliedFilters.components, component],
            }
      );
      if (filterString) {
        filterString += `&barPeriod=${vizSelected}`;
      } else {
        filterString = `barPeriod=${vizSelected}`;
      }
      fetchDrilldown2Data({ filterString });
    }
  }, [vizSelected, drilldownVizSelected]);

  React.useEffect(() => {
    if (dataPathActiveStep) {
      if (dataPathActiveStep.vizSelected) {
        setVizLevel(1);
        setVizSelected(dataPathActiveStep.vizSelected.id);
        clearDataPathActiveStep();
      } else if (!dataPathActiveStep.vizSelected && vizSelected) {
        setVizLevel(0);
        setVizSelected(undefined);
        clearDataPathActiveStep();
      }
    }
  }, [dataPathActiveStep]);

  return (
    <InvestmentsTimeCycleModule
      data={data}
      isDrilldownLoading={isDrilldownLoading}
      isLocationDetail={props.code !== undefined}
      codeParam={props.code}
      drilldownData={drilldownData}
      isLoading={isLoading}
      type={props.type}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      toolboxOpen={props.toolboxOpen}
      setOpenToolboxPanel={props.setOpenToolboxPanel}
      isDrilldown2Loading={isDrilldown2Loading}
      drilldown2Data={drilldown2Data}
      drilldownVizSelected={drilldownVizSelected}
      setDrilldownVizSelected={setDrilldownVizSelected}
    />
  );
}
