import React from "react";
import AssessmentIcon from "@material-ui/icons/Assessment";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import PaletteIcon from "@material-ui/icons/Palette";
import TableChartIcon from "@material-ui/icons/TableChart";
import { stepcss } from "./style";
import { useHistory, useParams } from "react-router-dom";

export type ToolboxNavType =
  | "dataset"
  | "mapping"
  | "lock"
  | "customize"
  | "filters"
  | "chart"
  | "selectDataset";
export default function ToolboxNav(props: {
  setActiveStep: React.Dispatch<React.SetStateAction<ToolboxNavType>>;
  activeStep: string;
}) {
  const { page } = useParams<{ page: string }>();
  const history = useHistory();
  const stepPaths = [
    { name: "dataset", path: `/chart/${page}/preview-data` },
    { name: "data", path: `/chart/${page}/data` },
    { name: "chart", path: `/chart/${page}/chart-type` },
    { name: "mapping", path: `/chart/${page}/mapping` },
    { name: "filters", path: `/chart/${page}/filters` },
    { name: "customize", path: `/chart/${page}/customize` },
    { name: "lock", path: `/chart/${page}/lock` },
  ];

  const onNavBtnClick = () => {
    const findStep = stepPaths.find((step) => step.name === props.activeStep);
    if (findStep) {
      history.push(findStep.path);
    }
  };
  React.useEffect(() => {
    onNavBtnClick();
  }, [props.activeStep]);

  const navContent: { name: ToolboxNavType; icon: JSX.Element }[] = [
    { name: "dataset", icon: <TableChartIcon /> },
    { name: "chart", icon: <AssessmentIcon /> },
    { name: "mapping", icon: <CloudDoneIcon /> },

    { name: "filters", icon: <TableChartIcon /> },
    { name: "customize", icon: <PaletteIcon /> },
    { name: "lock", icon: <NoEncryptionIcon /> },
  ];
  return (
    <div
      css={`
        background: #fff;
        display: flex;
      `}
    >
      {navContent.map((item) => (
        <div
          css={stepcss(item.name === props.activeStep)}
          key={item.name}
          onClick={() => {
            props.setActiveStep(item.name);
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
