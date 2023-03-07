import { BarIcon } from "app/assets/icons/charts/Bar";
import { MapIcon } from "app/assets/icons/charts/Map";
import { SankeyIcon } from "app/assets/icons/charts/Sankey";
import { TableIcon } from "app/assets/icons/charts/Table";

const iconLinks = [
  {
    icon: <SankeyIcon />,
    link: "/explore/budgets/flow",
  },
  {
    icon: <BarIcon />,
    link: "/explore/disbursements/time-cycle",
  },
  {
    icon: <MapIcon />,
    link: "/explore/allocations/map",
  },
  {
    icon: <TableIcon />,
    link: "/explore/eligibility/table",
  },
];
export const reportsDummyData = [
  {
    path: "#",
    title: "My Finance Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: iconLinks,
  },
  {
    path: "#",
    title: "Some Test Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: iconLinks,
  },

  {
    path: "#",
    title: "Some Test Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: iconLinks,
  },

  {
    path: "#",
    title: "Disbursements Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: iconLinks,
  },

  {
    path: "#",
    title: "Some Test Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: iconLinks,
  },

  {
    path: "#",
    title: "Access to Funding · Eligibility",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: [
      {
        icon: <TableIcon />,
        link: "/explore/eligibility/table",
      },
    ],
  },

  {
    path: "#",
    title: "Access to Funding · Allocation",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks: [
      {
        icon: <TableIcon />,
        link: "/explore/eligibility/table",
      },
    ],
  },

  {
    path: "#",
    title: "My Finance Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks,
  },

  {
    path: "#",
    title: "My Finance Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks,
  },

  {
    path: "#",
    title: "My Finance Report",
    desc: "Detailed budgets for each implementation period.",
    date: "11-11-2021",
    iconLinks,
  },
];
