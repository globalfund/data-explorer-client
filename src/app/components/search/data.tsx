import {
  AllCategoriesIcon,
  DocumentsIcon,
  DonorsIcon,
  GrantsIcon,
  LocationsIcon,
  PartnersIcon,
  ResultsIcon,
} from "app/components/search/icons";

export const categories = [
  {
    value: "All Categories",
    label: "All Categories",
    icon: <AllCategoriesIcon />,
  },
  { value: "Locations", label: "Locations", icon: <LocationsIcon /> },
  { value: "Partners", label: "Partners", icon: <PartnersIcon /> },
  { value: "Donors", label: "Donors", icon: <DonorsIcon /> },
  { value: "Grants", label: "Grants", icon: <GrantsIcon /> },
  { value: "Results", label: "Results", icon: <ResultsIcon /> },
  { value: "Documents", label: "Documents", icon: <DocumentsIcon /> },
];
