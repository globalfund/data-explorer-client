import React from "react";
import { useStoreActions } from "app/state/store/hooks";

export const useInitialLoad = () => {
  const fetchAllocationsCycles = useStoreActions(
    (actions) => actions.AllocationsCycles.fetch
  );
  const fetchAnnualResultsCycles = useStoreActions(
    (actions) => actions.AnnualResultsCycles.fetch
  );
  const fetchDisbursementsCycles = useStoreActions(
    (actions) => actions.DisbursementsCycles.fetch
  );
  const fetchExpendituresCycles = useStoreActions(
    (actions) => actions.ExpendituresCycles.fetch
  );
  const fetchPledgesContributionsCycles = useStoreActions(
    (actions) => actions.PledgesContributionsCycles.fetch
  );
  const fetchFundingRequestsCycles = useStoreActions(
    (actions) => actions.FundingRequestsCycles.fetch
  );
  const fetchBudgetsCycles = useStoreActions(
    (actions) => actions.BudgetsCycles.fetch
  );

  React.useEffect(() => {
    fetchAllocationsCycles({});
    fetchAnnualResultsCycles({});
    fetchDisbursementsCycles({});
    fetchExpendituresCycles({});
    fetchPledgesContributionsCycles({});
    fetchFundingRequestsCycles({});
    fetchBudgetsCycles({});
  }, []);

  return null;
};
