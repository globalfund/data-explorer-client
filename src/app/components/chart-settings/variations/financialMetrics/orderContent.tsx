import React from "react";
import { ChartSettingsSortByOrderProps } from "app/components/chart-settings/sort-by/data";
import { ChartSettingsSortByOrder } from "app/components/chart-settings/sort-by/sortByOrder";

export default function FinancialMetricsOrderContent(
  props: ChartSettingsSortByOrderProps
) {
  return (
    <React.Fragment>
      <ChartSettingsSortByOrder {...props} secondary />
    </React.Fragment>
  );
}
