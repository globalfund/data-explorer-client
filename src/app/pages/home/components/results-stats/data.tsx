import { ReactComponent as TBIcon } from "app/assets/vectors/TB.svg";
import { ReactComponent as HIVIcon } from "app/assets/vectors/HIV.svg";
import { ReactComponent as MalariaIcon } from "app/assets/vectors/Malaria.svg";

export interface StatCompProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const stats: StatCompProps[] = [
  {
    icon: <HIVIcon />,
    value: "24.5 million",
    label: "People on antiretroviral therapy for <b>HIV</b> in 2022",
  },
  {
    icon: <TBIcon />,
    value: "6.7 million",
    label: "People with <b>TB</b> treated in 2022",
  },
  {
    icon: <MalariaIcon />,
    value: "220 million",
    label: "<b>Mosquito nets</b> distributed in 2022",
  },
];
