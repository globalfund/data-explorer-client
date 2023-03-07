import { SankeyIcon } from "app/assets/icons/charts/Sankey";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
  descr: string;
  date: string;
  viz: JSX.Element;
}
export default function GridItem(props: Props) {
  return (
    <Link to={props.path}>
      <div
        css={`
          background: #ffffff;
          width: 296px;

          padding: 0rem 1.2rem;
          padding-bottom: 0.2rem;
          color: #262c34;
          font-family: "Gotham Narrow";
          overflow: auto;
        `}
      >
        <div
          css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            css={`
              width: 60%;
            `}
          >
            <p
              css={`
                font-size: 14px;
                /* margin-top: 2rem; */

                margin-bottom: 0;
              `}
            >
              <b>{props.title}</b>
            </p>

            <p
              css={`
                font-size: 10px;
                line-height: 12px;
                margin-top: 1px;
              `}
            >
              {props.descr}
            </p>
          </div>
          <div>{props.viz}</div>
        </div>

        <div
          css={`
            display: flex;
            justify-content: space-between;
            margin-top: -10px;
            font-size: 12px;
          `}
        >
          <p>Creation date</p>
          <p>{props.date}</p>
        </div>
      </div>
    </Link>
  );
}
