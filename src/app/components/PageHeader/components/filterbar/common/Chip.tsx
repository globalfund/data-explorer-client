import React from "react";
import sortBy from "lodash/sortBy";
import { css } from "styled-components/macro";
import { Chip as MUIChip } from "@material-ui/core";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { ChipModel } from "app/components/PageHeader/components/filterbar/data";

const chipstyle = css`
  && {
    height: unset;
    color: #231d2c;
    font-size: 14px;
    min-height: 32px;
    line-height: 17px;
    font-weight: bold;
    background-color: #dfe3e6;

    .MuiChip-label {
      padding-top: 7px;
      padding-bottom: 7px;
      white-space: break-spaces;
    }

    .MuiChip-deleteIcon {
      color: #231d2c;
    }

    .MuiChip-label {
      white-space: nowrap;
    }
  }
`;

interface ChipProps extends ChipModel {
  onDelete: (chip: ChipModel) => void;
}

export const Chip = (props: ChipProps) => {
  const [label, setLabel] = React.useState(props.label);
  const [expanded, setExpanded] = React.useState(false);

  function handleClick() {
    if (expanded) {
      setLabel(props.label);
    } else {
      setLabel(
        sortBy(
          props.values.map(
            (value: { label: string; value: string }) => value.label
          )
        ).join(", ")
      );
    }
    setExpanded(!expanded);
  }

  React.useEffect(() => setLabel(props.label), [props.label]);

  return (
    <MUIChip
      label={
        <div
          css={`
            gap: 10px;
            display: flex;

            > * {
              @supports (-webkit-touch-callout: none) and
                (not (translate: none)) {
                &:not(:last-child) {
                  margin-right: 10px;
                }
              }
            }
          `}
        >
          <div>{label}</div>
          <div
            css={`
              transform: rotate(${expanded ? "-" : ""}90deg);
            `}
          >
            <TriangleXSIcon />
          </div>
        </div>
      }
      css={chipstyle}
      onClick={handleClick}
      onDelete={() =>
        props.onDelete({
          label: props.label,
          type: props.type,
          values: props.values,
        })
      }
    />
  );
};
