/* third-party */
import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code?: string;
  toolboxOpen?: boolean;
  type: "Disbursed" | "Signed" | "Commitment";
}

export function GenericInvestmentsDisbursedWrapper(props: Props) {
  const [vizLevel, setVizLevel] = React.useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTreemap.fetch;
      case "Signed":
        return store.SignedTreemap.fetch;
      case "Commitment":
        return store.CommitmentTreemap.fetch;
      default:
        return store.DisbursementsTreemap.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.DisbursementsTreemap.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTreemap.data;
        break;
      case "Commitment":
        compData = state.CommitmentTreemap.data;
        break;
      default:
        compData = state.DisbursementsTreemap.data;
    }
    return get(compData, "data", []) as DisbursementsTreemapDataItem[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTreemap.loading;
      case "Signed":
        return state.SignedTreemap.loading;
      case "Commitment":
        return state.DisbursementsTreemap.loading;
      default:
        return state.DisbursementsTreemap.loading;
    }
  });
  const fetchDrilldownData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTreemapDrilldown.fetch;
      case "Signed":
        return store.SignedTreemapDrilldown.fetch;
      case "Commitment":
        return store.CommitmentTreemapDrilldown.fetch;
      default:
        return store.DisbursementsTreemapDrilldown.fetch;
    }
  });
  const drilldownData = useStoreState((state) => {
    let compData = state.DisbursementsTreemapDrilldown.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTreemapDrilldown.data;
        break;
      case "Commitment":
        compData = state.CommitmentTreemapDrilldown.data;
        break;
      default:
        compData = state.DisbursementsTreemapDrilldown.data;
    }
    return get(compData, "data", []) as DisbursementsTreemapDataItem[];
  });
  const isDrilldownLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTreemapDrilldown.loading;
      case "Signed":
        return state.SignedTreemapDrilldown.loading;
      case "Commitment":
        return state.CommitmentTreemapDrilldown.loading;
      default:
        return state.DisbursementsTreemapDrilldown.loading;
    }
  });

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
    if (vizSelected) {
      const splits = vizSelected.split("-");
      let filterString = "";
      if (splits.length > 0) {
        if (!isMobile) {
          const locations = [...appliedFilters.locations];
          if (props.code) {
            locations.push(props.code);
          }
          locations.push(splits[0]);
          filterString = getAPIFormattedFilters({
            ...appliedFilters,
            locations,
          });
        } else {
          const locations = [...appliedFilters.locations];
          const components = [...appliedFilters.components];
          if (props.code) {
            locations.push(props.code);
          }
          components.push(splits[0]);
          filterString = getAPIFormattedFilters({
            ...appliedFilters,
            locations,
            components,
          });
        }
        fetchDrilldownData({ filterString });
      }
    }
  }, [vizSelected]);

  return (
    <InvestmentsDisbursedModule
      data={data}
      allowDrilldown
      type={props.type}
      vizLevel={vizLevel}
      isLoading={isLoading}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      drilldownData={drilldownData}
      setVizSelected={setVizSelected}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      isDrilldownLoading={isDrilldownLoading}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
