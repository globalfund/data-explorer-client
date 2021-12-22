/* third-party */
import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import { useUpdateEffect } from "react-use";
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

export function GenericInvestmentsTableWrapper(props: Props) {
  const data = useStoreState(
    (state) =>
      get(
        state.DisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );

  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  const fetchData = useStoreActions(
    (store) => store.DisbursementsTreemap.fetch
  );
  const isLoading = useStoreState(
    (state) => state.DisbursementsTreemap.loading
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
  }, [props.code, appliedFilters]);

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return <InvestmentsTable data={tableData} isLoading={isLoading} />;
}
