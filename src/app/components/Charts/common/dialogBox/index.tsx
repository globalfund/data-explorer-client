import React from "react";
import { modalContainercss, overlaycss } from "./style";

interface Props {
  display: {
    display: boolean;
    code: string;
    clickthroughPath?: string;
  };
  setDisplay: React.Dispatch<
    React.SetStateAction<{
      display: boolean;
      code: string;
      clickthroughPath?: string;
    }>
  >;
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export default function ReRouteDialogBox(props: Props) {
  return (
    <div
      onClick={() => props.setDisplay({ ...props.display, display: false })}
      css={overlaycss}
    >
      <div css={modalContainercss}>
        <p
          css={`
            margin: 0;
          `}
        >
          You are navigating to a grant page.
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
          <b>Continue to grant page?</b>
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
            <b> No</b>
          </button>
          <button type="button" onClick={props.handleClick}>
            {" "}
            <b>Yes</b>
          </button>
        </div>
      </div>
    </div>
  );
}
