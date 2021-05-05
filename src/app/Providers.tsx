// cc:application base#;application providers
import React, { ReactNode } from "react";
import theme from "app/theme";
import { AppBar } from "app/components/AppBar";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, StylesProvider, CssBaseline } from "@material-ui/core";

type ProviderProps = {
  children: any;
};

function Providers(props: ProviderProps) {
  return (
    <StylesProvider injectFirst>
      {/* material ui theme provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* react router */}
        <Router>
          <AppBar />
          <Container
            maxWidth="lg"
            css={`
              height: 100%;
              padding: 0 24px;

              @media (max-width: 600px) {
                padding: 0 16px;
              }
            `}
          >
            {props.children}
          </Container>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default Providers;
