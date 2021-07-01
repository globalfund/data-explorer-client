/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { ScatterPlot } from "app/components/Charts/Eligibility/Scatterplot";
import { EligibilityScatterplotDataModel } from "app/components/Charts/Eligibility/Scatterplot/data";

interface Props {
  code: string;
}

export function LocationDetailEligibilityWrapper(props: Props) {
  useTitle("The Data Explorer - Location Eligibility");

  // api call & data
  const fetchData = useStoreActions((store) => store.EligibilityCountry.fetch);
  const data = useStoreState(
    (state) =>
      get(
        state.EligibilityCountry.data,
        "data",
        []
      ) as EligibilityScatterplotDataModel[]
  );
  const isLoading = useStoreState((state) => state.EligibilityCountry.loading);

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `locations=${props.code}`,
      });
    }
  }, [props.code]);

  if (isLoading) {
    <PageLoader />;
  }

  return <ScatterPlot data={data} />;
}
