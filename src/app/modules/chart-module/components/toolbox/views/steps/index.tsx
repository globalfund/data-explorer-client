/* third-party */
import React from "react";

import { useStoreState } from "app/state/store/hooks";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { ChartToolBoxLock } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Lock";
import { ChartToolBoxMapping } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Mapping";
import { ChartToolBoxFilters } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Filters";
import { ChartToolBoxChartType } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/ChartType";
import { ChartToolBoxCustomize } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Customize";
import { DatasetPanel } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/SelectDataset";
import { ToolboxNavType } from "./navbar";
import CancelChartCreationDialog from "app/modules/chart-module/dialogs/cancelChartCreation";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import SaveChartCreationDialog from "app/modules/chart-module/dialogs/saveChart";

export const Accordion = withStyles({
  root: {
    boxShadow: "none",
    borderTop: "1px solid #C0C7D2",
    backgroundColor: "transparent",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
  root: {
    minHeight: 56,
    marginBottom: -1,
    padding: "0 24px",
    backgroundColor: "transparent",
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    fontSize: "14px",
    "& > div": {
      width: 23,
      height: 23,
      color: "#fff",
      marginRight: 25,
      fontSize: "14px",
      borderRadius: "50%",
      textAlign: "center",
      backgroundColor: "#727F95",
    },
    "&$expanded": {
      margin: "12px 0",
      fontFamily: "GothamNarrow-Bold, sans-serif",
      fontWeight: 700,
      "& > div": {
        backgroundColor: "#262C34",
      },
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles(() => ({
  root: {
    padding: "16px 24px",
    flexDirection: "column",
  },
}))(MuiAccordionDetails);

interface ChartToolBoxStepsProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  mappedData?: any;
  openPanel?: number;
  dataTypes: any;
  visualOptions?: any;
  forceNextEnabled?: boolean;
  filtersView?: boolean;
  rawViz?: any;
  save: () => void;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions?: (value: any) => void;
  loadDataset: (endpoint: string) => Promise<boolean>;
  activeStep: ToolboxNavType;
  dimensions: any[];
  setDatasetName: React.Dispatch<React.SetStateAction<string>>;
}

export function ChartToolBoxSteps(props: Readonly<ChartToolBoxStepsProps>) {
  const { loadDataset, filterOptionGroups } = props;
  const history = useHistory();
  const [expanded, setExpanded] = React.useState<number>(props.openPanel ?? 0);
  const [displayCancelModal, setDisplayCancelModal] = React.useState(false);
  const [displaySaveModal, setDisplaySaveModal] = React.useState(false);
  const appliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  let appliedFiltersCount = 0;

  Object.keys(appliedFilters || {}).forEach((key) => {
    appliedFiltersCount += appliedFilters[key].length;
  });

  const [saveModalContent, setSaveModalContent] = React.useState({
    title: "Chart saved!",
    description:
      "You can find your charts in the library. Ready to build your reports!",
    buttonTitle: "Go to library",
    subText: "Well done!",

    action: () => {
      history.push("/charts");
    },
  });

  const handleSave = () => {
    if (!isEmpty(props.mappedData)) {
      props.save();
      setSaveModalContent({
        title: "Chart saved!",
        description:
          "You can find your charts in the library. Ready to build your reports!",
        buttonTitle: "Go to library",
        subText: "Well done!",

        action: () => {
          history.push("/charts");
        },
      });
      setDisplaySaveModal(true);
    } else {
      setSaveModalContent({
        title: "Chart settings incomplete",
        description:
          "Your chart is not fully complete, please select and fill the remaining fields to get a usable chart before saving.",
        buttonTitle: "Save",
        subText:
          "Pay attention to the step line to identify which mandatory sections are missing. ",

        action: () => {
          props.save();
        },
      });
      setDisplaySaveModal(true);
    }
  };

  const displayToolboxPanel = () => {
    switch (props.activeStep) {
      case "dataset":
      case "selectDataset":
        return (
          <DatasetPanel
            loadDataset={loadDataset}
            expanded={expanded}
            setDatasetName={props.setDatasetName}
          />
        );
      case "chart":
        return <ChartToolBoxChartType />;
      case "mapping":
        return (
          <ChartToolBoxMapping
            dataTypes={props.dataTypes}
            dimensions={props.dimensions}
          />
        );
      case "filters":
        return <ChartToolBoxFilters filterOptionGroups={filterOptionGroups} />;
      case "customize":
        return (
          <ChartToolBoxCustomize
            dataTypes={props.dataTypes}
            mappedData={props.mappedData}
            visualOptions={props.visualOptions}
            setVisualOptions={props.setVisualOptions}
          />
        );
      case "lock":
        return (
          <ChartToolBoxLock filterOptionGroups={props.filterOptionGroups} />
        );
      default:
        return <div></div>;
    }
  };

  useUpdateEffect(() => setExpanded(props.openPanel ?? 0), [props.openPanel]);

  return (
    <div>
      <div
        css={`
          width: 400px;
          overflow-y: scroll;
          height: calc(100vh - ${!props.filtersView ? 229 : 105}px);
          position: relative;

          &::-webkit-scrollbar {
            width: 5px;
            background: #231d2c;
          }
          &::-webkit-scrollbar-track {
            background: #f5f5f7;
          }
          &::-webkit-scrollbar-thumb {
            background: #231d2c;
          }
        `}
      >
        {displayToolboxPanel()}
      </div>
      <div
        css={`
          display: flex;
          gap: 8px;
          height: 55px;
          align-items: center;
          justify-content: center;

          background: #f5f5f7;
          button {
            outline: none;
            border: none;
            border-radius: 8px;
            width: 188px;
            height: 48px;
            background: #dfe3e5;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: "Gotham Narrow", sans-serif;
            :nth-child(1) {
              background: #dfe3e5;
              color: #262c34;
            }
            :nth-child(2) {
              background: #262c34;
              color: #fff;
            }
            &:hover {
              opacity: 0.9;
              cursor: pointer;
            }
          }
        `}
      >
        <button type="button" onClick={() => setDisplayCancelModal(true)}>
          Cancel{" "}
        </button>
        <button onClick={handleSave}>Save</button>
      </div>
      <CancelChartCreationDialog
        modalOpen={displayCancelModal}
        setModalOpen={setDisplayCancelModal}
      />
      <SaveChartCreationDialog
        {...{
          modalOpen: displaySaveModal,
          setModalOpen: setDisplaySaveModal,
          saveModalContent,
        }}
      />
    </div>
  );
}
