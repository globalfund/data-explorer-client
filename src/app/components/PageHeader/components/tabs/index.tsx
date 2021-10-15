import React from "react";
import { ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  TabProps,
  PageHeaderTabProps,
} from "app/components/PageHeader/components/tabs/data";

const styles = {
  container: css``,
  tooltip: css`
    fill: ${ProjectPalette.primary.main};
    :hover {
      fill: ${ProjectPalette.primary.light};
    }
  `,
  titleContainer: css`
    display: flex;
    margin-top: 3px;
    margin-bottom: 16px;
  `,
  title: css`
    margin-right: 12px;
  `,
  tabsList: css`
    display: flex;
    overflow-y: hidden;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 992px) {
      overflow-x: auto;
      margin-left: 36px;
    }

    &::-webkit-scrollbar {
      width: 1px;
      height: 3px;
      background: #ededf6;
    }
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background: #ededf6;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #2e4063;
    }
  `,
  tabcss: (active: boolean) => css`
    height: 35px;
    display: flex;
    margin-right: 1px;
    align-items: center;
    transition: background 0.2s ease-in-out;
    background: ${active ? "#495057" : "#C7CDD1"};

    :first-of-type {
      border-radius: 15px 0px 0px 0px;
    }

    :last-of-type {
      border-right-style: none;
      border-radius: 0px 15px 0px 0px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #495057;
        a {
          color: #fff;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        }
      }
    }

    a {
      font-size: 14px;
      padding: 10px 15px;
      white-space: nowrap;
      text-decoration: none;
      color: ${active ? "#fff" : "#13183F"};
      font-weight: ${active ? "bold" : "normal"};
      font-family: "GothamNarrow-${active ? "Bold" : "Book"}", "Helvetica Neue",
        sans-serif;
    }
  `,
};

function RouteTab(props: TabProps) {
  const params = useParams<{
    tab: string;
    code: string;
    period: string;
    vizType: string;
  }>();
  const location = useLocation();
  const link = `${props.url
    .replace("<code>", params.code)
    .replace("<period>", params.period)}${location.search}`;
  const urlsplits = props.url.split("/");
  let index = params.period ? 4 : 3;
  let indexParam: "vizType" | "tab" = "vizType";
  if (urlsplits[1] === "results") {
    index = 2;
    indexParam = "tab";
  }
  console.log(urlsplits[index], params[indexParam]);
  const isActive = urlsplits[index] === params[indexParam];

  return (
    <li css={styles.tabcss(isActive)}>
      <NavLink to={link}>{props.name}</NavLink>
    </li>
  );
}

export function PageHeaderTabs(props: PageHeaderTabProps) {
  return (
    <div css={styles.container}>
      <ul css={styles.tabsList}>
        {props.tabs.map((tab: TabProps) => (
          <RouteTab key={tab.name} {...tab} />
        ))}
      </ul>
    </div>
  );
}
