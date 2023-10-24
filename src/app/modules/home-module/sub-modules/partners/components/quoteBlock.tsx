import { Grid } from "@material-ui/core";
import React from "react";
import {
  quotecss,
  quotesEllipseCss,
} from "app/modules/home-module/sub-modules/partners/style";
import Quote from "app/modules/home-module/assets/quote-icon.svg";
import { ReactComponent as FullEllipse } from "app/modules/home-module/assets/cases-full-ellipse.svg";

export default function QuoteBlock() {
  return (
    <Grid css={quotecss} container direction="column" alignItems="center">
      <img src={Quote} alt="quote_icon" />
      <p>
        There are multiple facets of data that we needed to be able to splice
        and dice. DataXplorer is allowing us to do that!
      </p>
      <div>
        <b>Murad Hrji</b>
        <b>Senior Digital Architect</b>
        <b>The Global Fund to Fight AIDS, Tuberculosis and Malaria</b>
      </div>
      <FullEllipse css={quotesEllipseCss} />
    </Grid>
  );
}
