// cc:application base#;application providers
import React, { ReactNode } from "react";
import theme from "app/theme";
import { RecoilRoot } from "recoil";
import { store } from "app/state/store";
import { AppBar } from "app/components/AppBar";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { StylesProvider, CssBaseline } from "@material-ui/core";

type ProviderProps = {
  children: any;
};

function Providers(props: ProviderProps) {
  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        {/* material ui theme provider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StoreProvider store={store}>
            <AppContainer>
              {/* react router */}
              <Router>
                <AppBar />
                <div
                  css={`
                    min-height: calc(100vh - 48px);
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
