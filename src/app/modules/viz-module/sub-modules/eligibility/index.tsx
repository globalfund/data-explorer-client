/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { DotChart } from "app/components/Charts/Eligibility/DotChart";

export function EligibilityModule() {
  useTitle("The Data Explorer - Eligibility");

  return <DotChart aggregateBy="component" />;
}
