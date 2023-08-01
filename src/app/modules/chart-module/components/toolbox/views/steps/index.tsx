/* third-party */
import React from "react";
import findIndex from "lodash/findIndex";
import Tooltip from "@material-ui/core/Tooltip";
import MuiButton from "@material-ui/core/Button";
import { useStoreState } from "app/state/store/hooks";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import { useHistory, useParams } from "react-router-dom";
import { ArrowDropDownSharp } from "@material-ui/icons";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
/* project */
import { PrimaryButton } from "app/components/Styled/button";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";
import { ChartToolBoxMapping } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Mapping";
import { ChartToolBoxFilters } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Filters";
import { ChartToolBoxChartType } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/ChartType";
import { ChartToolBoxCustomize } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/Customize";
import { ChartToolBoxSelectDataset } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/SelectDataset";

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

const Button = withStyles(() => ({
  root: {
    width: "50%",
    height: "48px",
    borderRadius: "0px",
    backgroundColor: "#262C34",
    fontFamily: "GothamNarrow-Book, sans-serif",
    "&:first-child": {
      borderRight: "1px solid #f1f3f5",
    },
    "&:hover": {
      backgroundColor: "#495057",
    },
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "GothamNarrow-Book, sans-serif",
  },
  disabled: {
    backgroundColor: "#ADB5BD",
  },
}))(MuiButton);

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
}

export function ChartToolBoxSteps(props: ChartToolBoxStepsProps) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { data, loading, loadDataset, filterOptionGroups } = props;

  const [collapsed, setCollapsed] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number>(props.openPanel ?? 0);

  const appliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  let appliedFiltersCount = 0;
  const activePanels = useStoreState(
    (state) => state.charts.activePanels.value
  );

  Object.keys(appliedFilters || {}).forEach((key) => {
    appliedFiltersCount += appliedFilters[key].length;
  });

  const stepPaths = [
    `/chart/${page}/preview`,
    `/chart/${page}/data`,
    `/chart/${page}/preview-data`,
    `/chart/${page}/chart-type`,
    `/chart/${page}/mapping`,
    `/chart/${page}/filters`,
    `/chart/${page}/customize`,
  ];

  const handleChange =
    (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      if (props.openPanel === panel - 1 && !collapsed) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        history.push(stepPaths[panel]);
      }
    };

  const onNavBtnClick =
    (direction: "prev" | "next") =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (direction === "next" && activePanels === 5) {
        props.save();
        return;
      }
      if (history.location.pathname === stepPaths[6] && direction === "next") {
        // When the user is at step customize, next becomes "preview" and the user should be taken to a preview page with all the created viz's.
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

  useUpdateEffect(() => setExpanded(props.openPanel ?? 0), [props.openPanel]);

  return (
    <div>
      <div
        css={`
          width: 400px;
          overflow-y: scroll;
          height: calc(100vh - ${!props.filtersView ? 93 : 105}px);

          &::-webkit-scrollbar {
            width: 5px;
            background: #231d2c;
          }
          &::-webkit-scrollbar-track {
            background: #dfe3e6;
          }
          &::-webkit-scrollbar-thumb {
            background: #231d2c;
          }
        `}
      >
        <div
          css={`
            width: 100%;
            height: 52px;
          `}
        />
        <Accordion
          square
          expanded={expanded === 1 && !collapsed}
          onChange={handleChange(data ? 2 : 1)}
          disabled={props.openPanel !== undefined && props.openPanel < 1}
        >
          <AccordionSummary
            id="step1-header"
            aria-controls="step1-content"
            expandIcon={<ArrowDropDownSharp htmlColor="#262C34" />}
          >
            <div>1</div> Select data
          </AccordionSummary>
          <p
            css={`
              font-weight: 325;
              font-size: 14px;
              margin-top: 0;
              margin-bottom: 0;

              margin-left: 28px;
              color: #262c34;
            `}
          >
            Choose from the DX library
          </p>
          <AccordionDetails>
            <ChartToolBoxSelectDataset
              loadDataset={loadDataset}
              expanded={expanded === 1}
            />
            <div>
              <div>
                <p
                  css={`
                    margin-left: 27px;
                  `}
                >
                  OR
                </p>
                <div
                  css={`
                    width: 187px;
                    color: #ffffff;
                  `}
                >
                  <PrimaryButton
                    dark
                    onClick={() => history.push("/dataset-upload")}
                  >
                    add new dataset
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === 2 && !collapsed}
          onChange={handleChange(3)}
        >
          <AccordionSummary
            id="step2-header"
            aria-controls="step2-content"
            expandIcon={<ArrowDropDownSharp htmlColor="#262C34" />}
          >
            <div>2</div> Chart Type
          </AccordionSummary>
          <AccordionDetails>
            <ChartToolBoxChartType />
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 3} onChange={handleChange(4)}>
          <AccordionSummary
            id="step3-header"
            aria-controls="step3-content"
            expandIcon={<ArrowDropDownSharp htmlColor="#262C34" />}
          >
            <div>3</div> Mapping
          </AccordionSummary>
          <AccordionDetails>
            <ChartToolBoxMapping dataTypes={props.dataTypes} />
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 4} onChange={handleChange(5)}>
          <AccordionSummary
            id="step4-header"
            aria-controls="step4-content"
            expandIcon={<ArrowDropDownSharp htmlColor="#262C34" />}
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
                      max-height: calc(100vh - 240px);
                    `}
                  >
                    {Object.keys(appliedFilters)
                      .map(
                        (key) =>
                          `${
                            appliedFilters[key].length
                          } ${splitStrBasedOnCapitalLetters(key)}${
                            appliedFilters[key].length > 1 ? "s" : ""
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
            <ChartToolBoxFilters filterOptionGroups={filterOptionGroups} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === 5}
          onChange={handleChange(6)}
          css={`
            border-bottom: 1px solid #c0c7d2;
          `}
        >
          <AccordionSummary
            id="step5-header"
            aria-controls="step5-content"
            expandIcon={<ArrowDropDownSharp htmlColor="#262C34" />}
          >
            <div>5</div> Customize
          </AccordionSummary>
          <AccordionDetails>
            <ChartToolBoxCustomize
              dataTypes={props.dataTypes}
              mappedData={props.mappedData}
              visualOptions={props.visualOptions}
              setVisualOptions={props.setVisualOptions}
            />
          </AccordionDetails>
        </Accordion>
      </div>
      <div
        css={`
          width: 100%;
          display: flex;
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
          {activePanels === 5 ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
}