import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import RightIcon from "@material-ui/icons/ChevronRight";
import { breadCrumbItems } from "app/state/recoil/atoms";

export default function BreadCrumbs() {
  const history = useHistory();
  const [breadCrumbList, setBreadCrumbList] = useRecoilState(breadCrumbItems);

  return (
    <div
      css={`
        left: 0;
        top: 48px;
        z-index: 10;
        position: sticky;
        margin-top: 3rem;
        background: ${document.body.style.background};
      `}
    >
      <div
        css={`
          display: flex;
          gap: 5px;
          align-items: center;
          justify-content: flex-start;
          padding-top: 12px;
          padding-bottom: 12px;
          height: 56px;
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0em !important;
            display: none;
          }
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
            visibility: hidden !important;
          }
          &::-webkit-scrollbar-thumb {
            background-color: white;
            border-radius: 0px;
            border: 0;
          }
          width: 100vw;
          @media (min-width: 1280px) {
            max-width: 1280px;
          }
          @media (min-width: 600px) {
            padding-left: 24px;
            padding-right: 24px;
          }
        `}
      >
        {breadCrumbList &&
          breadCrumbList.map((item, index) => (
            <div
              css={`
                display: flex;
                gap: 5px;
                align-items: center;
              `}
              key={item?.id}
            >
              <button
                css={`
                  background: ${index === breadCrumbList.length - 1
                    ? "#495057"
                    : "#868e96"};
                  height: 32px;
                  padding: 13px 12px;
                  border-radius: 20px;
                  font-size: 14px;
                  font-weight: 700;
                  color: #fff;
                  text-align: center;
                  display: flex;
                  align-items: center;
                  border: none;
                  outline: none;
                  width: max-content;
                  /* padding: 0 2rem; */
                  cursor: pointer;
                  :hover,
                  :active,
                  :focus {
                    background: #495057;
                  }
                `}
                type="button"
                onClick={() => {
                  if (item?.path !== "#") {
                    history.push(item.path);
                  }
                  setBreadCrumbList([...breadCrumbList.slice(0, index + 1)]);
                }}
              >
                <b>{item?.name}</b>
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
    </div>
  );
}
