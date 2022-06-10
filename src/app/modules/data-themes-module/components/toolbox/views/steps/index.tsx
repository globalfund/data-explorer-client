/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import findIndex from "lodash/findIndex";
import Tooltip from "@material-ui/core/Tooltip";
import MuiButton from "@material-ui/core/Button";
import { useStoreState } from "app/state/store/hooks";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import { useHistory, useParams } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";
import { DataThemesToolBoxMapping } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/Mapping";
import { DataThemesToolBoxFilters } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/Filters";
import { DataThemesToolBoxChartType } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/ChartType";
import { DataThemesToolBoxCustomize } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/Customize";
import { DataThemesToolBoxSelectDataset } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/SelectDataset";

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
    fontFamily: "GothamNarrow-Book, sans-serif",
    "& > div": {
      width: 23,
      height: 23,
      color: "#fff",
      marginRight: 25,
      fontSize: "14px",
      borderRadius: "50%",
      textAlign: "center",
      backgroundColor: "#727F95",
      fontFamily: "GothamNarrow-Book, sans-serif",
    },
    "&$expanded": {
      margin: "12px 0",
      fontFamily: "GothamNarrow-Bold, sans-serif",
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
  },
}))(MuiAccordionDetails);

const Button = withStyles(() => ({
  root: {
    width: "50%",
    height: "48px",
    borderRadius: "0px",
    backgroundColor: "#262C34",
    "&:first-child": {
      borderRight: "1px solid #f1f3f5",
    },
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "GothamNarrow-Bold, sans-serif",
  },
  disabled: {
    backgroundColor: "#ADB5BD",
  },
}))(MuiButton);

interface DataThemesToolBoxStepsProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  mappedData?: any;
  openPanel?: number;
  currentChart?: any;
  visualOptions?: any;
  currentChartData?: any;
  forceNextEnabled?: boolean;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions?: (value: any) => void;
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function DataThemesToolBoxSteps(props: DataThemesToolBoxStepsProps) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { data, loading, loadDataset, filterOptionGroups } = props;
  const [expanded, setExpanded] = React.useState<number>(props.openPanel || 0);

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  let appliedFiltersCount = 0;
  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);
  const activeVizIndex = useStoreState((state) => state.dataThemes.activeVizIndex.value);
  Object.keys(appliedFilters[activeTabIndex][activeVizIndex]).forEach((key) => {
    appliedFiltersCount += appliedFilters[activeTabIndex][activeVizIndex][key].length;
  });

  const stepPaths = [
    `/data-themes/${page}`,
    `/data-themes/${page}/data`,
    `/data-themes/${page}/preview`,
    `/data-themes/${page}/chart-type`,
    `/data-themes/${page}/mapping`,
    `/data-themes/${page}/filters`,
    `/data-themes/${page}/lock`,
    `/data-themes/${page}/customize`,
  ];

  const handleChange =
    (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      // setExpanded(isExpanded ? panel : 0);
      history.push(stepPaths[panel]);
    };

  const onNavBtnClick =
    (direction: "prev" | "next") =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // remove this once filters and lock step is implemented
      if (history.location.pathname === stepPaths[5] && direction === "next") {
        history.push(stepPaths[7]);
        return;
      }
      // remove this once filters and lock step is implemented
      if (history.location.pathname === stepPaths[7] && direction === "prev") {
        history.push(stepPaths[5]);
        return;
      }
      if (history.location.pathname === stepPaths[7] && direction === "next") {
        history.push(stepPaths[0]);
        return;
      }
      const fStepPath = findIndex(
        stepPaths,
        (stepPath: string) => stepPath === history.location.pathname
      );
      if (fStepPath > -1) {
        const newStepPathIndex =
          direction === "prev" ? fStepPath - 1 : fStepPath + 1;
        if (newStepPathIndex > stepPaths.length - 1) {
          return;
        }
        history.push(stepPaths[newStepPathIndex]);
      }
    };

  return (
    <div>
      <div
        css={`
          width: 100%;
          height: 52px;
        `}
      />
      <Accordion
        square
        expanded={expanded === 1}
        onChange={handleChange(data ? 2 : 1)}
        disabled={props.openPanel !== undefined && props.openPanel < 1}
      >
        <AccordionSummary
          id="step1-header"
          aria-controls="step1-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>1</div> Select data
        </AccordionSummary>
        <AccordionDetails>
          <DataThemesToolBoxSelectDataset loadDataset={loadDataset} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 2}
        onChange={handleChange(3)}
        disabled={data.length === 0 && !loading}
      >
        <AccordionSummary
          id="step2-header"
          aria-controls="step2-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>2</div> Chart Type
        </AccordionSummary>
        <AccordionDetails>
          <DataThemesToolBoxChartType />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 3}
        onChange={handleChange(4)}
        disabled={(data.length === 0 && !loading) || !selectedChartType[activeTabIndex][activeVizIndex]}
      >
        <AccordionSummary
          id="step3-header"
          aria-controls="step3-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>3</div> Mapping
        </AccordionSummary>
        <AccordionDetails>
          <DataThemesToolBoxMapping currentChartData={props.currentChartData} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 4}
        onChange={handleChange(5)}
        disabled={
          (data.length === 0 && !loading) ||
          isEmpty(mapping[activeTabIndex][activeVizIndex]) ||
          !selectedChartType[activeTabIndex][activeVizIndex] ||
          (!props.forceNextEnabled && expanded !== 6)
        }
      >
        <AccordionSummary
          id="step4-header"
          aria-controls="step4-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
          css={`
            && {
              > .MuiAccordionSummary-content {
                position: relative;
              }
            }
          `}
        >
          <div>4</div> Filters{" "}
          {appliedFiltersCount > 0 && (
            <Tooltip
              title={
                <div
                  css={`
                    text-transform: capitalize;
                  `}
                >
                  {Object.keys(appliedFilters[activeTabIndex][activeVizIndex])
                    .map(
                      (key) =>
                        `${
                          appliedFilters[activeTabIndex][activeVizIndex][key].length
                        } ${splitStrBasedOnCapitalLetters(key)}${
                          appliedFilters[activeTabIndex][activeVizIndex][key].length > 1 ? "s" : ""
                        }`
                    )
                    .join(", ")}
                </div>
              }
            >
              <label
                css={`
                  top: 0;
                  right: 0;
                  color: #fff;
                  font-size: 14px;
                  padding: 0 10px;
                  position: absolute;
                  border-radius: 20px;
                  background-color: #262c34;
                `}
              >
                {appliedFiltersCount} applied filter
                {appliedFiltersCount > 1 && "s"}
              </label>
            </Tooltip>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <DataThemesToolBoxFilters filterOptionGroups={filterOptionGroups} />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        square
        expanded={expanded === 5}
        onChange={handleChange(5)}
        disabled={props.openPanel !== undefined && props.openPanel < 5}
      >
        <AccordionSummary
          id="step5-header"
          aria-controls="step5-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>5</div> Lock
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion> */}
      <Accordion
        square
        expanded={expanded === 6}
        onChange={handleChange(7)}
        disabled={
          (data.length === 0 && !loading) ||
          isEmpty(mapping[activeTabIndex][activeVizIndex]) ||
          !selectedChartType[activeTabIndex][activeVizIndex] ||
          !props.forceNextEnabled
        }
        css={`
          border-bottom: 1px solid #c0c7d2;
        `}
      >
        <AccordionSummary
          id="step6-header"
          aria-controls="step6-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>6</div> Customize
        </AccordionSummary>
        <AccordionDetails>
          <DataThemesToolBoxCustomize
            mappedData={props.mappedData}
            currentChart={props.currentChart}
            visualOptions={props.visualOptions}
            setVisualOptions={props.setVisualOptions}
            currentChartData={props.currentChartData}
          />
        </AccordionDetails>
      </Accordion>
      <div
        css={`
          bottom: 0;
          width: 100%;
          display: flex;
          position: absolute;
          flex-direction: row;
        `}
      >
        <Button
          onClick={onNavBtnClick("prev")}
          disabled={expanded === 0 || !expanded}
        >
          Previous
        </Button>
        <Button
          onClick={onNavBtnClick("next")}
          disabled={
            props.openPanel !== undefined &&
            props.openPanel < expanded + 1 &&
            !props.forceNextEnabled
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
