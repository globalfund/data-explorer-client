import { BarIcon } from "app/assets/icons/charts/Bar";
import { DotIcon } from "app/assets/icons/charts/Dot";
import { MapIcon } from "app/assets/icons/charts/Map";
import { RadialIcon } from "app/assets/icons/charts/Radial";
import { SankeyIcon } from "app/assets/icons/charts/Sankey";
import { TableIcon } from "app/assets/icons/charts/Table";
import { TreemapIcon } from "app/assets/icons/charts/Treemap";
import React from "react";

export const dummyReportsdata = [
  {
    title: { __html: "My Finance Report" },
    link: "",
    description: {
      __html:
        "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    },
    iconLinks: [
      {
        icon: <RadialIcon />,
        link: "#",
      },
      {
        icon: <MapIcon />,
        link: "#",
      },
    ],
  },
  {
    title: { __html: "Disbursements Report" },
    link: "",
    description: { __html: "Detailed budgets for each implementation period." },
    iconLinks: [
      {
        icon: <TreemapIcon />,
        link: "#",
      },
      {
        icon: <MapIcon />,
        link: "#",
      },
    ],
  },
  {
    title: { __html: "Budgets 2022 Report" },
    link: "",
    description: {
      __html:
        "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    },
    iconLinks: [
      {
        icon: <DotIcon />,
        link: "#",
      },
      {
        icon: <BarIcon />,
        link: "#",
      },
      {
        icon: <MapIcon />,
        link: "#",
      },
    ],
  },
  {
    title: { __html: "Allocation Report 2017 cycle" },
    link: "",
    description: { __html: "Allocations amounts for countries by disease" },
    iconLinks: [
      {
        icon: <RadialIcon />,
        link: "#",
      },
      {
        icon: <MapIcon />,
        link: "#",
      },
    ],
  },
  {
    title: { __html: "All about Kenya Report" },
    link: "",
    description: { __html: "All grants accross the portfolio" },
    iconLinks: [
      {
        icon: <SankeyIcon />,
        link: "#",
      },
      {
        icon: <BarIcon />,
        link: "#",
      },
    ],
  },
  {
    title: { __html: "Top Donors 2015-2023 report" },
    link: "",
    description: {
      __html:
        "Financial transactions for all grant agreements across the portfolio",
    },
    iconLinks: [
      {
        icon: <BarIcon />,
        link: "#",
      },
    ],
  },
  {
    title: { __html: "Malaria Report Sub Saharian Africa" },
    link: "",
    description: {
      __html:
        "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    },
    iconLinks: [
      {
        icon: <TreemapIcon />,
        link: "#",
      },

      {
        icon: <TableIcon />,
        link: "/viz/pledges-contributions/table",
      },
    ],
  },
  {
    title: { __html: "HIV around the world 2020" },
    link: "",
    description: {
      __html:
        "Indicator targets and results for each implementation period of a grant.",
    },
    iconLinks: [
      {
        icon: <BarIcon />,
        link: "#",
      },
      {
        icon: <MapIcon />,
        link: "#",
      },
    ],
  },
];

export const vizTypes = [
  {
    icon: <TreemapIcon />,
    type: "map",
  },
  {
    icon: <RadialIcon />,
    type: "radial",
  },

  {
    icon: <TreemapIcon />,
    type: "treemap",
  },
  {
    icon: <DotIcon />,
    type: "dot",
  },
  {
    icon: <BarIcon />,
    type: "bar",
  },
  {
    icon: <SankeyIcon />,
    type: "sankey",
  },
];
