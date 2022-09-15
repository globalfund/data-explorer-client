/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import findIndex from "lodash/findIndex";
import IconButton from "@material-ui/core/IconButton";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";

interface ArrowSelectorProps {
  selected: string;
  options: {
    module: string;
    filterValue: string;
  }[];
  onChange: (value: string) => void;
}

export function ArrowSelector(props: ArrowSelectorProps) {
  const [selIndex, setSelIndex] = React.useState(0);

  React.useEffect(
    () =>
      setSelIndex(findIndex(props.options, (o) => o.module === props.selected)),
    [props.selected, props.options]
  );

  function onPrevClick() {
    props.onChange(props.options[selIndex - 1].filterValue);
  }

  function onNextClick() {
    props.onChange(props.options[selIndex + 1].filterValue);
  }

  return (
    <div
      css={`
        gap: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 20px;
            }
          }
        }

        > div {
          color: #231d2c;
          font-size: 12px;
          max-width: 150px;
          line-height: 15px;
        }

        > button {
          &:nth-of-type(1) {
            transform: rotate(-90deg);
          }
          &:nth-of-type(2) {
            transform: rotate(90deg);
          }
        }
      `}
    >
      <IconButton onClick={onPrevClick} disabled={selIndex === 0}>
        <TriangleXSIcon />
      </IconButton>
      <div>{props.selected}</div>
      <IconButton
        onClick={onNextClick}
        disabled={selIndex === props.options.length - 1}
      >
        <TriangleXSIcon />
      </IconButton>
    </div>
  );
}
