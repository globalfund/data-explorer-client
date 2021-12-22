import React from "react";
import { RangeSlider } from "app/components/RangeSlider";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export function ToolBoxPanelDisbursementsSlider(props: { label: string }) {
  const max = useStoreState(
    (store) => store.ToolBoxPanelDisbursementsSliderValues.max
  );
  const onValuesChange = useStoreActions(
    (store) => store.ToolBoxPanelDisbursementsSliderValues.setValues
  );

  return (
    <div
      css={`
        width: 100%;
        padding: 15px 25px;
        text-transform: capitalize;
        border-bottom: 1px solid #dfe3e6;
      `}
    >
      <b>{props.label}</b>
      <RangeSlider min={0} max={max} onValuesChange={onValuesChange} />
    </div>
  );
}
