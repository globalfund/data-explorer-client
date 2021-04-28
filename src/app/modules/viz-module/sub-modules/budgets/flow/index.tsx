/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";

export function BudgetsFlowModule() {
  useTitle("The Data Explorer - Budgets Flow");
  return <BudgetsFlow />;
}
