/* third-party */
import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import { useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { InvestmentsTable } from "app/modules/viz-module/sub-modules/investments/table";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";

interface Props {
  code?: string;
  type: "Disbursed" | "Signed" | "Commitment";
}

function getTableData(data: DisbursementsTreemapDataItem[]): SimpleTableRow[] {
  const updatedTableData: SimpleTableRow[] = [];
  data.forEach((item: DisbursementsTreemapDataItem) => {
    updatedTableData.push({
      name: item.name,
      grants: sumBy(item.tooltip.componentsStats, "count"),
      signed: formatFinancialValue(item.tooltip.totalInvestments.signed, true),
      committed: formatFinancialValue(
        item.tooltip.totalInvestments.committed,
        true
      ),
      disbursed: formatFinancialValue(
        item.tooltip.totalInvestments.disbursed,
        true
      ),
      children: item._children?.map((child: DisbursementsTreemapDataItem) => ({
        name: child.name,
        grants: sumBy(child.tooltip.componentsStats, "count"),
        signed: formatFinancialValue(
          child.tooltip.totalInvestments.signed,
          true
        ),
        committed: formatFinancialValue(
          child.tooltip.totalInvestments.committed,
          true
        ),
        disbursed: formatFinancialValue(
          child.tooltip.totalInvestments.disbursed,
          true
        ),
      })),
    });
  });
  return updatedTableData;
}

export function PartnerInvestmentsTableWrapper(props: Props) {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  const data = useStoreState((state) => {
    let compData = state.PartnerDetailDisbursementsTreemap.data;
    switch (props.type) {
      case "Signed":
        compData = state.PartnerDetailSignedTreemap.data;
        break;
      case "Commitment":
        compData = state.PartnerDetailCommitmentTreemap.data;
        break;
      default:
        compData = state.PartnerDetailDisbursementsTreemap.data;
    }
    return get(compData, "data", []) as DisbursementsTreemapDataItem[];
  });

  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.PartnerDetailDisbursementsTreemap.fetch;
      case "Signed":
        return store.PartnerDetailSignedTreemap.fetch;
      case "Commitment":
        return store.PartnerDetailCommitmentTreemap.fetch;
      default:
        return store.PartnerDetailDisbursementsTreemap.fetch;
    }
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.PartnerDetailDisbursementsTreemap.loading;
      case "Signed":
        return state.PartnerDetailSignedTreemap.loading;
      case "Commitment":
        return state.PartnerDetailCommitmentTreemap.loading;
      default:
        return state.PartnerDetailDisbursementsTreemap.loading;
    }
  });

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  function reloadData() {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            partners: [...appliedFilters.partners, props.code],
          }
        : appliedFilters,
      { search, sortBy }
    );
    fetchData({ filterString });
  }

  React.useEffect(
    () => reloadData(),
    [props.code, appliedFilters, props.type, sortBy]
  );

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

  const [,] = useDebounce(() => reloadData(), 500, [search]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <InvestmentsTable
      data={tableData}
      search={search}
      sortBy={sortBy}
      isLoading={isLoading}
      setSearch={setSearch}
      setSortBy={setSortBy}
    />
  );
}
