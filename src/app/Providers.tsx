// cc:application base#;application providers
import React from "react";
import theme from "app/theme";
import { RecoilRoot } from "recoil";
import { store } from "app/state/store";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { ErrorBoundaryDX } from "app/components/ErrorBoundary";
import { StylesProvider, CssBaseline } from "@material-ui/core";

type ProviderProps = {
  children: any;
};

function Providers(props: ProviderProps) {
  return (
    <ErrorBoundaryDX>
      <RecoilRoot>
        <StylesProvider injectFirst>
          {/* material ui theme provider */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StoreProvider store={store}>
              <AppContainer>
                {/* react router */}
                <Router>
                  <div
                    css={`
                      position: relative;
                      min-height: calc(100vh - 60px);
                    `}
                  >
                    {props.children}
                  </div>
                </Router>
              </AppContainer>
            </StoreProvider>
          </ThemeProvider>
        </StylesProvider>
      </RecoilRoot>
    </ErrorBoundaryDX>
  );
}

export default Providers;

function AppContainer(props: ProviderProps) {
  const isRehydrated = useStoreRehydrated();
  if (!isRehydrated) {
    return <PageLoader />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
}
