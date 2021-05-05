/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { mockdata } from "app/components/Charts/PledgesContributions/TimeCycle/data";
import { PledgesContributionsTimeCycle } from "app/components/Charts/PledgesContributions/TimeCycle";

export function PledgesContributionsTimeCycleModule() {
  useTitle("The Data Explorer - Pledges & Contributions/Time cycle");

  return (
    <React.Fragment>
      <PledgesContributionsTimeCycle data={mockdata} />
    </React.Fragment>
  );
}
