import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { ReactComponent as ClockIcon } from "app/modules/home-module/assets/clock-icon.svg";

interface Props {
  id: string;
  path: string;
  title: string;
  descr: string;
  date: string;
  viz: React.ReactNode;
  handleDelete?: (id: string) => void;
  handleDuplicate?: (id: string) => void;
}

export default function ReformedGridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = React.useState(false);

  const showMenuOptions = () => {
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };

  return (
    <Link
      to={`/chart/${props.id}`}
      css={`
        width: 100%;
        height: 220px;
        display: flex;
        color: #262c34;
        background: #fff;
        position: relative;
        padding: 12px 16px;
        text-decoration: none;
        flex-direction: column;
        border: 1px solid #fff;
        justify-content: space-between;

        &:hover {
          border-color: #6061e5;
        }
      `}
    >
      <div
        css={`
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;

          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      >
        <div
          css={`
            width: 90%;
            margin-top: -7px;
          `}
        >
          <p
            css={`
              font-size: 18px;
              font-family: "Gotham Narrow Bold", sans-serif;
              margin-top: 6px;
              overflow: hidden;
              margin-bottom: 0;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            <b>{props.title}</b>
          </p>
          <p
            css={`
              font-size: 12px;
              margin-top: 1px;
              overflow: hidden;
              font-family: "Gotham Narrow ", sans-serif;
              line-height: 14px;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            `}
          >
            {props.descr}
          </p>
        </div>
      </div>
      <div
        css={`
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            margin-top: 2px;
          `}
        >
          {props.viz}
        </div>
        <div
          css={`
            display: flex;
            font-size: 12px;
            justify-content: flex-end;
            align-items: center;
            gap: 3px;
            > p {
              margin: 0;
            }
          `}
        >
          <ClockIcon />
          <p>{moment(props.date).format("MMMM YYYY")}</p>
        </div>
      </div>
    </Link>
  );
}
