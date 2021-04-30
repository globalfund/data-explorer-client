/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { mockdata } from "app/components/Charts/Investments/TimeCycle/data";
import { InvestmentsTimeCycle } from "app/components/Charts/Investments/TimeCycle";

export function InvestmentsTimeCycleModule() {
  useTitle("The Data Explorer - Investments/Time cycle");

  return (
    <React.Fragment>
      <InvestmentsTimeCycle data={mockdata} />
    </React.Fragment>
  );
}
