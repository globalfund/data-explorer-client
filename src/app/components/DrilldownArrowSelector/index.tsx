/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import findIndex from "lodash/findIndex";
import { css } from "styled-components/macro";
import IconChevronRight from "app/assets/icons/IconChevronRight";

export const styles = {
  container: css`
    display: flex;
    color: #231d2c;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    span {
      display: flex;
      cursor: pointer;
      font-family: auto;

      svg {
        path {
          fill: #231d2c;
        }
      }

      &:first-of-type {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  `,
  disableArrow: css`
    opacity: 0.5;
    pointer-events: none;
  `,
};

interface DrillDownArrowSelectorProps {
  selected: string;
  options: string[];
  onChange: (value: string) => void;
}

export function DrillDownArrowSelector(props: DrillDownArrowSelectorProps) {
  const [selIndex, setSelIndex] = React.useState(0);

  React.useEffect(
    () => setSelIndex(findIndex(props.options, (o) => o === props.selected)),
    [props.selected, props.options]
  );

  function onPrevClick() {
    props.onChange(props.options[selIndex - 1]);
  }

  function onNextClick() {
    props.onChange(props.options[selIndex + 1]);
  }

  return (
    <div css={styles.container}>
      <span
        onClick={onPrevClick}
        id="drilldown-arrow-selector-prev"
        data-cy="drilldown-arrow-selector-prev"
        css={selIndex === 0 ? styles.disableArrow : ""}
      >
        <IconChevronRight />
      </span>
      <div css="padding: 0 25px;" data-cy="drilldown-arrow-selector-name">
        {props.selected}
      </div>
      <span
        onClick={onNextClick}
        id="drilldown-arrow-selector-next"
        data-cy="drilldown-arrow-selector-next"
        css={selIndex === props.options.length - 1 ? styles.disableArrow : ""}
      >
        <IconChevronRight />
      </span>
    </div>
  );
}
