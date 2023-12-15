// cc:application base#;application providers
import React from "react";
import theme from "app/theme";
import { RecoilRoot } from "recoil";
import { store } from "app/state/store";
import { AppBar } from "app/components/AppBar";
import { ThemeProvider } from "@material-ui/core/styles";
import { PageLoader } from "app/modules/common/page-loader";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { User, AppState, Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Container, StylesProvider, CssBaseline } from "@material-ui/core";

type ProviderProps = {
  children: any;
};

const Auth0ProviderWithRedirectCallback = (props: {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience: string;
    redirect_uri: string;
  };
  children: React.ReactNode;
}) => {
  const history = useHistory();

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    history.push(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {props.children}
    </Auth0Provider>
  );
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
              <Auth0ProviderWithRedirectCallback
                domain={process.env.REACT_APP_AUTH0_DOMAIN!}
                clientId={process.env.REACT_APP_AUTH0_CLIENT!}
                authorizationParams={{
                  audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
                  redirect_uri: `${window.location.origin}/callback`,
                }}
              >
                {/* react router */}
                <Router>
                  <AppBar />
                  <Container
                    maxWidth="lg"
                    className="main-container"
                    css={`
                      padding: 0 24px;
                      min-height: calc(100vh - 45px);

                      @media (max-width: 767px) {
                        padding: 0 16px;
                      }
                    `}
                  >
                    {props.children}
                  </Container>
                </Router>
              </Auth0ProviderWithRedirectCallback>
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
