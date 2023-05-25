import { Container, Grid, Paper } from "@material-ui/core";
import React from "react";
import { homeFootercss } from "./style";
import { ReactComponent as CopyIcon } from "app/modules/home-module/components/Footer/asset/copy.svg";
import { ReactComponent as LogoIcon } from "app/modules/home-module/components/Footer/asset/logo.svg";

export default function HomeFooter() {
  return (
    <div css={homeFootercss}>
      <Container maxWidth="lg">
        <Grid
          container
          alignContent="space-between"
          alignItems="center"
          css={``}
        >
          <Grid
            item
            lg={9}
            md={9}
            css={`
              display: flex;
              justify-content: flex-start;
            `}
          >
            <ul>
              <li
                css={`
                  display: flex;
                  align-items: center;
                  gap: 8px;
                `}
              >
                <span
                  css={`
                    margin-top: 6px;
                  `}
                >
                  <CopyIcon />
                </span>{" "}
                2023 DX All Rights Reserved
              </li>
              <li>Email: contact@dataxplorer.org </li>
              <li>Tel: +3120 213 4466 </li>
              <li>Privacy </li>
              <li>Terms and conditions </li>
            </ul>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            css={`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <LogoIcon />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
