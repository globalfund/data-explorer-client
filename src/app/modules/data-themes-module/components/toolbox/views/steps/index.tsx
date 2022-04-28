/* third-party */
import React from "react";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import MuiButton from "@material-ui/core/Button";
import { useStoreState } from "app/state/store/hooks";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAccordion from "@material-ui/core/Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
/* project */
import { DataThemesToolBoxMapping } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/Mapping";
import { DataThemesToolBoxChartType } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/ChartType";
import { DataThemesToolBoxSelectDataset } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/SelectDataset";

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    borderTop: "1px solid #C0C7D2",
    backgroundColor: "transparent",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:last-child": {
      borderBottom: "1px solid #C0C7D2",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
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

const AccordionDetails = withStyles(() => ({
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

const stepPaths = [
  "/data-themes/create",
  "/data-themes/create/data",
  "/data-themes/create/preview",
  "/data-themes/create/chart-type",
  "/data-themes/create/mapping",
  "/data-themes/create/filters",
  "/data-themes/create/lock",
  "/data-themes/create/customize",
];

interface DataThemesToolBoxStepsProps {
  openPanel?: number;
  currentChartData?: any;
  forceNextEnabled?: boolean;
}

export function DataThemesToolBoxSteps(props: DataThemesToolBoxStepsProps) {
  const history = useHistory();
  const [expanded, setExpanded] = React.useState<number>(props.openPanel || 0);

  const data = useStoreState(
    (state) =>
      get(state.dataThemes, "rawData.data.data", []) as {
        [key: string]: number | string | null;
      }[]
  );

  const handleChange =
    (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      // setExpanded(isExpanded ? panel : 0);
      history.push(stepPaths[panel]);
    };

  const onNavBtnClick =
    (direction: "prev" | "next") =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
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
          <DataThemesToolBoxSelectDataset />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 2}
        onChange={handleChange(3)}
        disabled={props.openPanel !== undefined && props.openPanel < 2}
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
        disabled={props.openPanel !== undefined && props.openPanel < 3}
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
        onChange={handleChange(4)}
        disabled={props.openPanel !== undefined && props.openPanel < 4}
      >
        <AccordionSummary
          id="step4-header"
          aria-controls="step4-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>4</div> Data scale
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
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
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 6}
        onChange={handleChange(6)}
        disabled={props.openPanel !== undefined && props.openPanel < 6}
      >
        <AccordionSummary
          id="step6-header"
          aria-controls="step6-content"
          expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
        >
          <div>6</div> Customize
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
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
            expanded === 6 ||
            (props.openPanel !== undefined &&
              props.openPanel < expanded + 1 &&
              !props.forceNextEnabled)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
