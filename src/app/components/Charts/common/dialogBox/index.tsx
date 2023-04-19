import React from "react";
import { useStoreActions } from "app/state/store/hooks";
import {
  overlaycss,
  modalContainercss,
} from "app/components/Charts/common/dialogBox/style";

interface Props {
  display: {
    display: boolean;
    code: string;
    pageType?: string;
    clickthroughPath?: string;
  };
  setDisplay: React.Dispatch<
    React.SetStateAction<{
      display: boolean;
      code: string;
      pageType?: string;
      clickthroughPath?: string;
    }>
  >;
  handleClick?: () => void;
}

export default function ReRouteDialogBox(props: Props) {
  const clearDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.clear
  );

  const handleYesClick = () => {
    clearDataPathSteps();
    if (props.handleClick) {
      props.handleClick();
    }
  };

  return (
    <div>
      <div
        onClick={() => props.setDisplay({ ...props.display, display: false })}
        css={overlaycss}
      />
      <div css={modalContainercss}>
        <p
          css={`
            margin: 0;
          `}
        >
          You are navigating to a {props.display.pageType || "grant"} page.
        </p>
        <p
          css={`
            margin-top: 0;
          `}
        >
          New pathway will be formed according to your new search.
        </p>
        <p
          css={`
            margin: 2rem 0;
          `}
        >
          <b>Continue to {props.display.pageType || "grant"} page?</b>
        </p>
        <div
          css={`
            display: flex;
            gap: 3rem;
            justify-content: center;
            height: 31px;
          `}
        >
          <button
            type="button"
            onClick={() =>
              props.setDisplay({ ...props.display, display: false })
            }
          >
            <b>No</b>
          </button>
          <button type="button" onClick={handleYesClick}>
            <b>Yes</b>
          </button>
        </div>
      </div>
    </div>
  );
}
