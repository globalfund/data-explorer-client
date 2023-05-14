import React from "react";
import { useStoreActions } from "app/state/store/hooks";
import {
  overlaycss,
  modalContainercss,
} from "app/components/Charts/common/dialogBox/style";
import { useCMSData } from "app/hooks/useCMSData";
import { get } from "lodash";

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
  const cmsData = useCMSData({ returnData: true });
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
          {get(cmsData, "componentsDialogBox.navigating", "")}{" "}
          {props.display.pageType || "grant"}{" "}
          {get(cmsData, "componentsDialogBox.page", "")}
        </p>
        <p
          css={`
            margin-top: 0;
          `}
        >
          {get(cmsData, "componentsDialogBox.info", "")}
        </p>
        <p
          css={`
            margin: 2rem 0;
          `}
        >
          <b>
            {" "}
            {get(cmsData, "componentsDialogBox.continueToPage", "")}{" "}
            {props.display.pageType || "grant"}{" "}
            {get(cmsData, "componentsDialogBox.pageRequest", "")}
          </b>
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
            <b>{get(cmsData, "componentsDialogBox.no", "")}</b>
          </button>
          <button type="button" onClick={handleYesClick}>
            <b>{get(cmsData, "componentsDialogBox.yes", "")}</b>
          </button>
        </div>
      </div>
    </div>
  );
}
