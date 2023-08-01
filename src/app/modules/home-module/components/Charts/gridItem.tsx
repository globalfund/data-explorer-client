import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  path: string;
  title: string;
  descr: string;
  date: string;
  viz: React.ReactNode;
  added?: boolean;
  handleDelete?: (id: string) => void;
  handleDuplicate?: (id: string) => void;
}

export default function GridItem(props: Props) {
  return (
    <div
      css={`
        width: 296px;
        display: flex;
        height: 125px;
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
          align-items: center;
          justify-content: space-between;

          a {
            color: inherit;
            text-decoration: none;
            width: calc(100% - 70px);
          }
        `}
      >
        <Link to={`/chart/${props.id}`}>
          <p
            css={`
              margin: 0;
              font-size: 14px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            <b>{props.title}</b>
          </p>
        </Link>
        {props.added && (
          <p
            css={`
              margin: 0;
              width: 57px;
              height: 17px;
              display: flex;
              font-size: 12px;
              border-radius: 10px;
              align-items: center;
              border: 1px solid #000;
              justify-content: center;
              font-family: "GothamNarrow", sans-serif;
            `}
          >
            Added
          </p>
        )}
      </div>
      <div
        css={`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            width: 60%;
          `}
        >
          <p
            css={`
              font-size: 10px;
              margin-top: 1px;
              overflow: hidden;
              line-height: 12px;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            `}
          >
            {props.descr}
          </p>
        </div>
        <div
          css={`
            width: 60px;
            height: 50px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <div
            css={`
              width: fit-content;
              height: fit-content;

              svg {
                transform: scale(0.7);

                &#big-number {
                  transform: scale(1);
                }

                path {
                  fill: #868a9d;
                }
              }
            `}
          >
            {props.viz}
          </div>
        </div>
      </div>
      <div
        css={`
          display: flex;
          font-size: 12px;
          justify-content: space-between;
          margin-top: -2px;
          > p {
            margin: 0;
          }
        `}
      >
        <p>Creation date</p>
        <p>{moment(props.date).format("DD-MM-YYYY")}</p>
      </div>
    </div>
  );
}
