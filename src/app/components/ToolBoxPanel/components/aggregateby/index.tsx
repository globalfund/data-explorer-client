import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { appColors } from "app/theme";
import { Dropdown } from "app/components/Dropdown";
import { ViewModel } from "app/components/ToolBoxPanel/utils/getControlItems";

interface ToolBoxPanelAggregateByProps {
  title: string;
  selected: string;
  options: ViewModel[];
  setSelected: (value: string) => void;
}

export function ToolBoxPanelAggregateBy(props: ToolBoxPanelAggregateByProps) {
  const value = get(
    find(props.options, { value: props.selected }),
    "label",
    props.selected
  );

  function handleChange(valueLabel: string) {
    const newValue = get(
      find(props.options, { label: valueLabel }),
      "value",
      null
    );
    if (newValue && newValue !== value) {
      props.setSelected(newValue);
    }
  }

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        padding: 15px 25px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid
          ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR};

        @media (max-width: 767px) {
          padding: 16px;
        }
      `}
    >
      <b>{props.title}</b>
      <div
        css={`
          @media (max-width: 767px) {
            max-width: 50%;

            > div {
              width: 100%;
            }

            .MuiSelect-root {
              font-size: 12px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        `}
      >
        <Dropdown
          value={value}
          handleChange={handleChange}
          options={props.options.map((option: ViewModel) => option.label)}
        />
      </div>
    </div>
  );
}
