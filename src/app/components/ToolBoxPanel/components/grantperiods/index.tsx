import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useStoreState } from "app/state/store/hooks";
import { useParams, useHistory } from "react-router-dom";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

interface GrantDetailPeriod {
  number: number;
  endDate: string;
  startDate: string;
}

export function GrantImplementationPeriods() {
  const history = useHistory();
  const params = useParams<{ code: string; period: string; vizType: string }>();

  const periods = useStoreState(
    (state) =>
      get(state.GrantDetailPeriods.data, "data", []) as GrantDetailPeriod[]
  );

  const selectedPeriod = find(
    periods,
    (p: GrantDetailPeriod) => p.number.toString() === params.period
  ) || { startDate: "", endDate: "" };

  function onSelectedPeriodChange(period: string) {
    const fPeriod = find(
      periods,
      (p: GrantDetailPeriod) => `${p.startDate} - ${p.endDate}` === period
    );
    if (fPeriod) {
      history.push(
        history.location.pathname.replace(
          `/${params.period}/`,
          `/${fPeriod.number.toString()}/`
        )
      );
    }
  }

  return (
    <ToolBoxPanelAggregateBy
      title="Implementation Period"
      setSelected={onSelectedPeriodChange}
      selected={`${selectedPeriod.startDate} - ${selectedPeriod.endDate}`}
      options={periods.map((p: GrantDetailPeriod) => ({
        label: `${p.startDate} - ${p.endDate}`,
        value: `${p.startDate} - ${p.endDate}`,
      }))}
    />
  );
}
