import React from "react";

interface DataType {
  path: string;
  title: string;
  desc: string;
  date: string;
  viz: "bar" | "sankey" | "map" | "table";
  id?: string;
}

export const datasetsData: DataType[] = [
  {
    path: "#",
    title: "Finance chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "sankey",
  },
  {
    path: "#",
    title: "Bar chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "bar",
  },
  {
    path: "#",
    title: "Geomap",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "map",
  },
  {
    path: "#",
    title: "Table chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "table",
  },
  {
    path: "#",
    title: "Geomap",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "map",
  },
  {
    path: "#",
    title: "Table chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "table",
  },
  {
    path: "#",
    title: "Geomap",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "map",
  },
  {
    path: "#",
    title: "Bar chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "bar",
  },
  {
    path: "#",
    title: "Bar chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "bar",
  },
  {
    path: "#",
    title: "Finance chart",
    desc: "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
    date: "11-11-2021",
    viz: "sankey",
  },
];
