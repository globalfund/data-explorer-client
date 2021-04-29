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

export function InvestmentsDisbursedModule() {
  useTitle("The Data Explorer - Investments/Disbursed");
  const totalBudget = sumBy(mockdata, "value");

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
      <DisbursementsTreemap data={mockdata} />
    </React.Fragment>
  );
}
