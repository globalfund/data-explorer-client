import { BarIcon } from "app/assets/icons/charts/Bar";
import { SankeyIcon } from "app/assets/icons/charts/Sankey";
import { TableIcon } from "app/assets/icons/charts/Table";
import { TreemapIcon } from "app/assets/icons/charts/Treemap";
import {
  AllCategoriesIcon,
  DocumentsIcon,
  DonorsIcon,
  GrantsIcon,
  LocationsIcon,
  PartnersIcon,
  ResultsIcon,
} from "app/components/Search/icons";

export const categories = [
  { label: "Datasets", icon: <BarIcon fill="#868A9D" /> },
  { label: "Charts", icon: <SankeyIcon fill="#868A9D" /> },
  { label: "Reports", icon: <TreemapIcon fill="#868A9D" /> },
];
