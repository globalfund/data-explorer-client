/* third-party */
import React from "react";
import sumBy from "lodash/sumBy";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { SlideInContainer } from "app/components/SlideInPanel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { TransitionContainer } from "app/components/TransitionContainer";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";
import {
  mockdata2,
  DisbursementsTreemapDataItem,
} from "app/components/Charts/Investments/Disbursements/data";

interface InvestmentsDisbursedModuleProps {
  data: DisbursementsTreemapDataItem[];
}

export function InvestmentsDisbursedModule(
  props: InvestmentsDisbursedModuleProps
) {
  useTitle("The Data Explorer - Investments/Disbursed");
  const totalBudget = sumBy(props.data, "value");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        spacing={4}
        css={`
          margin-bottom: 20px;

          > div {
            color: #262c34;
            font-size: 14px;
            font-weight: bold;
          }
        `}
      >
        <Grid item xs={3}>
          <div
            css={`
              display: flex;
              align-items: center;

              > svg {
                margin-left: 10px;
              }
            `}
          >
            Investments - Disbursed <InfoIcon />
          </div>
          <div css="font-weight: normal;">
            {formatFinancialValue(totalBudget)}
          </div>
        </Grid>
      </Grid>
      <div
        css={`
          width: 100%;

          ${!vizSelected
            ? `* {
            overflow: visible !important;
          }`
            : ""}
        `}
      >
        <TransitionContainer vizScale={1} vizTranslation={vizTranslation}>
          <DisbursementsTreemap
            data={props.data}
            selectedNodeId={vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {
              setVizLevel(1);
              setVizSelected(node);
              setVizTranslation({ x: x * -1, y: y * -1 });
            }}
          />
        </TransitionContainer>
        <SlideInContainer
          vizLevel={vizLevel}
          selected={vizSelected}
          close={() => {
            setVizLevel(0);
            setVizSelected(undefined);
            setVizTranslation({ x: 0, y: 0 });
          }}
        >
          <DisbursementsTreemap
            data={mockdata2}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        </SlideInContainer>
      </div>
    </React.Fragment>
  );
}
