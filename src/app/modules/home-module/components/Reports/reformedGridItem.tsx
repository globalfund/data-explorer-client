import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { ReactComponent as ClockIcon } from "app/modules/home-module/assets/clock-icon.svg";

interface Props {
  date: Date;
  id?: string;
  title: string;
  descr: string;
  color: string;
  viz: JSX.Element;
  handleDelete?: (id: string) => void;
  handleDuplicate?: (id: string) => void;
}

export default function ReformedGridItem(props: Props) {
  return (
    <div
      css={`
        width: 100%;
        height: 220px;
        display: flex;
        color: #262c34;
        background: #fff;
        position: relative;
        padding: 12px 16px;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      >
        <div
          css={`
            width: 80%;
            margin-top: -7px;
          `}
        >
          <Link to={`/report/${props.id}`}>
            <p
              css={`
                font-size: 18px;
                line-height: 22px;
                font-family: "Gotham Narrow Bold", sans-serif;
                margin-top: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 0;
              `}
            >
              <b>{props.title}</b>
            </p>
          </Link>
          <p
            css={`
              font-size: 12px;
              line-height: 14px;
              font-family: "Gotham Narrow ", sans-serif;
              margin-top: 1px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              color: #495057;
            `}
          >
            {props.descr}
          </p>
        </div>
      </div>
      <div
        css={`
          margin-top: 4px;
          position: absolute;
          bottom: -8px;

          rect:nth-of-type(2) {
            fill: ${props.color || "#231d2c"};
          }
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
        <p>{moment(props.date).format("DD-MM-YYYY")}</p>
      </div>
    </div>
  );
}
