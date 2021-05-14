/* third-party */
import React from "react";
import sumBy from "lodash/sumBy";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { mockdata } from "app/components/Charts/Investments/Disbursements/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";
import { TransitionContainer } from "app/components/TransitionContainer";
import { SlideInContainer } from "app/components/SlideInPanel";

export function InvestmentsDisbursedModule() {
  useTitle("The Data Explorer - Investments/Disbursed");
  const totalBudget = sumBy(mockdata, "value");

  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
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
        `}
      >
        <TransitionContainer
          vizScale={vizScale}
          vizTranslation={vizTranslation}
        >
          <DisbursementsTreemap
            data={mockdata}
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
          <div>hello world</div>
        </SlideInContainer>
      </div>
    </React.Fragment>
  );
}
