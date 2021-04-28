/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { mockdata } from "app/components/Charts/Budgets/TimeCycle/data";
import { BudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle";

export function BudgetsTimeCycleModule() {
  useTitle("The Data Explorer - Budgets Time/Cycle");
  return <BudgetsTimeCycle data={mockdata} />;
}
