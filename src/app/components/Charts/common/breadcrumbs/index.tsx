import React from "react";
import RightIcon from "@material-ui/icons/ChevronRight";
import { useRecoilState, useRecoilValue } from "recoil";
import { breadCrumbItems } from "app/state/recoil/atoms";
import { useHistory } from "react-router-dom";

export default function BreadCrumbs() {
  const [breadCrumbList, setBreadCrumbList] = useRecoilState(breadCrumbItems);
  const history = useHistory();
  return (
    <div
      css={`
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: flex-start;
        padding-top: 12px;
        padding-bottom: 12px;
        font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          width: 0.1em;
        }
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
        }
        &::-webkit-scrollbar-thumb {
          background-color: white;
          border-radius: 0px;
          border: 1px solid white;
        }
        width: 100vw;
        /* padding-left: 16px;
        padding-right: 16px; */
        @media (min-width: 1280px) {
          max-width: 1280px;
        }
        @media (min-width: 600px) {
          padding-left: 24px;
          padding-right: 24px;
        }
      `}
    >
      {breadCrumbList.map((item, index) => (
        <div
          css={`
            display: flex;
            gap: 12px;
            align-items: center;
          `}
        >
          <button
            css={`
              background: ${index === breadCrumbList.length - 1
                ? "#495057"
                : "#868e96"};
              height: 32px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 700;
              color: #fff;
              text-align: center;
              border: none;
              outline: none;
              width: max-content;
              padding: 0 2rem;
              cursor: pointer;
              :hover,
              :active,
              :focus {
                background: #495057;
              }
            `}
            type="button"
            onClick={() => {
              history.push(item.path);
              setBreadCrumbList([...breadCrumbList.slice(0, index + 1)]);
            }}
          >
            <b>{item.name}</b>
          </button>
          {index === breadCrumbList.length - 1 ? null : (
            <div
              css={`
                color: #495057;
                display: flex;
                align-items: center;
              `}
            >
              <RightIcon color="inherit" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
