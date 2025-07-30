import get from "lodash/get";
import find from "lodash/find";
import { useStoreState } from "app/state/store/hooks";

export const useGetDatasetLatestUpdate = (props: {
  dataset:
    | "allocations"
    | "budgets"
    | "disbursements"
    | "eligibility"
    | "expenditures"
    | "funding_requests"
    | "geographies"
    | "grants"
    | "pledges-contributions"
    | "results";
}) => {
  const datasetsLatestUpdate = useStoreState(
    (state) =>
      get(state.datasetsLatestUpdate, "data.data", []) as {
        name: string;
        date: string;
      }[],
  );

  if (datasetsLatestUpdate) {
    return find(datasetsLatestUpdate, { name: props.dataset })?.date;
  }

  return "";
};
