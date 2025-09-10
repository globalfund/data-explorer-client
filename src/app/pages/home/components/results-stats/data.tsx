import TBIcon from "app/assets/vectors/TB.svg?react";
import HIVIcon from "app/assets/vectors/HIV.svg?react";
import MalariaIcon from "app/assets/vectors/Malaria.svg?react";

export interface StatCompProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
}

export interface HomeResultsStatsProps {
  stats: StatCompProps[];
  loading?: boolean;
}

export const stats: StatCompProps[] = [
  {
    icon: <HIVIcon />,
    value: 24500000,
    label: "People on antiretroviral therapy for HIV in 2022",
  },
  {
    icon: <TBIcon />,
    value: 6700000,
    label: "People with TB treated in 2022",
  },
  {
    icon: <MalariaIcon />,
    value: 220000000,
    label: "Insecticide-treated mosquito nets distributed in 2022",
  },
];

export const statsOrder = ["HIV", "TB", "Mosquito nets"];
