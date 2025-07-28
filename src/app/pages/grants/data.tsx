import TableChartIcon from "@mui/icons-material/TableChart";
import { ReactComponent as CardView } from "app/assets/vectors/CardView.svg";

export interface GrantsLayoutProps {
  view: string;
  anchorEl: any;
  search: string;
  page: number;
  loading: boolean;
  filterGroups: any;
  showSearch: boolean;
  searchInputRef: any;
  pageAppliedFilters: any;
  latestUpdateDate?: string;
  viewResult: React.ReactNode;
  pagination: React.ReactNode;
  handleResetFilters: () => void;
  handleFilterPanelClose: () => void;
  handleViewChange: (view: string) => void;
  handleSearchIconClick: (showSearch: boolean) => () => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setPageSearchValue: (value: React.SetStateAction<number>) => void;
  handleCancelFilters: () => void;
  handleApplyFilters: () => void;
}

export const GRANTS_STORY_DATA = [
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-0",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-1",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-2",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-3",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-4",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-5",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-6",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-7",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
  {
    status: "Active",
    location: "Afghanistan",
    rating: "B1",
    component: "HIV",
    number: "AZE-M-MOH-8",
    principalRecipient: "Ministry of Health Ghana",
    startDate: "12.02.2021",
    endDate: "12.02.2023",
    title:
      "Scaling up the response to the HIV epidemic through strengthening national capacities, prevention and treatment services for most at risk population and maintaining access to and quality of essential MDR/XDR TB services in the Republic of Azerbaijan",
    signed: 1000000,
    disbursed: 1000000,
    percentage: 80.5,
  },
];

export const DROPDOWN_ITEMS: {
  value: string;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    value: "Card View",
    label: "Card View",
    icon: <CardView />,
  },
  {
    value: "Table View",
    label: "Table View",
    icon: <TableChartIcon />,
  },
];
