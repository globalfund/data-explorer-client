import React from "react";
import { isEmpty } from "lodash";
import { ActionCreator } from "easy-peasy";
import TuneIcon from "@material-ui/icons/Tune";
import PaletteIcon from "@material-ui/icons/Palette";
import { useStoreState } from "app/state/store/hooks";
import { useHistory, useParams } from "react-router-dom";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import TableChartIcon from "@material-ui/icons/TableChart";
import AssessmentIcon from "@material-ui/icons/Assessment";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import { stepcss } from "app/modules/chart-module/components/toolbox/views/steps/navbar/style";

export type ToolboxNavType =
  | "dataset"
  | "mapping"
  | "lock"
  | "customize"
  | "filters"
  | "chart"
  | "selectDataset";

export default function ToolboxNav(props: {
  setActiveStep: ActionCreator<ToolboxNavType>;
  activeStep: string;
  mappedData: any;
}) {
  const { page } = useParams<{ page: string }>();
  const history = useHistory();
  const dataset = useStoreState((state) => state.charts.dataset.value);
  const chartType = useStoreState((state) => state.charts.chartType.value);

  const whiteBackgroundOnly = "background-color: #fff;";
  const whiteBackgroundRoundedBottomRight =
    whiteBackgroundOnly + " border-radius: 0px 0px 8px 0px;";
  const whiteBackgroundRoundedBottomLeft =
    whiteBackgroundOnly + " border-radius: 0px 0px 0px 8px;";
  const whiteBackgroundNotRounded =
    whiteBackgroundOnly + " border-radius: 0px 0px 0px 0px";

  const stepPaths = [
    { name: "dataset", path: `/chart/${page}/preview-data` },
    { name: "data", path: `/chart/${page}/data` },
    { name: "chart", path: `/chart/${page}/chart-type` },
    { name: "mapping", path: `/chart/${page}/mapping` },
    { name: "filters", path: `/chart/${page}/filters` },
    { name: "customize", path: `/chart/${page}/customize` },
    { name: "lock", path: `/chart/${page}/lock` },
  ];

  const handleStepChange = () => {
    const findStep = stepPaths.find((step) => step.name === props.activeStep);
    if (findStep) {
      history.push(findStep.path);
    }
  };

  React.useEffect(() => {
    handleStepChange();
  }, [props.activeStep]);

  const navContent: { name: ToolboxNavType; icon: JSX.Element }[] = [
    { name: "dataset", icon: <TableChartIcon /> },
    { name: "chart", icon: <AssessmentIcon /> },
    { name: "mapping", icon: <CloudDoneIcon /> },

    { name: "filters", icon: <TuneIcon /> },
    { name: "customize", icon: <PaletteIcon /> },
    { name: "lock", icon: <NoEncryptionIcon /> },
  ];

  const activeStepIndex =
    props.activeStep === "selectDataset"
      ? 0
      : navContent.findIndex((nav) => nav.name === props.activeStep);

  const onNavBtnClick = (name: ToolboxNavType) => {
    if (
      name === "dataset" ||
      name === "selectDataset" ||
      name === "chart" ||
      name === "mapping"
    ) {
      if (name === "dataset" && !isEmpty(dataset)) {
        props.setActiveStep(name);
        return;
      }
      if (name === "chart" && !isEmpty(dataset)) {
        props.setActiveStep(name);
        return;
      }
      if (name === "mapping" && !isEmpty(dataset) && !isEmpty(chartType)) {
        props.setActiveStep(name);
        return;
      }
    } else if (!isEmpty(props.mappedData)) {
      props.setActiveStep(name);
    }
  };

  return (
    <div
      css={`
        background: #f5f5f7;
        display: flex;
      `}
    >
      {navContent.map((item, index) => (
        <div
          css={`
            ${stepcss(
              item.name === props.activeStep || index === activeStepIndex
            )}
            ${(() => {
              if (index === activeStepIndex - 1) {
                return whiteBackgroundRoundedBottomRight;
              } else if (index === activeStepIndex) {
                return "background: transparent;";
              } else if (index === activeStepIndex + 1) {
                return whiteBackgroundRoundedBottomLeft;
              } else {
                return whiteBackgroundNotRounded;
              }
            })()};
          `}
          key={item.name}
          onClick={() => {
            onNavBtnClick(item.name);
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
