import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { homeFootercss } from "app/modules/home-module/components/Footer/style";
import { ReactComponent as CopyIcon } from "app/modules/home-module/components/Footer/asset/copy.svg";
import { ReactComponent as LogoIcon } from "app/modules/home-module/components/Footer/asset/logo.svg";
import { Link } from "react-router-dom";

export default function HomeFooter() {
  return (
    <div css={homeFootercss}>
      <Container
        maxWidth="lg"
        css={`
          padding: 0;
        `}
      >
        <Grid container alignContent="space-between" alignItems="center">
          <Grid
            item
            lg={9}
            md={9}
            css={`
              display: flex;
              justify-content: flex-start;
              a {
                text-decoration: none;
              }
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
                </span>
                2023 DX All Rights Reserved
              </li>
              <li>
                <a href="mailto:contact@dataxplorer.org">
                  Email: contact@dataxplorer.org
                </a>
              </li>
              <li>
                <a href="tel:0031202134466">Tel: +3120 213 4466</a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1andhlQEoaEq5qDxMbtnApXiZborsg-bG/view"
                  className="privacy-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1wgY5HYdE5-redIOF85E5fZZJT_YueOWP/view?usp=sharing"
                  className="privacy-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms and conditions
                </a>
              </li>
            </ul>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            css={`
              display: flex;
              justify-content: flex-end;
              a {
                text-decoration: none;
              }
            `}
          >
            <Link to="/">
              <LogoIcon />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
