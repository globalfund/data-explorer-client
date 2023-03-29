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
import { InvestmentsTable } from "app/modules/viz-module/sub-modules/investments/table";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";

interface Props {
  code: string;
  implementationPeriod: string;
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

export function GrantDetailInvestmentsTableWrapper(props: Props) {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("grants ASC");

  const data = useStoreState(
    (state) =>
      get(
        state.GrantDetailDisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );

  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  const fetchData = useStoreActions(
    (store) => store.GrantDetailDisbursementsTreemap.fetch
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailDisbursementsTreemap.loading
  );

  function reloadData() {
    if (props.code) {
      let filterString = `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`;
      if (search) {
        filterString += `&q=${search}`;
      }
      if (sortBy) {
        filterString += `&sortBy=${sortBy}`;
      }
      fetchData({ filterString });
    }
  }

  React.useEffect(
    () => reloadData(),
    [props.code, props.implementationPeriod, sortBy]
  );

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

  useUpdateEffect(() => {
    if (search.length === 0) {
      reloadData();
    }
  }, [search]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        reloadData();
      }
    },
    500,
    [search]
  );

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
